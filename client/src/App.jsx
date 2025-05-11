import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./Pages/LoginPage.jsx";
import RegistrationPage from "./Pages/RegistrationPage.jsx";
import Navbar from "./components/Navbar.jsx";
import RequireAdminAuth from "./services/AdminAuth.jsx";
import RequireBasicAuth from "./services/BasicAuth.jsx";
import ErrorPage from "./Pages/ErrorPage.jsx";
import PublicOnlyRoute from "./routes/PublicOnlyRoute.jsx";
import { useAuth } from "./services/AuthContext.jsx";
import ForbiddenPage from "./Pages/ForbiddenPage.jsx";
import HomePage from "./Pages/HomePage.jsx";
import LikedMechanicsPage from "./Pages/LikedMechanicsPage.jsx";
import Footer from "./components/Footer.js";

function App() {
  const { loading } = useAuth();
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={
              <PublicOnlyRoute>
                <LoginPage />
              </PublicOnlyRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicOnlyRoute>
                <RegistrationPage />
              </PublicOnlyRoute>
            }
          />
          <Route path="/forbidden" element={<ForbiddenPage />} />
          {/* Protected Routes */}
          <Route element={<RequireAdminAuth />}>
            <Route path="/admin" />
          </Route>
          <Route element={<RequireBasicAuth />}>
            <Route path="/likes" element={<LikedMechanicsPage />} />
            <Route path="/basic" />
          </Route>
          {/* Redirects invalid paths to (Error page) */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
