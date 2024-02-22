import { useEffect, useRef, useState } from 'react';
// Import Swiper React components

import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

const ProductPreview = ({ images = [] }) => {
    const [selectedImage, setSelectedImage] = useState(images[0]);
    const [isZoom, setIsZoom] = useState(false);
    const zoomInCursor = useRef();
    const zoomOutCursor = useRef();

    useEffect(() => {
        if (images.length > 0)
            setSelectedImage(images[0])
    }, [images.length])

    const handleZoomIn = (e) => {
        const rect = e.target.parentElement.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        zoomInCursor.current.style.display = 'none';
        zoomOutCursor.current.style.display = 'flex';
        zoomOutCursor.current.style.top = `${y - 20}px`;
        zoomOutCursor.current.style.left = `${x - 20}px`;
        e.target.style.transform = 'scale(3)';
        e.target.style.transformOrigin = `${(x * 100) / rect.width}% ${(y * 100) / rect.height}%`;
    };
    const handleZoomOut = (e) => {
        const rect = e.target.parentElement.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        zoomOutCursor.current.style.display = 'none';
        zoomInCursor.current.style.display = 'flex';
        zoomInCursor.current.style.top = `${y - 20}px`;
        zoomInCursor.current.style.left = `${x - 20}px`;
        e.target.style.transform = 'scale(1)';
    };

    const handleZoomImage = {
        onClick: (e) => {
            if (!isZoom) {
                handleZoomIn(e);
            } else {
                handleZoomOut(e);
            }
            setIsZoom(!isZoom);
        },
        onMouseEnter: (e) => {
            e.target.style.cursor = 'none';
        },
        onMouseMove: (e) => {
            if (isZoom) {
                handleZoomIn(e);
            } else {
                handleZoomOut(e);
            }
        },
        onMouseLeave: (e) => {
            e.target.style.transform = 'scale(1)';
            zoomInCursor.current.style.display = 'none';
            zoomOutCursor.current.style.display = 'none';
            setIsZoom(false);
        },
    };

    return (
        <div className="flex size-full items-start">
            <div className="h-full flex-[1] shrink-0 overflow-hidden pr-1">
                <div className="box-content h-full overflow-y-scroll">
                    {images.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className={`mb-1 w-full ${item == selectedImage && 'brightness-[.7]'}`}
                                style={{
                                    aspectRatio: 1,
                                    marginBottom:
                                        index == images.length - 1 && 0,
                                }}
                                onClick={() => {
                                    setSelectedImage(item);
                                    setIsZoom(false);
                                }}
                            >
                                <img
                                    src={item}
                                    alt=""
                                    className="size-full object-cover"
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
            <div
                className="relative h-full w-full flex-[8] overflow-hidden"
                style={{ aspectRatio: 1 }}
            >
                <img
                    src={selectedImage}
                    className="size-full object-cover transition-transform duration-500"
                    {...handleZoomImage}
                />
                <div
                    className="pointer-events-none absolute left-0 top-0 z-20 hidden size-10 
                    items-center justify-center bg-white"
                    ref={zoomInCursor}
                    onClick={(e) => console.log(e)}
                >
                    <AiOutlinePlus className=" size-8" />
                </div>
                <div
                    className="pointer-events-none absolute left-0 top-0 z-20 hidden size-10 
                    items-center justify-center bg-white"
                    ref={zoomOutCursor}
                >
                    <AiOutlineMinus className=" size-8" />
                </div>
            </div>
        </div>
    );
};

export default ProductPreview;
