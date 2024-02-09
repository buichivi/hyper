import { motion, useAnimation } from 'framer-motion';
import { Link } from 'react-router-dom';
import { NikeLogo } from '../../assets/logos';

const MenuItem = ({ brand = {}, className = '' }) => {
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
            <Link to={`/${brand.name}`} className="cursor-pointer capitalize">
                {brand.name}
            </Link>
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={controls}
                className={`fixed left-0 top-[72px] hidden 
                h-auto min-h-[30vh] w-[100vw] cursor-auto items-center bg-white px-14 py-6 shadow-xl group-hover/menu-item:flex`}
            >
                <Link
                    to={`/${brand.name}`}
                    className="flex flex-[2] flex-col items-center justify-center"
                >
                    <NikeLogo className={'block size-20'} />
                    <span className="capitalize">All {brand.name}</span>
                </Link>
                <div className="grid flex-[8] grid-cols-3 gap-2 lg:grid-cols-4">
                    {[
                        'Jordan',
                        'Air Max',
                        'Air Force 1',
                        'Basketball',
                        'Running',
                        'Outside',
                    ].map((category, index) => {
                        return (
                            <motion.div
                                key={index}
                                animate={controls}
                                initial={{ y: -20, opacity: 0 }}
                                exit={{ y: -20, opacity: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link
                                    to={`/${brand.name}/`}
                                    className="group/category-menu-item
                                        relative flex items-center justify-center gap-2"
                                >
                                    <img
                                        src="/src/assets/images/luka-2-preview.png"
                                        alt=""
                                        className="size-24 object-cover transition-all duration-500"
                                    />
                                    <span
                                        className="capitalize opacity-50
                                            transition-all 
                                            duration-300 group-hover/category-menu-item:opacity-100"
                                    >
                                        {category}
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
