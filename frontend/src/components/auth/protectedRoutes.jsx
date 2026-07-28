import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { hasAtLeastRole } from "../../utils/helpers";

const ProtectedRoute = ({ children, minRole }) => {
    const { currentUser, loading } = useAuth();

    if (loading) return null;

    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    if (minRole && !hasAtLeastRole(currentUser.role, minRole)) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default ProtectedRoute;
