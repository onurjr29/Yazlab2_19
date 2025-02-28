import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, role }) => {
    const user = useSelector((state) => state.user.user);
    if (!user || user.role !== role) {
        return <Navigate to="/login" />;
    }
    return children;
};

export default ProtectedRoute;
