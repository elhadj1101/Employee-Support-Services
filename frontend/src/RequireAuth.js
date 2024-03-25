import { Outlet, Navigate } from "react-router-dom";
import useStore from "./store/index";
import { jwtDecode } from "jwt-decode";

const RequireAuth = ({ requiredRoles , excludedRoles=[]}) => {
  const { user, setUser } = useStore();
  if (user=== null) {
    if (localStorage.getItem("access_token") === null) {
      console.log("no token");
      return <Navigate to="/login" replace />;
    }
    const decodedToken = jwtDecode( localStorage.getItem('access_token'));
    
    if (new Date(decodedToken.exp) < Date()) {
      console.log("token expired");
      //try refresh it
      // ...
      // if failed
      return <Navigate to="/" replace />;
    }else {
      console.log("token not expired");

      setUser(decodedToken);
      // return <Outlet />; 
    }
  }
  // if (user && user.is_superuser) {
  //   return <Navigate to="/utilisateurs" replace />;
  // }

  if (user  && !requiredRoles.includes(user.role) && !requiredRoles.includes("any") && !user.is_superuser) {
    // User role is not allowed, navigate to the before page
    return <Navigate to="/unauthorized" replace />;
  }
  if (user && excludedRoles.includes("admin") && user.is_superuser) {
    return <Navigate to="/utilisateurs" replace />;

  }
  if (user && excludedRoles.includes(user.role)){
    return <Navigate to="/unauthorized" replace />;

  }
  // User is authenticated and has the required role
  return <Outlet />;
};

export default RequireAuth;
