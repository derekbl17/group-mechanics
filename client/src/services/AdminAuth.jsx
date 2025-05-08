import React, { useEffect, useState } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

export default function RequireAdminAuth() {
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/admin-check`, {
          credentials: "include", // still using cookies
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message);

        console.log("✅ Authenticated:", data.message);
        setChecking(false); // allow rendering
      } catch (err) {
        console.log("❌ Not authenticated:", err.message);

        if (location.pathname === "/register") {
          // Allow access to register
          setChecking(false);
        } else {
          navigate("/forbidden", { replace: true });
        }
      }
    };

    checkAuth();
  }, [navigate, location.pathname]);

  if (checking) {
    return <div>Checking authentication...</div>;
  }

  return <Outlet />; // render nested routes
}
