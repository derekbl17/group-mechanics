import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { deleteWorkshop, updateWorkshop } from '../services/WorkshopService';

function WorkshopCard({ workshop, onDelete, onUpdate, role }) {
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
    <div className="workshop-card">
      {isEditing ? (
        <div>
          <input className="form-control mb-2" name="name" value={formData.name} onChange={handleChange} />
          <input className="form-control mb-3" name="city" value={formData.city} onChange={handleChange} />
          {role === "admin" && (
            <div className="mt-auto d-flex justify-content-between">
              <button className="btn btn-success" onClick={handleUpdate}>Save</button>
              <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
            <div/>
          )}
        </div>
      ) : (
        <div>
          <h2 className="card-title">{workshop.name}</h2>
          <p className="card-text flex-grow-1 mb-3">City: {workshop.city}</p>
          {role === "admin" && (
            <button  className="btn btn-outline-warning" onClick={() => setIsEditing(true)}>Edit</button>
          )}
        </div>
      )}
      {role === "admin" && <button className="btn btn-outline-danger" onClick={handleDelete}>Delete</button>}
    </div>
  );
}
