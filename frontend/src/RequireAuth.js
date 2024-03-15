import { Outlet, Navigate } from "react-router-dom";
import useStore from "./store/index";

const RequireAuth = ({ requiredRoles }) => {
  const { user } = useStore();

  if (user=== null) {
    // navigate to login
    return <Navigate to="/" replace />;
  }

  if (!requiredRoles.includes(user.role) && !requiredRoles.includes("any")) {
    // User role is not allowed, navigate to the before page
    return <Navigate to="/unauthorized" replace />;
  }

  // User is authenticated and has the required role
  return <Outlet />;
};

export default RequireAuth;
