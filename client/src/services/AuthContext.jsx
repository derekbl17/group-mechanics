import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const apiUrl = import.meta.env.MONGODB_URI;

  const checkAuth = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/login-check`, {
        credentials: "include",
      });
  
      if (res.ok) {
        const data = await res.json();
        setIsLoggedIn(true);
        setUsername(data.username);
        setUser(data.user);
      } else {
        setIsLoggedIn(false);
        setUsername(null);
        setUser(null);
      }
    } catch (err) {
      setIsLoggedIn(false);
      setUsername(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = (userData) => {
    setIsLoggedIn(true);
    setUsername(userData.username);
    setUser(userData);
  };
  const logout = () => {
    setIsLoggedIn(false);
    setUsername(null);
  };
console.log("Auth state:", { isLoggedIn, user });
  return (
    <AuthContext.Provider
      value={{ isLoggedIn, username, login, logout, loading, user }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  return useContext(AuthContext);
}
