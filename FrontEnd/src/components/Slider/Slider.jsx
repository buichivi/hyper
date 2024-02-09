import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
        return `<span class="${className} w-6 h-1 rounded-none bg-[#00000096] transition-all duration-1000"
            style="--swiper-pagination-bullet-horizontal-gap: 2px;"
        ></span>`;
    },
};

const Slider = () => {
    return (
        <div className='before:content-[""] before:w-full before:h-full before:ring-1 
        before:ring-black before:bg-white relative before:absolute before:top-1 before:left-1
        '>
            <Swiper
                pagination={pagination}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                loop={true}
                modules={[Navigation, Pagination, Autoplay]}
                className="w-full h-[85vh] relative"
            >
                <SwiperSlide className="bg-black">
                    <img
                        src="src/assets/sliders/slider-1.jpg"
                        alt=""
                        className="w-full h-full object-cover"
                    />
                </SwiperSlide>
                <SwiperSlide className="bg-black">
                    <img
                        src="src/assets/sliders/slider-2.jpg"
                        alt=""
                        className="w-full h-full object-cover"
                    />
                </SwiperSlide>
                <SwiperSlide className="bg-black">
                    <img
                        src="src/assets/sliders/slider-3.jpg"
                        alt=""
                        className="w-full h-full object-cover"
                    />
                </SwiperSlide>
                <SwiperSlide className="bg-black">
                    <img
                        src="src/assets/sliders/slider-4.jpg"
                        alt=""
                        className="w-full h-full object-cover"
                    />
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Slider;
