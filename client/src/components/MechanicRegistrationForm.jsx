import React from "react";
import { useState, useEffect } from "react";
import { getAllWorkshops } from "../services/WorkshopService";
const apiUrl = import.meta.env.VITE_API_URL;

export default function MechanicRegistrationForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    specialty: "",
    photo: "",
    workshop: "",
    city: "",
  });
  const [error, setError] = useState("");
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      fetchWorkshops();
    }, []);
  
    const fetchWorkshops = async () => {
      try {
        const data = await getAllWorkshops();
        console.log("All workshops", data);
        setWorkshops(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

  const handleChange = (e) => {
    console.log(`set ${e.target.name} as ${e.target.value}`);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const uniqueCities = [...new Set(workshops.map(item => item.city))];
  
  const filteredWorkshops = workshops.filter(
  (item) => item.city === formData.city
);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.specialty ||
      !formData.photo ||
      !formData.workshop ||
      !formData.city
    ) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await fetch(`${apiUrl}/api/mechReg`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");

      alert("User registered!");
      setFormData({
        firstName: "",
        lastName: "",
        specialty: "",
        photo: "",
        workshop: "",
        city: "",
      });
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <fieldset>
        <legend>Mechanic Registration form</legend>
        <form onSubmit={handleSubmit} className="regForm">
          <div>
            <label htmlFor="">firstName</label>
            <input
              value={formData.firstName}
              name="firstName"
              type="text"
              placeholder="Johnny.."
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="">lastName</label>
            <input
              value={formData.lastName}
              name="lastName"
              type="text"
              placeholder="Johnson.."
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="">specialty</label>
            <input
              value={formData.specialty}
              name="specialty"
              type="text"
              placeholder="Engines.."
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="">photo</label>
            <input
              value={formData.photo}
              name="photo"
              type="text"
              placeholder="url.."
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="workshop">Workshop</label>
              <select
                name="workshop"
                value={formData.workshop}
                onChange={handleChange}
                disabled={!formData.city}
                required
              >
                  <option value="">Select a workshop...</option>
                    {filteredWorkshops.map((item) => (
                    <option key={item.name} value={item.name}>
                    {item.name}
              </option>
                ))}
                </select>
          </div>
           <div>
            <label htmlFor="city">City</label>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              >
              <option value="">Select a city...</option>
                {uniqueCities.map((city) => (
                <option key={city} value={city}>
                {city}
              </option>
                ))}
              </select>
            </div>
          <button>Submit</button>
          {error && <p className="errorMessage">{error}</p>}
        </form>
      </fieldset>
    </div>
  );
}
