import React, { useEffect, useState } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../services/AuthContext"; // Assuming you're using this context

export default function RequireAdminAuth() {
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isLoggedIn } = useAuth(); // Get user info from context

  useEffect(() => {
    const checkAuth = async () => {
      if (!isLoggedIn) {
        navigate("/login", { replace: true });
        return;
      }

      if (user && user.role === "basic") {
        setChecking(false);
      } else {
        console.log("Redirecting to forbidden page");
        navigate("/forbidden", { replace: true });
      }
    };

    checkAuth();
  }, [isLoggedIn, user, navigate]);

  if (checking) {
    return <div>Checking authentication...</div>;
  }

  return <Outlet />;  
}
