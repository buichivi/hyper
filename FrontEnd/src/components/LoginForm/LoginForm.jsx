import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { logInUser } from '../../store/actions';

const LoginForm = () => {
    const emailRef = useRef();
    const [isShowPass, setIsShowPass] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loginForm = useFormik({
        initialValues: {
            email: '',
            password: '',
            remember: false,
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email format')
                .required('This field is required!'),
            password: Yup.string().required('This field is required!'),
        }),
        onSubmit: (values) => {
            dispatch(logInUser(values, navigate));
        },
    });

    useEffect(() => {
        emailRef.current.focus();
    }, []);

    const loginAnimation = {
        open: { x: 0, opacity: 1 },
        exit: { x: '100%', opacity: 0 },
    };

    return (
        <motion.div
            key="loginForm"
            className="relative flex size-full flex-1 flex-col items-center justify-between py-4 transition-all"
            initial="exit"
            animate="open"
            exit="exit"
            variants={loginAnimation}
            transition={{ duration: 0.2, delay: 0.5, type: 'tween' }}
        >
            <Link
                to="/"
                className="font-BebasNeue text-[40px] font-bold 2xl:text-[60px]"
            >
                HYPER
            </Link>
            <form className="px-10 xl:px-32" onSubmit={loginForm.handleSubmit}>
                <div className="pb-10">
                    <h5 className="text-center text-4xl font-semibold capitalize 2xl:text-7xl">
                        Welcome back
                    </h5>
                    <p className="text-center text-gray-500 2xl:text-3xl">
                        Enter your email and password to acccess your account
                    </p>
                </div>
                <div className="pb-2 2xl:pb-8">
                    <div className="flex items-center justify-between pb-2">
                        <label
                            htmlFor="email"
                            className="block font-medium 2xl:text-3xl"
                        >
                            Email
                        </label>
                        {loginForm.errors.email && loginForm.touched.email && (
                            <span className="select-none text-sm text-red-500 2xl:text-2xl">
                                {loginForm.errors.email}
                            </span>
                        )}
                    </div>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className={`w-full rounded-md
                        border border-gray-400 p-2.5 outline-none ring-2 ring-transparent transition-all
                        focus:border-transparent focus:ring-slate-800 2xl:rounded-xl
                        2xl:p-4 
                        2xl:text-3xl`}
                        placeholder="example@email.com"
                        value={loginForm.values.email}
                        onChange={loginForm.handleChange}
                        ref={emailRef}
                        spellCheck={false}
                    />
                </div>
                <div className="relative pb-2 2xl:pb-8">
                    <div className="flex items-center justify-between pb-2">
                        <label
                            htmlFor="password"
                            className="block font-medium 2xl:text-3xl"
                        >
                            Password
                        </label>
                        {loginForm.errors.password &&
                            loginForm.touched.password && (
                                <motion.span className="select-none text-sm text-red-500 2xl:text-2xl">
                                    {loginForm.errors.password}
                                </motion.span>
                            )}
                    </div>
                    <div className="relative">
                        <input
                            type={isShowPass ? 'text' : 'password'}
                            name="password"
                            id="password"
                            className={`peer/password w-full rounded-md
                            border border-gray-400 p-2.5 outline-none
                            ring-2 ring-transparent transition-all
                            focus:border-transparent focus:ring-slate-800 
                            2xl:rounded-xl 2xl:p-4 2xl:text-3xl`}
                            placeholder="Enter your password"
                            value={loginForm.values.password}
                            onChange={loginForm.handleChange}
                        />
                        <label
                            className="absolute right-3 top-1/2 hidden -translate-y-1/2 
                            cursor-pointer peer-[&:not(:placeholder-shown)]/password:block 
                            2xl:right-6 2xl:top-[45%]"
                            onClick={() => setIsShowPass(!isShowPass)}
                        >
                            {isShowPass ? (
                                <IoEyeOutline className="size-4 2xl:size-8" />
                            ) : (
                                <IoEyeOffOutline className="size-4 2xl:size-8" />
                            )}
                        </label>
                    </div>
                </div>
                <div className="flex items-center gap-2 pb-6">
                    <input
                        type="checkbox"
                        name="remember"
                        id="remember"
                        value={loginForm.values.remember}
                        onChange={loginForm.handleChange}
                        className="size-4 rounded-full accent-black 
                ring-offset-1 transition-all checked:ring-1 checked:ring-black"
                    />
                    <label htmlFor="remember" className="select-none">
                        Remember me
                    </label>
                </div>
                <button
                    className="w-full rounded-md bg-slate-950 py-3 text-lg capitalize text-white"
                    type="submit"
                >
                    Sign in
                </button>
            </form>
            <h5>
                Don't have an account?{' '}
                <Link to="/signup" className="cursor-pointer font-medium">
                    Sign Up
                </Link>
            </h5>
        </motion.div>
    );
};

export default LoginForm;
