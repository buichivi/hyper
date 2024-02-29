import { Header, Footer } from '../../components';
import PropTypes from 'prop-types';

const MainLayout = ({ children }) => {
    return (
        <div className="mx-4 md:mx-14 2xl:mx-[15%]">
            <Header />
            <div className="pt-[100px]">{children}</div>
            <Footer />
        </div>
    );
};
MainLayout.propTypes = {
    children: PropTypes.element,
};

export default MainLayout;
