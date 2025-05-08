import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiUrl = import.meta.env.VITE_API_URL;

  const checkAuth = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/login-check`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setIsLoggedIn(true);
        setUsername(data.username);
      } else {
        setIsLoggedIn(false);
        setUsername(null);
      }
    } catch (err) {
      setIsLoggedIn(false);
      setUsername(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = (username) => {
    setIsLoggedIn(true);
    setUsername(username);
  };
  const logout = () => {
    setIsLoggedIn(false);
    setUsername(null);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, username, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
