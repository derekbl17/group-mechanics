import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { deleteWorkshop, updateWorkshop } from '../services/WorkshopService';

export default function WorkshopCard({ workshop, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: workshop.name, city: workshop.city });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const patchData = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== workshop[key]) patchData[key] = formData[key];
    });
    if (Object.keys(patchData).length === 0) {
      alert('No changes to update.');
      return;
    }
    try {
      const updated = await updateWorkshop(workshop._id, patchData);
      onUpdate(updated);
      setIsEditing(false);
    } catch {
      alert('Update failed.');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this workshop?')) {
      try {
        await deleteWorkshop(workshop._id);
        onDelete(workshop._id);
      } catch {
        alert('Delete failed.');
      }
    }
  };

  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body d-flex flex-column">
        {isEditing ? (
          <>
            <input
              name="name"
              className="form-control mb-2"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              name="city"
              className="form-control mb-3"
              value={formData.city}
              onChange={handleChange}
            />
            <div className="mt-auto d-flex justify-content-between">
              <button className="btn btn-success" onClick={handleUpdate}>
                Save
              </button>
              <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <h5 className="card-title">{workshop.name}</h5>
            <p className="card-text flex-grow-1 mb-3">
              <strong>City:</strong> {workshop.city}
            </p>
            <div className="mt-auto d-flex justify-content-between">
              <button className="btn btn-outline-warning" onClick={() => setIsEditing(true)}>
                Edit
              </button>
              <button className="btn btn-outline-danger" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
