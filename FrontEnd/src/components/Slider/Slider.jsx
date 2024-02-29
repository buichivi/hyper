import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useEffect, useState } from 'react';
import request from '../../utils/request';

const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
        return `<span class="${className} w-6 h-1 rounded-none bg-[#00000096] transition-all duration-1000"
            style="--swiper-pagination-bullet-horizontal-gap: 2px;"
        ></span>`;
    },
};

const Slider = () => {
    const [sliders, setSliders] = useState([]);
    useEffect(() => {
        request.get('/slider').then((res) => setSliders(res.data.sliders));
    }, []);

    return (
        <div className='relative before:absolute before:left-1 before:top-1 before:h-full before:w-full before:bg-white before:ring-1 before:ring-black before:content-[""]'>
            <Swiper
                pagination={pagination}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                loop={true}
                modules={[Navigation, Pagination, Autoplay]}
                className="relative h-[30vh] w-full xl:h-[85vh]"
            >
                {sliders.map((slider, index) => {
                    return (
                        <SwiperSlide key={index} className="bg-black">
                            <img
                                src={slider.img_url}
                                alt=""
                                className="h-full w-full object-cover"
                            />
                        </SwiperSlide>
                    );
                })}

                {/* <SwiperSlide className="bg-black">
                    <img
                        src="src/assets/sliders/slider-2.jpg"
                        alt=""
                        className="h-full w-full object-cover"
                    />
                </SwiperSlide>
                <SwiperSlide className="bg-black">
                    <img
                        src="src/assets/sliders/slider-3.jpg"
                        alt=""
                        className="h-full w-full object-cover"
                    />
                </SwiperSlide>
                <SwiperSlide className="bg-black">
                    <img
                        src="src/assets/sliders/slider-4.jpg"
                        alt=""
                        className="h-full w-full object-cover"
                    />
                </SwiperSlide> */}
            </Swiper>
        </div>
    );
};

export default Slider;
