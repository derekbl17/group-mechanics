import React from "react";
import { useState } from "react";
const apiUrl = import.meta.env.VITE_API_URL;

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    console.log(`set ${e.target.name} as ${e.target.value}`);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic client-side validation
    if (!formData.username || !formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await fetch(`${apiUrl}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");

      alert("User registered!");
      setFormData({ username: "", email: "", password: "" });
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <fieldset>
        <legend>User registration form</legend>
        <form onSubmit={handleSubmit} className="regForm">
          <div>
            <label htmlFor="">Username</label>
            <input
              value={formData.username}
              name="username"
              type="text"
              placeholder="user123.."
              onChange={handleChange}
              required
            />
          </div>
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
