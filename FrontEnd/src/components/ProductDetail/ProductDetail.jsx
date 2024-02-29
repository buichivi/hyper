import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { ReviewForm, ReviewStars } from '../';
import { IoIosArrowDown } from 'react-icons/io';
import { SORT_COMMENT } from '../../constants';
import request from '../../utils/request';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

const ProductDetail = ({ productId = null }) => {
    const [selectedTab, setSelectedTab] = useState('description');
    const [limitReviews, setLimitReviews] = useState(3);
    const [sortReviewMethod, setSortReviewMethod] = useState(SORT_COMMENT[0]);
    const [productReviews, setProductReviews] = useState({});
    const [isReviewing, setIsReviewing] = useState(false);
    const [reviewDetails, setReviewDetails] = useState([]);

    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

    const loadData = useCallback(async () => {
        await request.get('/product-reviews/' + productId).then((res) => {
            setProductReviews(res.data);
            setReviewDetails(res.data.reviews.review_details);
        });
    }, [productId]);

    useEffect(() => {
        loadData();
    }, [productId, loadData]);

    const handleCreateReview = async ({ data }) => {
        await request
            .post('/product-reviews', {
                ...data,
                product_id: productId,
            })
            .then((res) => {
                toast.success('Add a review successfully!');
                setReviewDetails((prev) => [res.data.review, ...prev]);
            })
            .catch((err) =>
                toast.error(
                    err.response.data.message || 'Something went wrong!',
                ),
            );
    };

    return (
        <div>
            <div className="relative flex items-center *:min-w-[25%] *:px-2 *:py-2 *:text-lg">
                {Object.keys(productReviews).map((item, index) => {
                    return (
                        <div
                            key={index}
                            className={`relative flex cursor-pointer select-none items-center capitalize 
                            ${selectedTab == item && 'bg-gray-200 font-medium'} transition-all`}
                            onClick={() => setSelectedTab(item)}
                        >
                            <span>{item}</span>
                            {item == 'reviews' && (
                                <div className="flex items-center pl-1">
                                    {' ('}
                                    <span>{reviewDetails.length}</span>
                                    {')'}
                                </div>
                            )}
                            {selectedTab == item ? (
                                <motion.span
                                    layoutId="underline"
                                    className="absolute bottom-0 left-0 right-0 h-[1px] bg-black"
                                ></motion.span>
                            ) : null}
                        </div>
                    );
                })}
            </div>
            <div>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedTab}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="px-2 py-4"
                    >
                        {selectedTab == 'description' ? (
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: productReviews[selectedTab],
                                }}
                            ></div>
                        ) : (
                            <div>
                                <div className="flex w-fit items-center gap-2 pb-2">
                                    <ReviewStars
                                        voted={
                                            productReviews[selectedTab]
                                                ?.rating_average
                                        }
                                    />
                                    <div>
                                        <span className="inline-block pl-2 font-BebasNeue text-2xl font-medium">
                                            {
                                                productReviews[selectedTab]
                                                    ?.rating_average
                                            }
                                        </span>
                                    </div>
                                </div>
                                <div className="pb-4">
                                    <label
                                        htmlFor="toggle-review"
                                        className="text-medium cursor-pointer pb-4 font-bold leading-[1.5] 
                                        underline"
                                        onClick={() =>
                                            setIsReviewing(!isReviewing)
                                        }
                                    >
                                        Write your review
                                    </label>
                                    <AnimatePresence>
                                        {isReviewing && (
                                            <motion.div
                                                key={isReviewing}
                                                className="overflow-hidden px-2"
                                                initial={{
                                                    y: '100%',
                                                    height: '0',
                                                    opacity: 0,
                                                }}
                                                animate={{
                                                    y: '0',
                                                    height: 'auto',
                                                    opacity: 1,
                                                }}
                                                exit={{
                                                    y: '100%',
                                                    height: '0',
                                                    opacity: 0,
                                                }}
                                            >
                                                {isAuthenticated ? (
                                                    <ReviewForm
                                                        onChange={
                                                            handleCreateReview
                                                        }
                                                    />
                                                ) : (
                                                    <Link
                                                        to="/login"
                                                        className="inline-block border border-black bg-black px-4 py-2 text-white transition-colors hover:bg-white hover:text-black"
                                                    >
                                                        Sign In
                                                    </Link>
                                                )}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                                {reviewDetails?.length > 0 ? (
                                    <div>
                                        <div className="flex items-center gap-2 pb-2">
                                            <span>Sort by</span>
                                            <div className="relative w-[130px] select-none">
                                                <label
                                                    htmlFor="sort-menu"
                                                    className="flex items-center 
                                                justify-between border-[1px] border-black px-1 py-1"
                                                >
                                                    {sortReviewMethod.name}
                                                    <IoIosArrowDown />
                                                </label>
                                                <input
                                                    type="checkbox"
                                                    id="sort-menu"
                                                    className="peer/sort-menu hidden"
                                                />
                                                <div
                                                    className="pointer-events-none absolute left-0 top-[calc(100%_+_1px)] 
                                                w-full translate-y-10 border-[1px] border-black bg-white 
                                                opacity-0 transition-all 
                                                duration-500 *:block *:px-2
                                                *:py-1 
                                                peer-checked/sort-menu:pointer-events-auto 
                                                peer-checked/sort-menu:translate-y-0 
                                                peer-checked/sort-menu:opacity-100"
                                                >
                                                    {SORT_COMMENT.map(
                                                        (sortItem, index) => {
                                                            return (
                                                                <span
                                                                    key={index}
                                                                    className={`${index < SORT_COMMENT.length - 1 && 'border-b-[1px] border-b-black'} 
                                                                cursor-pointer hover:bg-gray-100`}
                                                                    onClick={(
                                                                        e,
                                                                    ) => {
                                                                        setSortReviewMethod(
                                                                            sortItem,
                                                                        );
                                                                        e.target.parentElement.previousElementSibling.checked = false;
                                                                    }}
                                                                >
                                                                    {
                                                                        sortItem.name
                                                                    }
                                                                </span>
                                                            );
                                                        },
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        {reviewDetails
                                            .sort(sortReviewMethod.method)
                                            .map((review, index) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className={`pb-4 ${index + 1 > limitReviews && 'hidden'}`}
                                                    >
                                                        <h5 className="text-lg font-medium">
                                                            {review?.title}
                                                        </h5>
                                                        <div className="flex items-center gap-2">
                                                            <ReviewStars
                                                                voted={
                                                                    review?.rating
                                                                }
                                                                sizeStar={3}
                                                            />
                                                            <div className="text-gray-400">
                                                                <span className="text-black">
                                                                    {
                                                                        review?.user_name
                                                                    }
                                                                </span>
                                                                <span> - </span>
                                                                <span>
                                                                    {
                                                                        review?.comment_on
                                                                    }
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            {review?.comment}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                    </div>
                                ) : (
                                    <div>
                                        <span className="text-sm text-slate-500">
                                            This product has no reviews yet.
                                        </span>
                                    </div>
                                )}
                                {reviewDetails?.length > limitReviews && (
                                    <button
                                        className="px-4 py-1 ring-1 ring-black transition-all hover:bg-black hover:text-white"
                                        onClick={() =>
                                            setLimitReviews(limitReviews + 3)
                                        }
                                    >
                                        See more reviews
                                    </button>
                                )}
                                {reviewDetails?.length > 0 &&
                                    reviewDetails?.length <= limitReviews &&
                                    limitReviews > 3 && (
                                        <button
                                            className="px-4 py-1 ring-1 ring-black transition-all hover:bg-black hover:text-white"
                                            onClick={() => setLimitReviews(3)}
                                        >
                                            Hide reviews
                                        </button>
                                    )}
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};
ProductDetail.propTypes = {
    productId: PropTypes.number,
};
export default ProductDetail;
