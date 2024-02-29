import { HiOutlineArrowLongRight } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Navigation = ({ path }) => {
    return (
        <div className="hidden items-center gap-3 pb-5 *:text-lg *:font-medium *:transition-colors md:flex">
            <Link to="/" className="opacity-100 hover:opacity-70">
                Home
            </Link>
            {path.map((pathItem, index) => {
                return (
                    <div key={index} className="flex items-center gap-2">
                        <span className="opacity-80">
                            <HiOutlineArrowLongRight />
                        </span>
                        <Link
                            to={pathItem?.path}
                            className="opacity-100 hover:opacity-70"
                        >
                            {pathItem?.name}
                        </Link>
                    </div>
                );
            })}
        </div>
    );
};

Navigation.propTypes = {
    path: PropTypes.array,
};

export default Navigation;
