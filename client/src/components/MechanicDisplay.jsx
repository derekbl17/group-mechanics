import React, { useState, useEffect } from "react";
import { getAllMechanics } from "../services/MechanicService";
import MechanicCard from "./MechanicCard";

function MechanicDisplay() {
  const [mechanics, setMechanics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMechanics();
  }, []);

  const fetchMechanics = async () => {
    try {
      const data = await getAllMechanics();
      setMechanics(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    setMechanics((prev) => prev.filter((m) => m._id !== id));
  };

  const handleUpdate = (updatedMechanic) => {
    setMechanics((prev) =>
      prev.map((m) => (m._id === updatedMechanic._id ? updatedMechanic : m))
    );
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>All Mechanics</h1>
      <div className="mechanic-container">
        {mechanics.map((mechanic) => (
          <MechanicCard
            key={mechanic._id}
            mechanic={mechanic}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </div>
    </div>
  );
}
export default MechanicDisplay;
