import { IoStar } from 'react-icons/io5';

const ReviewStars = ({ voted = 5, sizeStar = 4 }) => {
    return (
        <div className="flex items-center gap-1">
            {Array(5)
                .fill(0)
                .map((item, index) => {
                    const filledStars = Math.floor(voted);
                    const decimalPart = voted - filledStars;
                    return (
                        <div
                            key={index}
                            className="flex items-center justify-center"
                        >
                            {index + 1 <= filledStars ? (
                                <IoStar className={`size-${sizeStar}`} />
                            ) : (
                                <div className="relative">
                                    <div
                                        className="overflow-hidden"
                                        style={{
                                            width: `${decimalPart * 100}%`,
                                        }}
                                    >
                                        <IoStar
                                            className={`size-${sizeStar}`}
                                        />
                                    </div>
                                    <IoStar
                                        className={`absolute left-0 top-0 -z-10 text-gray-300 size-${sizeStar}`}
                                    />
                                </div>
                            )}
                        </div>
                    );
                })}
        </div>
    );
};

export default ReviewStars;
