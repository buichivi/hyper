import { useEffect } from 'react';
import { SectionProduct, Slider } from '../../components';
import { BRANDS } from '../../constants';

const Home = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="">
            <Slider />
            <div className="py-4">
                <h1 className="font-BebasNeue text-[48px] font-extrabold uppercase leading-[1.05] tracking-wide md:text-[80px] lg:text-[130px]">
                    Discover limited sneakers without limitation
                </h1>
                <div className="grid grid-cols-4">
                    {BRANDS.map((brand, index) => {
                        const Logo = brand.logo;
                        return (
                            <div
                                key={index}
                                className={`group relative overflow-hidden border-[.5px] ${
                                    index > 0 &&
                                    index < BRANDS.length &&
                                    'border-l-0'
                                } border-black`}
                                style={{
                                    aspectRatio: 1,
                                }}
                            >
                                <div className="h-full w-full">
                                    <img
                                        src={brand.sampleProductUrl}
                                        alt={brand.name}
                                        className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
                                    />
                                </div>
                                <div className="absolute left-0 top-0 h-full w-full bg-transparent transition-all group-hover:bg-[#46464680]"></div>
                                <div className="absolute left-1/2 top-1/2 h-[100px] w-[100px] -translate-x-1/2 -translate-y-1/2 overflow-hidden">
                                    <Logo
                                        width={100}
                                        height={100}
                                        className="absolute left-1/2 top-full -translate-x-1/2 text-white transition-all duration-500 group-hover:top-0"
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <SectionProduct />
        </div>
    );
};

export default Home;
