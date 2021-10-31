import { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useNavigate } from "react-router";
import PropTypes from "prop-types";
// hooks
import useAuth from "../hooks/useAuth";
// pages
import Login from "../pages/authentication/Login";

// ----------------------------------------------------------------------

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default function AuthGuard({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState(null);

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    if (userId === null) {
      setRequestedLocation(pathname);
      navigate("/auth/login");
    }
  }, []);

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
}
