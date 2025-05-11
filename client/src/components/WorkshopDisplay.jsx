import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAllWorkshops } from '../services/WorkshopService';
import WorkshopCard from './WorkshopCard';

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
    } catch (err) {
      setError(err.message);
    } finally {
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

  if (loading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <div className="spinner-border text-secondary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center my-5">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Workshops</h2>
      <div className="row g-4">
        {workshops.map((workshop) => (
          <div key={workshop._id} className="col-sm-6 col-md-4 col-lg-3">
            <WorkshopCard
              workshop={workshop}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
