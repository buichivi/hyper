import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ authRequired = false, children }) => {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

    if (authRequired && !isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
};

export default ProtectedRoute;
