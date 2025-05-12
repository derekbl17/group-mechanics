import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../services/AuthContext";
import { loginUser } from "../services/AuthService";

export default function UserLoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Basic client-side validation
    if (!formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }
  
    try {
      const data = await loginUser(formData); 
  
      alert(`Welcome ${data.username} (${data.role})`);
  
      setFormData({ email: "", password: "" });
      setError("");
  
     
      login(data);

      if (data.role === "admin") {
        console.log("admin")
        setTimeout(() => {
          navigate("/admin");
        }, 100);
      } else if (data.role === "basic") {
        setTimeout(() => {
          navigate("/basic");
        }, 100);
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.message);
    }
  };
  

  return (
    <div>
      <fieldset>
        <legend>User login form</legend>
        <form onSubmit={handleSubmit} className="regForm">
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={formData.email}
              name="email"
              type="email"
              placeholder="mailer@mail.co"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={formData.password}
              name="password"
              type="password"
              placeholder="*****"
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Submit</button>
          {error && <p className="errorMessage">{error}</p>}
        </form>
      </fieldset>
    </div>
  );
}
