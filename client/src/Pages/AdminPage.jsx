import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../services/AuthContext"; 
import AdminNavBar from "../components/AdminNavBar"


const AdminPage = () => {
  const navigate = useNavigate();
  const { logout, username, user } = useAuth();
  console.log(user.role);


  return (
    <div>
      <h1>Admin panel</h1>
      <AdminNavBar user={user} />
    </div>
  );
};

export default AdminPage;
