import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/register";
  return (
    <div>
      <ul>
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
      </ul>
      <Outlet />
    </div>
  );
}
