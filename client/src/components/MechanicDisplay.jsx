import React, { useState, useEffect } from "react";
import { getAllMechanics } from "../services/MechanicService";
import MechanicCard from "./MechanicCard";

function MechanicDisplay() {
  const [mechanics, setMechanics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllMechanics()
      .then((data) => {
        setMechanics(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>All Mechanics</h1>
      <div className="mechanic-container">
        {mechanics.map((mechanic) => (
          <MechanicCard key={mechanic._id} mechanic={mechanic} />
        ))}
      </div>
    </div>
  );
}
export default MechanicDisplay;
