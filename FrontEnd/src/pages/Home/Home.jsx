import { useEffect, useState } from 'react';
import { SectionProduct, Slider } from '../../components';
import { BRANDS } from '../../constants';
import request from '../../utils/request';

const Home = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [featuredProds, setFeaturedProds] = useState([]);
    useEffect(() => {
        request
            .get('/featured')
            .then((res) => setFeaturedProds(res.data.products));
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
                                <div className="absolute left-1/2 top-1/2 size-12 -translate-x-1/2 -translate-y-1/2 overflow-hidden xl:size-[150px]">
                                    <Logo className="absolute left-1/2 top-full size-full -translate-x-1/2 text-white transition-all duration-500 group-hover:top-0" />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <h3 className="py-4 font-BebasNeue text-5xl font-bold">
                Trending now
            </h3>
            <SectionProduct products={featuredProds} />
        </div>
    );
};

export default Home;
