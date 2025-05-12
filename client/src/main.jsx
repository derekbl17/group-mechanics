import { createRoot } from "react-dom/client";
import "../styles/index.css";
import App from "./App.jsx";
import { AuthProvider } from "./services/AuthContext.jsx";
import 'bootstrap/dist/css/bootstrap.css';

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
