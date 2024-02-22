import { motion, useAnimation } from 'framer-motion';
import { Link } from 'react-router-dom';

const MenuItem = ({ brand = {}, className = '', isLogin = False }) => {
    const controls = useAnimation();
    return (
        <motion.div
            onHoverStart={() => controls.start({ y: 0, opacity: 1 })}
            onHoverEnd={() => controls.start({ y: -20, opacity: 0 })}
            to=""
            className={`group/menu-item relative flex h-full w-fit items-center justify-center text-lg
                font-medium before:absolute before:bottom-0 
                before:left-0 before:h-[2px] before:w-0 before:bg-black
                before:transition-all before:duration-300 before:content-[''] 
                hover:before:w-full ${className}`}
        >
            <Link to={`/${brand.code}`} className="cursor-pointer capitalize">
                {brand.name}
            </Link>
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={controls}
                className={`fixed left-0 ${isLogin ? 'top-[72px]' : 'top-[calc(72px_+_28px)]'} hidden 
                h-auto min-h-[30vh] w-[100vw] cursor-auto items-center bg-white px-14 py-6 shadow-xl group-hover/menu-item:flex`}
            >
                <Link
                    to={`/${brand.code}`}
                    className="flex flex-[2] flex-col items-center justify-center"
                >
                    <div className="block size-20">
                        <img
                            src={brand.img_url}
                            alt=""
                            className={'size-full object-contain'}
                        />
                    </div>
                    <span className="capitalize">All {brand.name}</span>
                </Link>
                <div className="grid flex-[8] grid-cols-3 gap-2 lg:grid-cols-4">
                    {brand.shoe_types.map((type, index) => {
                        return (
                            <motion.div
                                key={index}
                                animate={controls}
                                initial={{ y: -20, opacity: 0 }}
                                exit={{ y: -20, opacity: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link
                                    to={`/${brand.code}/${type.code}`}
                                    className="group/category-menu-item
                                        relative flex items-center justify-center gap-2"
                                >
                                    <img
                                        src={
                                            type.img_url ||
                                            'https://placehold.co/400'
                                        }
                                        alt=""
                                        className="size-24 object-cover transition-all duration-500"
                                    />
                                    <span
                                        className="capitalize opacity-50
                                            transition-all 
                                            duration-300 group-hover/category-menu-item:opacity-100"
                                    >
                                        {type.name}
                                    </span>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default MenuItem;
