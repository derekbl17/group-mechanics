import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;
import { useAuth } from "../services/AuthContext";

export default function UserLoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const { login } = useAuth();

  const navigate = useNavigate();

  const handleChange = (e) => {
    console.log(`set ${e.target.name} as ${e.target.value}`);
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
      const res = await fetch(`${apiUrl}/api/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");

      alert(`Welcome ${data.username} (${data.role})`);
      console.log(data);
      setFormData({ email: "", password: "" });
      setError("");
      login(data.username);
      navigate("/");
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
            <label htmlFor="">Email</label>
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
            <label htmlFor="">Password</label>
            <input
              value={formData.password}
              name="password"
              type="password"
              placeholder="*****"
              onChange={handleChange}
              required
            />
          </div>
          <button>Submit</button>
          {error && <p className="errorMessage">{error}</p>}
        </form>
      </fieldset>
    </div>
  );
}
