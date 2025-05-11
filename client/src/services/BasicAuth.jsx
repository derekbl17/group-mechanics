import React, { useEffect, useState } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

export default function RequireBasicAuth() {
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/login-check`, {
          credentials: "include",
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message);

        console.log("✅ Authenticated:", data.message);
        setChecking(false);
      } catch (err) {
        console.log("❌ Not authenticated:", err.message);

        if (location.pathname === "/register") {
          setChecking(false);
        } else {
          navigate("/login", { replace: true });
        }
      }
    };

    checkAuth();
  }, [navigate, location.pathname]);

  if (checking) {
    return <div>Checking authentication...</div>;
  }

  return <Outlet />;
}
