import { HiOutlineArrowLongRight } from "react-icons/hi2";
import { Link } from "react-router-dom";

const Navigation = ({ brandId = '' }) => {
    return (
        <div className="flex items-center gap-3 pb-5 *:text-lg *:font-medium *:transition-colors">
            <Link to="/" className="opacity-100 hover:opacity-70">
                Home
            </Link>
            <span className="opacity-80">
                <HiOutlineArrowLongRight />
            </span>
            <Link to={'/' + brandId} className="opacity-100 hover:opacity-70">
                Nike
            </Link>
        </div>
    );
};

export default Navigation;
