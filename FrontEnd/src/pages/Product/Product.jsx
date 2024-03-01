import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import {
    Navigation,
    ProductDetail,
    ProductPreview,
    SectionProduct,
} from '../../components';
import { ErrorPage } from '../';
import { CiDeliveryTruck } from 'react-icons/ci';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import request from '../../utils/request';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addItemToCart } from '../../store/actions';

const Product = () => {
    const { brand_code, shoe_type_code, product_id } = useParams();
    const [product, setProduct] = useState({});
    const [path, setPath] = useState([]);
    const [selectedSize, setSelectedSize] = useState(-1);
    const [quantity, setQuantity] = useState(1);
    const [productImgs, setProductImgs] = useState([]);
    const [recommendedProducts, setRecommendedProducts] = useState(
        Array(10).fill({}),
    );

    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const dispatch = useDispatch();

    console.log(product?.id);

    const isCorrectPath =
        product?.brand?.code == brand_code &&
        product?.shoe_type?.code == shoe_type_code;

    const errorSizeRef = useRef();
    const errorQuantityRef = useRef();

    const loadData = useCallback(async () => {
        await request
            .get('/products/' + product_id)
            .then((res) => setProduct(res.data.product));
        await request
            .get('/product-image', { params: { product_id: product_id } })
            .then((res) => setProductImgs(res.data.product_imgs));
    }, [product_id]);

    useEffect(() => {
        request
            .get('/recommended', {
                params: {
                    product_id: product_id,
                    brand_id: product?.brand?.id,
                    number_of_product: 5,
                },
            })
            .then((res) => {
                console.log(res.data);
                setRecommendedProducts(res.data.products);
            });
    }, [product, product_id]);

    useEffect(() => {
        setPath([
            {
                name: product?.brand?.name,
                path: '/' + product?.brand?.code,
            },
            {
                name: product?.shoe_type?.name,
                path:
                    '/' + product?.brand?.code + '/' + product?.shoe_type?.code,
            },
            {
                name: product?.name,
                path:
                    '/' +
                    product?.brand?.code +
                    '/' +
                    product?.shoe_type?.code +
                    '/' +
                    product?.id,
            },
        ]);
    }, [product]);

    useEffect(() => {
        window.scrollTo(0, 0);
        loadData();
    }, [loadData]);

    useEffect(() => {
        if (quantity > 0) {
            if (errorQuantityRef.current) {
                errorQuantityRef.current.style.display = 'none';
            }
        }

        if (selectedSize != -1) {
            errorSizeRef.current.style.display = 'none';
        }
    }, [quantity, selectedSize]);

    const handleAddToCart = () => {
        if (selectedSize == -1) {
            errorSizeRef.current.style.display = 'inline-block';
        }
        if (quantity == 0) {
            errorQuantityRef.current.style.display = 'inline-block';
        }
        if (selectedSize != -1 && quantity > 0) {
            if (!isAuthenticated) {
                toast.error('You need to log in to add products to your cart');
                return;
            }
            dispatch(
                addItemToCart({
                    product_id: product?.id,
                    size: selectedSize,
                    quantity: quantity,
                }),
            );
        }
    };

    return (
        <div className="">
            {isCorrectPath ? (
                <>
                    <Navigation path={path} />
                    <div className="flex min-h-[600px] flex-col items-start gap-10 pb-4 lg:flex-row">
                        <div className="top-[72px] block h-[90%] shrink-0 basis-1/2 lg:sticky lg:basis-3/5">
                            <ProductPreview
                                images={productImgs.map(
                                    (product_img) => product_img.img_url,
                                )}
                            />
                        </div>
                        <div className="relative w-full shrink-0 basis-1/2 lg:basis-2/5">
                            <div className="w-[80%]">
                                <h2 className="text-4xl font-medium">
                                    {product?.name}
                                </h2>
                                <h5 className="pb-4 text-base">
                                    {product?.brand?.name}
                                </h5>
                            </div>
                            <FavoriteProduct product_id={product_id} />
                            <div>
                                <span className="inline-block pb-4 text-xl font-bold tracking-wider">
                                    $
                                    {Math.ceil(
                                        product?.price *
                                            (100 - product?.discount),
                                    ) / 100}
                                </span>
                                {product?.discount > 0 && (
                                    <>
                                        <span className="ml-2 inline-block pb-4 text-lg font-medium tracking-wider text-slate-500 line-through">
                                            ${product?.price}
                                        </span>
                                        <span className="ml-2 text-green-400">
                                            ({product?.discount}% Off)
                                        </span>
                                    </>
                                )}
                            </div>
                            <div className="pb-4">
                                {product.total_quantity > 0 ? (
                                    <>
                                        <div className="flex flex-col items-start gap-2 pb-2 lg:flex-row lg:items-end">
                                            <span className="inline-block  font-medium">
                                                Select size:{' '}
                                            </span>
                                            <span
                                                ref={errorSizeRef}
                                                className="hidden text-sm text-red-500"
                                            >
                                                Please select size
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-2">
                                            {product?.sizes?.map(
                                                (sizeItem, index) => {
                                                    return (
                                                        <span
                                                            key={index}
                                                            className={`inline-block cursor-pointer select-none border-[1px] border-black px-4 py-1 text-center text-black transition-all ${sizeItem?.quantity_in_stock > 0 && 'hover:bg-black hover:text-white'}  ${sizeItem?.size == selectedSize && 'bg-black text-white'} ${sizeItem?.quantity_in_stock <= 0 && '!cursor-not-allowed opacity-50 hover:text-black'}`}
                                                            onClick={() => {
                                                                if (
                                                                    sizeItem?.quantity_in_stock <=
                                                                    0
                                                                ) {
                                                                    return;
                                                                }
                                                                if (
                                                                    sizeItem?.size ==
                                                                    selectedSize
                                                                )
                                                                    setSelectedSize(
                                                                        -1,
                                                                    );
                                                                else
                                                                    setSelectedSize(
                                                                        sizeItem?.size,
                                                                    );
                                                            }}
                                                        >
                                                            {sizeItem?.size}
                                                        </span>
                                                    );
                                                },
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <div className="bg-slate-300 text-center">
                                        <span className="inline-block w-[50%] text-wrap py-4">
                                            SOLD OUT: This product is currently
                                            unavailable
                                        </span>
                                    </div>
                                )}
                            </div>

                            {product.total_quantity > 0 && (
                                <>
                                    <div className="pb-4">
                                        <div className="flex flex-col items-start gap-2 pb-2 lg:flex-row lg:items-end">
                                            <h5 className="font-medium">
                                                Quantity:{' '}
                                            </h5>
                                            <span
                                                ref={errorQuantityRef}
                                                className="hidden text-sm text-red-500"
                                            >
                                                Quantity must be greater than 0
                                            </span>
                                        </div>
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
                                                onChange={(e) =>
                                                    setQuantity(e.target.value)
                                                }
                                            />
                                            <div
                                                className="cursor-pointer border-l-[1px] border-l-black p-3 transition-colors duration-300 hover:bg-black hover:text-white"
                                                onClick={() => {
                                                    setQuantity(quantity + 1);
                                                }}
                                            >
                                                <AiOutlinePlus />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pb-4">
                                        <div className="flex items-center gap-2 pb-2">
                                            <CiDeliveryTruck className="size-6" />
                                            <span className="text-sm">
                                                Free ship and returns for
                                                members.
                                            </span>
                                        </div>
                                        <hr />
                                    </div>
                                    <div className="flex items-center gap-4 pb-8">
                                        <button
                                            className="min-w-[50%] bg-black py-3 text-base font-medium uppercase 
                                tracking-wider text-white ring-1 ring-black hover:text-opacity-80 "
                                            onClick={handleAddToCart}
                                        >
                                            Add to cart
                                        </button>
                                        <Link
                                            to="/cart"
                                            className="min-w-[30%] py-3 text-center text-base uppercase ring-1 ring-black transition-all hover:bg-black hover:text-white"
                                        >
                                            View cart
                                        </Link>
                                    </div>
                                </>
                            )}

                            <div className="w-full pb-4">
                                <ProductDetail productId={product_id} />
                            </div>
                        </div>
                    </div>
                    <div className="py-8">
                        <h2 className="text-3xl font-medium">
                            You might also like
                        </h2>
                        <SectionProduct products={recommendedProducts} />
                    </div>
                </>
            ) : (
                <ErrorPage />
            )}
        </div>
    );
};

const FavoriteProduct = ({ product_id }) => {
    const [isFavor, setIsFavor] = useState();

    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

    useEffect(() => {
        if (isAuthenticated) {
            request.get('/me/favorites').then((res) => {
                setIsFavor(
                    res.data.favorite_products
                        .map((prod) => prod?.id)
                        .includes(Number(product_id)),
                );
            });
        }
    }, [isAuthenticated, product_id]);

    const handleFavoriteProduct = async () => {
        if (!isAuthenticated && !isFavor) {
            toast.warn('Please login to add favorite product');
        }
        if (isAuthenticated && !isFavor) {
            await request
                .post('/me/favorites', {
                    product_id,
                })
                .then(() => {
                    toast.success('Add favorite product successfully!');
                    setIsFavor(true);
                })
                .catch(() => toast.error('Something went wrong!'));
        }
        if (isAuthenticated && isFavor) {
            await request
                .delete('/me/favorites', {
                    params: {
                        product_id,
                    },
                })
                .then(() => {
                    toast.success('Remove favorite product successfully!');
                    setIsFavor(false);
                })
                .catch(() => toast.error('Something went wrong!'));
        }
    };

    return (
        <button
            onClick={handleFavoriteProduct}
            className="group/heart absolute right-0 top-0 flex h-[48px] items-center justify-center text-lg ring-1 ring-black"
            style={{ aspectRatio: 1 }}
        >
            {!isFavor ? (
                <FaRegHeart className="size-5 transition-all group-hover/heart:scale-[1.3]" />
            ) : (
                <FaHeart className="size-5 transition-all group-hover/heart:scale-[1.3]" />
            )}
        </button>
    );
};

export default Product;
