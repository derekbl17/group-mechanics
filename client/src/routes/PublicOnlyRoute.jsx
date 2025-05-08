import { Navigate } from "react-router-dom";
import { useAuth } from "../services/AuthContext";

export default function PublicOnlyRoute({ children }) {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}
