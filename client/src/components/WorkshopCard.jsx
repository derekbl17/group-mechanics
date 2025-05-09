import React, { useState } from "react";
import { deleteWorkshop, updateWorkshop } from "../services/WorkshopService";

function WorkshopCard({ workshop, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: workshop.name,
    city: workshop.city,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const patchData = {};

    Object.keys(formData).forEach((key) => {
      if (formData[key] !== workshop[key]) {
        patchData[key] = formData[key];
      }
    });

    if (Object.keys(patchData).length === 0) {
      alert("No changes to update.");
      return;
    }

    try {
      const updated = await updateWorkshop(workshop._id, patchData);
      alert("Workshop updated!");
      onUpdate(updated);
      setIsEditing(false);
    } catch (err) {
      alert("Update failed.");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteWorkshop(workshop._id);
      alert("Deleted!");
      onDelete(workshop._id);
    } catch (err) {
      alert("Delete failed.");
    }
  };

  return (
    <div className="workshop-card">
      {isEditing ? (
        <div>
          <input name="name" value={formData.name} onChange={handleChange} />
          <input name="city" value={formData.city} onChange={handleChange} />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <h2>{workshop.name}</h2>
          <p>City: {workshop.city}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default WorkshopCard;
