import { useEffect, useRef, useState } from 'react';
import { IoStar } from 'react-icons/io5';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ReviewForm = ({ onChange = () => {} }) => {
    const [userReviewStars, setUserReviewStars] = useState(0);
    const errorRatingRef = useRef();

    useEffect(() => {
        if (userReviewStars > 0) {
            errorRatingRef.current.style.display = 'none';
        }
    }, [userReviewStars]);

    const reviewForm = useFormik({
        initialValues: {
            title: '',
            content: '',
        },
        validationSchema: Yup.object({
            title: Yup.string().required('This field is required'),
            content: Yup.string().required('This field is required'),
        }),
        onSubmit: (values) => {
            const data = {
                ...values,
                rating: userReviewStars,
            };
            onChange({ data });
        },
    });
    return (
        <form onSubmit={reviewForm.handleSubmit}>
            <div className="grid h-auto w-[80%] grid-cols-4 gap-6 py-4">
                <label htmlFor="title_review">Title:</label>
                <div className="col-span-3 w-full">
                    <input
                        id="title_review"
                        type="text"
                        name="title"
                        placeholder="Enter a title"
                        value={reviewForm.values.title}
                        onChange={reviewForm.handleChange}
                        className="w-full p-2 text-base outline-none ring-1 ring-slate-200 transition-all focus:ring-black"
                    />
                    {reviewForm.errors.title && reviewForm.touched.title && (
                        <span className="text-sm text-red-500">
                            {reviewForm.errors.title}
                        </span>
                    )}
                </div>
                <label htmlFor="content_review">Content:</label>
                <div className="col-span-3 w-full">
                    <textarea
                        id="content_review"
                        type="text"
                        name="content"
                        value={reviewForm.values.content}
                        spellCheck={false}
                        onChange={reviewForm.handleChange}
                        placeholder="Enter your review"
                        className="w-full resize-none p-2 text-base outline-none ring-1 ring-slate-200 transition-all focus:ring-black"
                        rows={4}
                    ></textarea>
                    {reviewForm.errors.content &&
                        reviewForm.touched.content && (
                            <span className="text-sm text-red-500">
                                {reviewForm.errors.content}
                            </span>
                        )}
                </div>
                <label htmlFor="">Stars: </label>
                <div className="col-span-3 ">
                    <div className="flex items-center gap-2">
                        {Array(5)
                            .fill(0)
                            .map((item, index) => {
                                return (
                                    <IoStar
                                        key={index}
                                        className={`cursor-pointer text-slate-300 ${index + 1 <= userReviewStars && '!text-black'}`}
                                        onClick={() =>
                                            setUserReviewStars(index + 1)
                                        }
                                    />
                                );
                            })}
                        <span>{userReviewStars}</span>
                    </div>
                    <span
                        ref={errorRatingRef}
                        className="hidden text-sm text-red-500"
                    >
                        This field is required
                    </span>
                </div>
            </div>
            <button
                className="border border-black bg-black px-8 py-1 text-white 
                transition-all hover:bg-white hover:text-black "
                type="submit"
                onClick={() => {
                    if (userReviewStars == 0)
                        errorRatingRef.current.style.display = 'block';
                }}
            >
                Submit
            </button>
        </form>
    );
};

export default ReviewForm;
