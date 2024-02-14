import { useEffect } from 'react';
import { Header, Footer } from '../../components';

const MainLayout = ({ children }) => {

    return (
        <div className="mx-4 md:mx-14 2xl:mx-[15%]">
            <Header />
            <div className="pt-[100px]">{children}</div>
            <Footer />
        </div>
    );
};

export default MainLayout;
