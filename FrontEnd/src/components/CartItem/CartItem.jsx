import { useEffect, useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BsFillTrash3Fill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { removeItemFromCart, updateItemFromCart } from '../../store/actions';
import { useDebounced } from '../../hooks';

const CartItem = ({ cartItem = {} }) => {
    const [quantityItem, setQuantityItem] = useState(cartItem?.quantity);
    const dispatch = useDispatch();

    console.log('CartItem re-render');

    const quantity = useDebounced(quantityItem, 500);
    const product_size = cartItem?.product?.sizes?.find(
        (size) => size.size == cartItem.size,
    );

    useEffect(() => {
        if (quantity == cartItem.quantity) {
            return;
        }
        dispatch(
            updateItemFromCart({
                id: cartItem.id,
                quantity,
                initQuantity: cartItem.quantity,
            }),
        );
        const timerId = setTimeout(() => {
            if (quantityItem > product_size?.quantity_in_stock) {
                setQuantityItem(cartItem?.quantity);
            }
        }, 600);
        return () => {
            clearTimeout(timerId);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quantity]);

    const handleRemoveCartItem = () => {
        if (confirm('Do you want to remove this item from your cart?'))
            dispatch(removeItemFromCart(cartItem?.id));
    };

    return (
        <div
            className="flex h-[120px] min-h-[100px] select-none items-start gap-2 border-[1px]
    border-slate-300 p-2"
        >
            <Link
                to={`/${cartItem?.product?.brand?.code}/${cartItem?.product?.shoe_type?.code}/${cartItem?.product?.id}`}
                className="h-full"
                style={{ aspectRatio: 1 }}
            >
                <img
                    src={cartItem?.product?.img_preview_url}
                    alt=""
                    className="size-full object-cover"
                />
            </Link>
            <div className="flex h-full flex-col justify-between">
                <div className="">
                    <Link
                        className="text-base md:text-2xl font-medium text-limit-1 "
                        to={`/${cartItem?.product?.brand?.code}/${cartItem?.product?.shoe_type?.code}/${cartItem?.product?.id}`}
                    >
                        {cartItem?.product?.name}
                    </Link>
                    <div className="pt-1">
                        <Link to={`/${cartItem?.product?.brand?.code}`}>
                            {cartItem?.product?.brand?.name}
                        </Link>{' '}
                        -{' '}
                        <Link
                            to={`/${cartItem?.product?.brand?.code}/${cartItem?.product?.shoe_type?.code}`}
                        >
                            {cartItem?.product?.shoe_type?.name}
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col gap-4 md:flex-row md:items-center ">
                    <p className="hidden md:inline-block">
                        Price (x1):{' '}
                        <span className="font-medium text-[#333]">
                            ${cartItem?.product?.price}
                        </span>
                    </p>
                    <span className="inline-block font-medium md:hidden">
                        $
                        {Math.ceil(
                            (cartItem?.product?.price *
                                (100 - cartItem?.product?.discount)) /
                                100,
                        ) * cartItem?.quantity}
                    </span>
                    <span>Size: {cartItem?.size}</span>
                    {cartItem?.product?.discount > 0 && (
                        <p className="hidden md:inline-block">
                            Discount:{' '}
                            <span className="text-green-600">
                                -{cartItem?.product?.discount}%
                            </span>
                        </p>
                    )}
                </div>
            </div>
            <div className="relative hidden h-full flex-1 items-end justify-end md:flex">
                <div>
                    <div className="text-right">
                        {cartItem?.product?.discount > 0 && (
                            <h5 className="text-sm text-slate-400 line-through">
                                ${cartItem?.product?.price * cartItem?.quantity}
                            </h5>
                        )}
                        <h4 className="text-2xl font-medium text-black">
                            $
                            {Math.ceil(
                                (cartItem?.product?.price *
                                    (100 - cartItem?.product?.discount)) /
                                    100,
                            ) * cartItem?.quantity}
                        </h4>
                    </div>
                    <div className="mt-3 flex items-center gap-4">
                        <div onClick={handleRemoveCartItem}>
                            <BsFillTrash3Fill className="size-5 cursor-pointer text-slate-500 transition-colors hover:text-red-500" />
                        </div>
                        <div className=" flex w-fit items-center rounded-lg border-[1px] border-slate-300">
                            <div
                                className="cursor-pointer p-2 text-sm text-black transition-colors duration-300"
                                onClick={() => {
                                    setQuantityItem((prev) => {
                                        if (prev == 0) return 0;
                                        return prev - 1;
                                    });
                                }}
                            >
                                <AiOutlineMinus />
                            </div>
                            <input
                                type="number"
                                className="w-12 appearance-none text-center text-sm outline-none"
                                value={quantityItem}
                                onChange={(e) => {
                                    setQuantityItem(e.target.value);
                                }}
                            />
                            <div
                                className="cursor-pointer  p-2 text-sm text-black transition-colors duration-300"
                                onClick={() => {
                                    setQuantityItem(quantityItem + 1);
                                }}
                            >
                                <AiOutlinePlus />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

CartItem.propTypes = {
    cartItem: PropTypes.object,
};

export default CartItem;
