import { useEffect, useRef } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa6';
import { Navigation } from 'swiper/modules';
const SectionProduct = () => {
    const nextBtnRef = useRef();
    const prevBtnRef = useRef();

    return (
        <div className="py-4 w-full h-auto">
            <h3 className="font-bold font-BebasNeue text-5xl pb-4">
                Trending now
            </h3>
            <div className="w-full h-auto relative">
                <div
                    ref={prevBtnRef}
                    className="w-10 h-10 bg-[#44444459] cursor-pointer flex items-center justify-center 
                    absolute top-1/2 -translate-y-1/2 left-1 z-10 translate-x-2 hover:translate-x-0 transition-all"
                >
                    <FaArrowLeft className="w-5 h-5 text-[#302f2f]" />
                </div>
                <div
                    ref={nextBtnRef}
                    className=" w-10 h-10 bg-[#44444459]  cursor-pointer flex items-center 
                    justify-center absolute top-1/2 -translate-y-1/2 right-1 z-10 -translate-x-2 hover:translate-x-0 transition-all"
                >
                    <FaArrowRight className="w-5 h-5 text-[#1a1a1a]" />
                </div>
                <Swiper
                    breakpoints={{
                        0: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 4 },
                        1817: { slidesPerView: 5 },
                    }}
                    slidesPerView={4}
                    spaceBetween={16}
                    modules={[Navigation]}
                    onInit={(swiper) => {
                        swiper.params.navigation.prevEl = prevBtnRef.current;
                        swiper.params.navigation.nextEl = nextBtnRef.current;
                        swiper.navigation.init();
                        swiper.navigation.update();
                    }}
                >
                    {Array(9)
                        .fill(0)
                        .map((shoe, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <ProductCard
                                        brandName={'nike'}
                                        rating={4.5}
                                        sizes={[
                                            39, 40, 41, 42, 43, 44, 45, 46, 47,
                                        ]}
                                    />
                                </SwiperSlide>
                            );
                        })}
                </Swiper>
            </div>
        </div>
    );
};

export default SectionProduct;
