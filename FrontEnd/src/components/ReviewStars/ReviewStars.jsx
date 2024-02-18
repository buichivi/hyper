import { IoStar } from 'react-icons/io5';

const ReviewStars = ({ voted = 5, sizeStar = 4 }) => {
    const filledStars = Math.floor(voted);
    const decimalPart = voted - filledStars;

    return (
        <div className="flex items-center gap-1">
            {/* <div className="flex items-center justify-center"> */}
            {Array(filledStars)
                .fill(0)
                .map((item, index) => {
                    return (
                        <IoStar key={index} className={`size-${sizeStar}`} />
                    );
                })}
            {/* </div> */}
            {decimalPart > 0 && (
                <div className="relative">
                    <div
                        className="overflow-hidden"
                        style={{
                            width: `${decimalPart * 100}%`,
                        }}
                    >
                        <IoStar className={`size-${sizeStar}`} />
                    </div>
                    <IoStar
                        className={`absolute left-0 top-0 -z-10 text-gray-300 size-${sizeStar}`}
                    />
                </div>
            )}
            {Array(5 - filledStars - (decimalPart > 0))
                .fill(0)
                .map((item, index) => {
                    return (
                        <IoStar
                            key={index}
                            className={`text-gray-300 size-${sizeStar}`}
                        />
                    );
                })}
        </div>
    );
};

export default ReviewStars;
