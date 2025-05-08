import React from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../services/AuthContext";
const apiUrl = import.meta.env.VITE_API_URL;

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, username, loading, logout } = useAuth();

  const handleLogout = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        logout(); // update local auth context
        navigate("/login"); // redirect to login or home
      } else {
        console.error("Failed to log out");
      }
    } catch (err) {
      console.error("Logout error", err);
    }
  };

  if (loading) {
    return <div>Loading navbar...</div>;
  }
  return (
    <div>
      <ul>
        {isLoggedIn && <li>Hello, {username}!</li>}
        {location.pathname !== "/" && (
          <li>
            <Link to="/">Home</Link>
          </li>
        )}
        {isLoggedIn ? (
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        ) : (
          <>
            {location.pathname !== "/login" && (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
            {location.pathname !== "/register" && (
              <li>
                <Link to="/register">Register</Link>
              </li>
            )}
          </>
        )}
      </ul>
      <Outlet />
    </div>
  );
}
