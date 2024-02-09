/* eslint-disable react/no-unescaped-entities */
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { LoginForm } from '../../components';


const Login = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const loginAnimation = {
        open: { x: 0, opacity: 1 },
        exit: { x: '-100%', opacity: 0 },
    };

    return (
        <div className="flex h-screen w-[100vw] items-center">
            <motion.div
                key="leftSideLoginPage"
                className="relative h-full flex-1 overflow-hidden
                bg-gradient-to-b from-zinc-700 via-zinc-400 to-stone-900"
                initial="exit"
                animate="open"
                exit="exit"
                variants={loginAnimation}
                transition={{
                    duration: 0.5,
                    delay: 0.5,
                }}
            >
                <motion.div
                    className="absolute left-10 top-0 size-full"
                    initial={{ x: 40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 40, opacity: 0 }}
                    transition={{
                        duration: 0.5,
                        delay: 0.3,
                    }}
                >
                    <img
                        src="src/assets/images/jordan-one-take-4-basketball-shoes-nS8tqx-removebg.png"
                        alt=""
                        className="size-full object-cover drop-shadow-[-11px_20px_20px_#000000] 2xl:scale-110"
                    />
                </motion.div>
                <motion.h4
                    className="absolute left-5 top-10 font-BebasNeue text-[80px] font-bold leading-none  
                            text-white drop-shadow-2xl 2xl:text-[150px]"
                    initial={{ x: -40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -40, opacity: 0 }}
                    transition={{
                        duration: 0.5,
                        delay: 0.3,
                    }}
                >
                    Good shoes take you good places.
                </motion.h4>
            </motion.div>
            <LoginForm />
        </div>
    );
};

export default Login;
