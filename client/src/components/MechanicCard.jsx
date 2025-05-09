import React, { useState } from "react";
import validator from "validator";
import { deleteMechanic, updateMechanic } from "../services/MechanicService";

function MechanicCard({ mechanic, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: mechanic.firstName,
    lastName: mechanic.lastName,
    specialty: mechanic.specialty,
    photo: mechanic.photo,
    workshop: mechanic.workshop,
    city: mechanic.city,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const patchData = {};

    Object.keys(formData).forEach((key) => {
      if (formData[key] !== mechanic[key]) {
        patchData[key] = formData[key];
      }
    });

    if (Object.keys(patchData).length === 0) {
      alert("No changes to update.");
      return;
    }

    try {
      const updated = await updateMechanic(mechanic._id, patchData);
      alert("Mechanic updated successfully!");
      console.log(updated.mechanic);
      onUpdate(updated.mechanic);
      setIsEditing(false);
    } catch (err) {
      alert("Error updating mechanic.");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteMechanic(mechanic._id);
      alert("Deleted!");
      onDelete(mechanic._id);
    } catch (err) {
      alert("Delete failed.");
    }
  };

  return (
    <div className="mechanic-card">
      <img
        src={
          validator.isURL(mechanic.photo)
            ? mechanic.photo
            : "../styles/images/mechanic.jpg"
        }
        alt={`${mechanic.firstName} ${mechanic.lastName}`}
      />
      {isEditing ? (
        <div>
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          <input
            name="specialty"
            value={formData.specialty}
            onChange={handleChange}
          />
          <input name="photo" value={formData.photo} onChange={handleChange} />
          <input
            name="workshop"
            value={formData.workshop}
            onChange={handleChange}
          />
          <input name="city" value={formData.city} onChange={handleChange} />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <h2>
            {mechanic.firstName} {mechanic.lastName}
          </h2>
          <p>Specialty: {mechanic.specialty}</p>
          <p>Workshop: {mechanic.workshop}</p>
          <p>City: {mechanic.city}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default MechanicCard;
