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
import AdminPage from "./Pages/AdminPage.jsx";
import BasicPage from "./Pages/BasicPage.jsx";




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
         
          <Route element={<RequireAdminAuth />}>
            <Route path="/admin" element={<AdminPage />} />
          </Route>
            
          <Route element={<RequireBasicAuth />}>
            <Route path="/basic" element={<BasicPage />} />
          </Route>

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
