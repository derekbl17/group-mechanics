import React from "react";
import { useState } from "react";
import { registerWorkshop } from "../services/WorkshopService";

export default function WorkshopRegForm() {
  const [workshopData, setWorkshopData] = useState({
    name: "",
    city: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setWorkshopData({ ...workshopData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!workshopData.name || !workshopData.city) {
      setError("All fields are required");
      return;
    }

    try {
      const data = await registerWorkshop(workshopData);

      setWorkshopData({ name: "", city: "" });
      setError("");
      alert("Workshop Registered!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <fieldset>
        <legend>Workshop Registration form</legend>
        <form onSubmit={handleSubmit} className="regForm">
          <div>
            <label htmlFor="name">name</label>
            <input
              value={workshopData.name}
              name="name"
              type="text"
              placeholder="name"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="city">city</label>
            <input
              value={workshopData.city}
              name="city"
              type="text"
              placeholder="city"
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
