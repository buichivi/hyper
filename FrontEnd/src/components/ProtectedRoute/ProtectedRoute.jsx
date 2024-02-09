import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ authRequired = false, children }) => {
    if (authRequired) {
        return <Navigate to='/login' replace/>;
    }
    return <>{children}</>;
};

export default ProtectedRoute;
