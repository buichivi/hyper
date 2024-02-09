import { useFormik } from 'formik';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { DetailForm, RegisterForm } from '../../components';
import { HiOutlineArrowLongLeft } from 'react-icons/hi2';
import request from '../../utils/request';

const regexName =
    /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/;
const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;

const SignUp = () => {
    const [isFillingDetail, setIsFillingDetail] = useState(false);
    const [loginInfo, setLoginInfo] = useState({});
    const [existedEmails, setExistedEmails] = useState([]);

    useEffect(() => {
        request.get('/all-emails').then((res) => setExistedEmails(res.data));
    }, []);

    const registrationForm = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirm_password: '',
            firstname: '',
            lastname: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email format')
                .notOneOf(existedEmails, 'This email already being used')
                .required('This field is required!'),
            password: Yup.string()
                .min(6, 'Password must be contain at least 6 characters')
                .required('This field is required!'),
            confirm_password: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('This field is required!'),
            firstname: Yup.string()
                .matches(regexName, 'Please enter valid name')
                .max(20, 'Cannot exceed 20 characters')
                .required('This field is required!'),
            lastname: Yup.string()
                .matches(regexName, 'Please enter valid name')
                .max(20, 'Cannot exceed 20 characters')
                .required('This field is required!'),
        }),
        onSubmit: (values) => {
            if (
                values.email &&
                values.firstname &&
                values.lastname &&
                values.password &&
                values.confirm_password
            ) {
                setLoginInfo(values);
                setIsFillingDetail(true);
                return;
            }
        },
    });

    const detailForm = useFormik({
        initialValues: {
            phone_number: '',
            date_of_birth: '',
            address: '',
        },
        validationSchema: Yup.object({
            phone_number: Yup.string()
                .required('This field is required!')
                .matches(regexPhoneNumber, 'Please enter valid phone number'),
            date_of_birth: Yup.date()
                .required('This field is required!')
                .test('is-adult', 'Must be at least 18 years old', (value) => {
                    const thisYear = new Date().getFullYear();
                    const dobYear = new Date(value).getFullYear();
                    return thisYear - dobYear >= 18;
                }),
            address: Yup.string().required('This field is required!'),
        }),
        onSubmit: (values) => {
            const totalInfo = {
                ...loginInfo,
                ...values,
            };
            console.log(totalInfo);
            request
                .post('/signup', totalInfo)
                .then((res) => console.log(res.data));
        },
    });

    return (
        <AnimatePresence>
            <motion.div
                className="relative flex size-full min-h-screen flex-col items-center justify-between py-4 transition-all"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
            >
                <Link
                    to="/"
                    className="font-BebasNeue text-[40px] font-bold 2xl:text-[60px]"
                >
                    HYPER
                </Link>

                <AnimatePresence mode="wait">
                    {!isFillingDetail ? (
                        <motion.form
                            key={isFillingDetail}
                            initial={{ x: '-100%', opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: '-100%', opacity: 0 }}
                            className="w-[80%] px-10 lg:w-[50%]"
                            onSubmit={registrationForm.handleSubmit}
                        >
                            <div className="pb-10">
                                <h5 className="text-center text-4xl font-semibold capitalize 2xl:text-7xl">
                                    Welcome to our shop
                                </h5>
                                <p className="text-center text-gray-500 2xl:text-3xl">
                                    Use your email to register
                                </p>
                            </div>
                            <RegisterForm form={registrationForm} />
                            <button
                                type="submit"
                                className="mt-4 w-full cursor-pointer select-none rounded-md 
                        bg-slate-950 py-3 text-center text-lg capitalize text-white"
                            >
                                Next
                            </button>
                        </motion.form>
                    ) : (
                        <motion.form
                            key={isFillingDetail}
                            initial={{ x: '100%', opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: '100%', opacity: 0 }}
                            className="w-[80%] px-10 lg:w-[50%]"
                            onSubmit={detailForm.handleSubmit}
                        >
                            <div
                                className="flex cursor-pointer select-none items-center gap-1"
                                onClick={() => setIsFillingDetail(false)}
                            >
                                <span>
                                    <HiOutlineArrowLongLeft className="size-5" />
                                </span>
                                <span>Back</span>
                            </div>
                            <div className="pb-10">
                                <h5 className="text-center text-4xl font-semibold capitalize 2xl:text-7xl">
                                    Next step
                                </h5>
                                <p className="text-center text-gray-500 2xl:text-3xl">
                                    Fill in your information
                                </p>
                            </div>
                            <DetailForm form={detailForm} />
                            <div className="mt-4 flex items-center justify-between gap-10">
                                <button
                                    type="submit"
                                    className="cursor-divointer w-full select-none rounded-md 
                                bg-slate-950 py-3 text-center text-lg capitalize text-white"
                                >
                                    Submit
                                </button>
                                <div
                                    className="w-full cursor-pointer select-none rounded-md 
                                bg-slate-950 py-3 text-center text-lg capitalize text-white"
                                    onClick={() => {
                                        console.log(loginInfo);
                                        request
                                            .post('/signup', loginInfo)
                                            .then((res) =>
                                                console.log(res.data),
                                            );
                                    }}
                                >
                                    Skip this step
                                </div>
                            </div>
                        </motion.form>
                    )}
                </AnimatePresence>

                <motion.h5
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                >
                    Already have an account?{' '}
                    <Link to="/login" className="cursor-pointer font-medium">
                        Login
                    </Link>
                </motion.h5>
            </motion.div>
        </AnimatePresence>
    );
};

export default SignUp;