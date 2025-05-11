import React, { useEffect, useState } from "react";
import { getAllWorkshops } from "../services/WorkshopService";
import WorkshopCard from "./WorkshopCard";

export default function WorkshopDisplay() {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWorkshops();
  }, []);

  const fetchWorkshops = async () => {
    try {
      const data = await getAllWorkshops();
      setWorkshops(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    setWorkshops((prev) => prev.filter((w) => w._id !== id));
  };

  const handleUpdate = (updatedWorkshop) => {
    setWorkshops((prev) =>
      prev.map((w) => (w._id === updatedWorkshop._id ? updatedWorkshop : w))
    );
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Workshops</h2>
      <div className="workshop-container">
        {workshops.map((workshop) => (
          <WorkshopCard
            key={workshop._id}
            workshop={workshop}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </div>
    </div>
  );
}
