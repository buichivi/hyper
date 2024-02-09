import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Navigation, ProductDetail, ProductPreview } from '../../components';
import { AiFillHeart, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { CiDeliveryTruck } from 'react-icons/ci';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import { CiHeart } from 'react-icons/ci';
import { AiOutlineHeart } from 'react-icons/ai';
import { BsSuitHeart } from 'react-icons/bs';
import { FaRegHeart, FaHeart } from 'react-icons/fa';

const Product = () => {
    const { prodId } = useParams();
    const [selectedSize, setSelectedSize] = useState(-1);
    const [quantity, setQuantity] = useState(1);
    const [isFavor, setIsFavor] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="">
            <Navigation />
            <div className="flex min-h-[600px] items-start gap-10 pb-4">
                <div className="sticky top-[72px] h-[90%] flex-[6]">
                    <ProductPreview
                        images={[
                            'https://shorturl.at/jvDLP',
                            'https://shorturl.at/bLRTV',
                            'https://shorturl.at/myHOP',
                            'https://shorturl.at/fBN48',
                            'https://shorturl.at/eKY09',
                        ]}
                    />
                </div>
                <div className="flex-[4]">
                    <h2 className="text-4xl font-medium">Nike Force 1</h2>
                    <h5 className="pb-4 text-base">Nike</h5>
                    <span className="block pb-4 text-lg font-bold tracking-wider">
                        $200
                    </span>
                    <div className="pb-4">
                        <span className="block pb-2 font-medium">
                            Select size:{' '}
                        </span>
                        <div className="flex flex-wrap items-center gap-2">
                            {[39, 40, 41, 42, 43, 44, 45, 46, 47, 48].map(
                                (size, index) => {
                                    return (
                                        <span
                                            key={index}
                                            className={`inline-block cursor-pointer select-none border-[1px] 
                                            border-black px-4 py-1 text-center transition-all
                                            hover:bg-black hover:text-white ${size == selectedSize && 'bg-black text-white'}`}
                                            onClick={() => {
                                                if (size == selectedSize)
                                                    setSelectedSize(-1);
                                                else setSelectedSize(size);
                                            }}
                                        >
                                            {size}
                                        </span>
                                    );
                                },
                            )}
                        </div>
                    </div>
                    <div className="pb-4">
                        <h5 className="pb-2 font-medium">Quantity: </h5>
                        <div className="flex w-fit items-center border-[1px] border-black">
                            <div
                                className="cursor-pointer border-r-[1px] border-r-black p-3 transition-colors duration-300 hover:bg-black hover:text-white"
                                onClick={() =>
                                    setQuantity((prev) => {
                                        if (prev == 0) return 0;
                                        return prev - 1;
                                    })
                                }
                            >
                                <AiOutlineMinus />
                            </div>
                            <input
                                type="number"
                                className="w-12 appearance-none text-center outline-none"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                            <div
                                className="cursor-pointer border-l-[1px] border-l-black p-3 transition-colors duration-300 hover:bg-black hover:text-white"
                                onClick={() => setQuantity(quantity + 1)}
                            >
                                <AiOutlinePlus />
                            </div>
                        </div>
                    </div>
                    <div className="pb-4">
                        <div className="flex items-center gap-2 pb-2">
                            <CiDeliveryTruck className="size-6" />
                            <span className="text-sm">
                                Free ship and returns for members.
                            </span>
                        </div>
                        <hr />
                    </div>
                    <div className="flex items-center gap-4 pb-8">
                        <button
                            className="min-w-[50%] bg-black py-3 text-base font-medium uppercase 
                        tracking-wider text-white ring-1 ring-black hover:text-opacity-80 "
                        >
                            Add to bag
                        </button>
                        <button className="min-w-[30%] py-3 text-base uppercase ring-1 ring-black transition-all hover:bg-black hover:text-white">
                            View cart
                        </button>
                        <button
                            onClick={() => setIsFavor(!isFavor)}
                            className="group/heart flex h-[48px] items-center justify-center text-lg ring-1 ring-black"
                            style={{ aspectRatio: 1 }}
                        >
                            {!isFavor ? (
                                <FaRegHeart className="size-5 transition-all group-hover/heart:scale-[1.3]" />
                            ) : (
                                <FaHeart className="size-5 transition-all group-hover/heart:scale-[1.3]" />
                            )}
                        </button>
                    </div>
                    <div className="pb-4">
                        <ProductDetail />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;
