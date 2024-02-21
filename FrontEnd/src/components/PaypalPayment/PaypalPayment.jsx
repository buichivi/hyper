import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import request from '../../utils/request';
import { toast } from 'react-toastify';
import { clearCart } from '../../store/cartSlice';
import { useNavigate } from 'react-router-dom';
// import { PayPalButton } from '@paypal/react-paypal-js';

const PaypalPayment = ({ info = {}, total = 0 }) => {
    const [paypalReady, setPaypalReady] = useState(false);

    const cart = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    console.log(info);

    useEffect(() => {
        const script = document.createElement('script');
        script.src =
            'https://www.paypal.com/sdk/js?client-id=Adnvkz-RjwkT5VUtnAHl5drM6n9aR5EmwX29Cd11VJpw5G9qM2ETjtaNJ1Skun_cJ7y0Bdhikj9pMRw2&currency=USD';
        script.addEventListener('load', () => {
            setPaypalReady(true);
        });
        document.body.appendChild(script);

        return () => {
            if (document.contains(script)) document.body.removeChild(script);
        };
    }, []);

    useEffect(() => {
        if (paypalReady) {
            window.paypal
                .Buttons({
                    createOrder: (data, actions) => {
                        return actions.order.create({
                            application_context: {
                                brand_name: 'Hyper Store',
                                locale: 'us-US',
                                shipping_preference: 'SET_PROVIDED_ADDRESS',
                            },
                            intent: 'CAPTURE',
                            purchase_units: [
                                {
                                    description: 'Purchase in Hyper Store',
                                    amount: {
                                        currency_code: 'USD',
                                        value: total,
                                        breakdown: {
                                            item_total: {
                                                currency_code: 'USD',
                                                value: total,
                                            },
                                        },
                                    },
                                    items: cart.map((cartItem) => ({
                                        name: cartItem.product_name,
                                        description: 'Shoe',
                                        unit_amount: {
                                            currency_code: 'USD',
                                            value: Math.ceil(
                                                (cartItem?.product?.price *
                                                    (100 -
                                                        cartItem?.product
                                                            ?.discount)) /
                                                    100,
                                            ),
                                        },
                                        quantity: cartItem.quantity,
                                    })),
                                    shipping: {
                                        name: {
                                            full_name: info.customer_name,
                                        },
                                        address: {
                                            address_line_1:
                                                info.shipping_address, // Địa chỉ dòng 1
                                            address_line_2:
                                                info.district.district_name +
                                                ' ' +
                                                info.ward.ward_name, // Địa chỉ dòng 2 (tùy chọn)
                                            admin_area_1:
                                                info.province.province_name,
                                            admin_area_2:
                                                info.province.province_name,
                                            country_code: 'VN', // Mã quốc gia
                                        },
                                    },
                                },
                            ],
                        });
                    },
                    onApprove: async (data, actions) => {
                        const order = await actions.order.capture();
                        const data_send = {
                            customer_name: info.customer_name,
                            email: info.email,
                            phone_number: info.phone_number,
                            shipping_address: info.shipping_address,
                            province: info.province,
                            district: info.district,
                            ward: info.ward,
                            payment: 'paypal',
                        };
                        await request
                            .post('/me/order', { ...data_send })
                            .then((res) => {
                                console.log(res.data);
                                toast.success(res.data.message);
                                dispatch(clearCart());
                                setTimeout(() => {
                                    navigate('/');
                                }, 1000);
                            })
                            .catch((err) =>
                                toast.error(
                                    err.response.data.message ||
                                        'Something went wrong!',
                                ),
                            );
                    },
                    onError: (err) => {
                        // Xử lý lỗi
                        console.log(err);
                    },
                })
                .render('#paypal-button-container');
        }
    }, [paypalReady]);

    return (
        <div>
            <div id="paypal-button-container"></div>
        </div>
    );
};

export default PaypalPayment;
