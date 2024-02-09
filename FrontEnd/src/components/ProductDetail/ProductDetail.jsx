import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { ReviewStars } from '../';
import { IoIosArrowDown } from 'react-icons/io';
import { DEMO_CONTENT, SORT_METHODS } from '../../constants';
import { IoStar } from 'react-icons/io5';

const ProductDetail = () => {
    const [selectedTab, setSelectedTab] = useState(
        Object.keys(DEMO_CONTENT)[0],
    );
    const [limitReviews, setLimitReviews] = useState(3);
    const [sortReviewMethod, setSortReviewMethod] = useState(SORT_METHODS[0]);
    const [userReviewStars, setUserReviewStars] = useState(0);

    return (
        <div>
            <div className="relative flex items-center *:min-w-[25%] *:px-2 *:py-2 *:text-lg">
                {Object.keys(DEMO_CONTENT).map((item, index) => {
                    return (
                        <div
                            key={index}
                            className={`relative flex cursor-pointer select-none items-center capitalize 
                            ${selectedTab == item && 'bg-gray-200 font-medium'} transition-all`}
                            onClick={() => setSelectedTab(item)}
                        >
                            <span>{item}</span>
                            {item == 'review' && (
                                <div className="flex items-center pl-1">
                                    {' ('}
                                    <span>
                                        {
                                            DEMO_CONTENT[item].review_details
                                                .length
                                        }
                                    </span>
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
                                    __html: DEMO_CONTENT[selectedTab],
                                }}
                            ></div>
                        ) : (
                            <div>
                                <div className="flex w-fit items-center gap-2 pb-2">
                                    <ReviewStars
                                        voted={
                                            DEMO_CONTENT[selectedTab].average
                                        }
                                    />
                                    <div>
                                        <span className="inline-block pl-2 font-BebasNeue text-2xl font-medium">
                                            {DEMO_CONTENT[selectedTab].average}
                                        </span>
                                    </div>
                                </div>
                                <div className="pb-4">
                                    <label
                                        htmlFor="toggle-review"
                                        className="text-medium cursor-pointer pb-4 font-bold leading-[1.5] 
                                        underline"
                                    >
                                        Write your review
                                    </label>
                                    <input
                                        type="checkbox"
                                        id="toggle-review"
                                        className="peer/toggle-review hidden"
                                    />
                                    <div
                                        className="py-2 px-2 pointer-events-none translate-y-4 h-0 overflow-hidden pt-2 opacity-0
                                        transition-all peer-checked/toggle-review:pointer-events-auto peer-checked/toggle-review:h-[auto] 
                                        peer-checked/toggle-review:translate-y-0 peer-checked/toggle-review:opacity-100 duration-500"
                                    >
                                        <div className="grid w-[80%] grid-cols-4 gap-2 pb-4">
                                            <label htmlFor="title_review">
                                                Title:
                                            </label>
                                            <input
                                                id="title_review"
                                                type="text"
                                                placeholder="Enter a title"
                                                className="col-span-3 px-2 text-sm outline-none ring-1 ring-slate-200 transition-all focus:ring-black"
                                            />
                                            <label htmlFor="content_review">
                                                Content:
                                            </label>
                                            <textarea
                                                id="content_review"
                                                type="text"
                                                placeholder="Enter your review"
                                                className="col-span-3 resize-none px-2 text-sm outline-none ring-1 ring-slate-200 transition-all focus:ring-black"
                                                rows={4}
                                            ></textarea>
                                            <label htmlFor="">Stars: </label>
                                            <div className="col-span-3 flex items-center gap-2">
                                                {Array(5)
                                                    .fill(0)
                                                    .map((item, index) => {
                                                        return (
                                                            <IoStar
                                                                key={index}
                                                                className={`cursor-pointer text-slate-300 ${index + 1 <= userReviewStars && '!text-black'}`}
                                                                onClick={() =>
                                                                    setUserReviewStars(
                                                                        index +
                                                                            1,
                                                                    )
                                                                }
                                                            />
                                                        );
                                                    })}
                                                <span>{userReviewStars}</span>
                                            </div>
                                        </div>
                                        <button className="transition-all bg-black px-8 py-1 text-white ring-1 ring-black hover:bg-white hover:text-black ">
                                            Submit
                                        </button>
                                    </div>
                                </div>
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
                                                {SORT_METHODS.map(
                                                    (sortItem, index) => {
                                                        return (
                                                            <span
                                                                key={index}
                                                                className={`${index < SORT_METHODS.length - 1 && 'border-b-[1px] border-b-black'} 
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
                                                                {sortItem.name}
                                                            </span>
                                                        );
                                                    },
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    {DEMO_CONTENT[selectedTab].review_details
                                        .sort(sortReviewMethod.method)
                                        .map((review, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className={`pb-4 ${index + 1 > limitReviews && 'hidden'}`}
                                                >
                                                    <h5 className="text-lg font-medium">
                                                        {review.review_title}
                                                    </h5>
                                                    <div className="flex items-center gap-2">
                                                        <ReviewStars
                                                            voted={review.voted}
                                                            sizeStar={3}
                                                        />
                                                        <div className="text-gray-400">
                                                            <span className="text-black">
                                                                {
                                                                    review.user_name
                                                                }
                                                            </span>
                                                            <span> - </span>
                                                            <span>
                                                                {review.date}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        {review.review_content}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </div>
                                {DEMO_CONTENT[selectedTab].review_details
                                    .length > limitReviews && (
                                    <button
                                        className="px-4 py-1 ring-1 ring-black transition-all hover:bg-black hover:text-white"
                                        onClick={() =>
                                            setLimitReviews(limitReviews + 3)
                                        }
                                    >
                                        See more reviews
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

export default ProductDetail;