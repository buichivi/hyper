import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa6';
import { Navigation } from 'swiper/modules';
import PropTypes from 'prop-types';
import ProductCard from '../ProductCard';

const SectionProduct = ({ products = [] }) => {
    const nextBtnRef = useRef();
    const prevBtnRef = useRef();

    return (
        <div className="h-auto w-full py-4">
            <div className="relative h-auto w-full">
                <div
                    ref={prevBtnRef}
                    className="absolute left-1 top-1/2 z-[2] flex h-10 w-10 
                    -translate-y-1/2 translate-x-2 cursor-pointer items-center justify-center bg-[#44444459] transition-all hover:translate-x-0"
                >
                    <FaArrowLeft className="h-5 w-5 text-[#302f2f]" />
                </div>
                <div
                    ref={nextBtnRef}
                    className=" absolute right-1 top-1/2  z-[2] flex h-10 
                    w-10 -translate-x-2 -translate-y-1/2 cursor-pointer items-center justify-center bg-[#44444459] transition-all hover:translate-x-0"
                >
                    <FaArrowRight className="h-5 w-5 text-[#1a1a1a]" />
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
                    {products.map((product, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <ProductCard product={product} />
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </div>
    );
};

SectionProduct.propTypes = {
    products: PropTypes.array,
};

export default SectionProduct;
