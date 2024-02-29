import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ authRequired = false, children }) => {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

    if (authRequired && !isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
};
ProtectedRoute.propTypes = {
    authRequired: PropTypes.bool,
    children: PropTypes.element,
};

export default ProtectedRoute;
