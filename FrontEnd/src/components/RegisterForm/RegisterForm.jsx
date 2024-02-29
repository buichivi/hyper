import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { motion } from 'framer-motion';
import { useState } from 'react';
import PropTypes from 'prop-types';

const RegisterForm = ({ form = {} }) => {
    const [isShowPass, setIsShowPass] = useState(false);
    const [isShowConfirmPass, setIsShowConfirmPass] = useState(false);

    return (
        <div>
            <div className="flex items-center justify-between gap-4">
                <div className="w-full pb-2 2xl:pb-8">
                    <div className="flex items-center justify-between pb-2">
                        <label
                            htmlFor="firstname"
                            className="block font-medium 2xl:text-3xl"
                        >
                            First Name
                        </label>
                        {form.errors.firstname && form.touched.firstname && (
                            <span className="select-none text-sm text-red-500 2xl:text-2xl">
                                {form.errors.firstname}
                            </span>
                        )}
                    </div>
                    <input
                        type="text"
                        name="firstname"
                        id="firstname"
                        className={`w-full rounded-md
                        border border-gray-400 p-2.5 outline-none ring-2 ring-transparent transition-all
                        focus:border-transparent focus:ring-slate-800 2xl:rounded-xl
                        2xl:p-4 
                        2xl:text-3xl`}
                        placeholder="First Name"
                        value={form.values.firstname}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        spellCheck={false}
                    />
                </div>
                <div className="w-full pb-2 2xl:pb-8">
                    <div className="flex items-center justify-between pb-2">
                        <label
                            htmlFor="lastname"
                            className="block font-medium 2xl:text-3xl"
                        >
                            Last Name
                        </label>
                        {form.errors.lastname && form.touched.lastname && (
                            <span className="select-none text-sm text-red-500 2xl:text-2xl">
                                {form.errors.lastname}
                            </span>
                        )}
                    </div>
                    <input
                        type="text"
                        name="lastname"
                        id="lastname"
                        className={`w-full rounded-md
                        border border-gray-400 p-2.5 outline-none ring-2 ring-transparent transition-all
                        focus:border-transparent focus:ring-slate-800 2xl:rounded-xl
                        2xl:p-4 
                        2xl:text-3xl`}
                        placeholder="Last Name"
                        value={form.values.lastname}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        spellCheck={false}
                    />
                </div>
            </div>
            <div className="pb-2 2xl:pb-8">
                <div className="flex items-center justify-between pb-2">
                    <label
                        htmlFor="email"
                        className="block font-medium 2xl:text-3xl"
                    >
                        Email
                    </label>
                    {form.errors.email && form.touched.email && (
                        <span className="select-none text-sm text-red-500 2xl:text-2xl">
                            {form.errors.email}
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
                    value={form.values.email}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    spellCheck={false}
                />
            </div>
            <div className="flex items-start justify-between gap-4 [&>*]:w-full">
                <div className="relative">
                    <label
                        htmlFor="password"
                        className="block pb-2 font-medium 2xl:text-3xl"
                    >
                        Password
                    </label>
                    <div className="relative">
                        <input
                            type={isShowPass ? 'text' : 'password'}
                            name="password"
                            id="password"
                            className={`peer/password w-full rounded-md
                            border border-gray-400 p-2.5 outline-none
                            ring-2 ring-transparent transition-all
                            focus:border-transparent focus:ring-slate-800 2xl:rounded-xl 2xl:p-4 2xl:text-3xl`}
                            placeholder="Enter your password"
                            value={form.values.password}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                        />
                        <label
                            className="absolute right-3 top-1/2 hidden -translate-y-1/2 cursor-pointer 
                            peer-[&:not(:placeholder-shown)]/password:block 2xl:right-6 
                            2xl:top-[45%]"
                            onClick={() => setIsShowPass(!isShowPass)}
                        >
                            {isShowPass ? (
                                <IoEyeOutline className="size-4 2xl:size-8" />
                            ) : (
                                <IoEyeOffOutline className="size-4 2xl:size-8" />
                            )}
                        </label>
                    </div>

                    {form.errors.password && form.touched.password && (
                        <motion.span className="select-none text-sm text-red-500 2xl:text-2xl">
                            {form.errors.password}
                        </motion.span>
                    )}
                </div>
                <div className="relative">
                    <div className="flex items-center justify-between pb-2">
                        <label
                            htmlFor="confirm_password"
                            className="block font-medium 2xl:text-3xl"
                        >
                            Confirm Password
                        </label>
                    </div>
                    <div className="relative">
                        <input
                            type={isShowConfirmPass ? 'text' : 'password'}
                            name="confirm_password"
                            id="confirm_password"
                            className={`peer/confirm_password w-full rounded-md
                            border border-gray-400 p-2.5 outline-none
                            ring-2 ring-transparent transition-all
                            focus:border-transparent focus:ring-slate-800 2xl:rounded-xl 2xl:p-4 2xl:text-3xl`}
                            placeholder="Re-enter your password"
                            value={form.values.confirm_password}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                        />
                        <label
                            className="absolute right-3 top-1/2 hidden -translate-y-1/2 cursor-pointer 
                            peer-[&:not(:placeholder-shown)]/confirm_password:block 2xl:right-6 
                            2xl:top-[45%]"
                            onClick={() =>
                                setIsShowConfirmPass(!isShowConfirmPass)
                            }
                        >
                            {isShowConfirmPass ? (
                                <IoEyeOutline className="size-4 2xl:size-8" />
                            ) : (
                                <IoEyeOffOutline className="size-4 2xl:size-8" />
                            )}
                        </label>
                    </div>
                    {form.errors.confirm_password &&
                        form.touched.confirm_password && (
                            <motion.span className="select-none text-sm text-red-500 2xl:text-2xl">
                                {form.errors.confirm_password}
                            </motion.span>
                        )}
                </div>
            </div>
        </div>
    );
};

RegisterForm.propTypes = {
    form: PropTypes.object,
};

export default RegisterForm;
