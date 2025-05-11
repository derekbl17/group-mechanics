import React, { useState } from 'react';
import validator from 'validator';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  deleteMechanic,
  updateMechanic,
  toggleLikeMechanic,
} from '../services/MechanicService';

export default function MechanicCard({
  mechanic,
  onDelete,
  onUpdate,
  onLikeToggle,
  isLiked,
  isLoggedIn,
  userId,
}) {
  if (!mechanic || !mechanic._id) {
    console.warn('Invalid mechanic data passed to MechanicCard:', mechanic);
    return null;
  }

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: mechanic.firstName,
    lastName: mechanic.lastName,
    specialty: mechanic.specialty,
    photo: mechanic.photo,
    workshop: mechanic.workshop,
    city: mechanic.city,
  });
  const [likeInProgress, setLikeInProgress] = useState(false);

  const handleLike = async () => {
    if (!isLoggedIn || likeInProgress) return;
    setLikeInProgress(true);
    try {
      const updated = await toggleLikeMechanic(mechanic._id);
      onLikeToggle(mechanic._id, updated);
    } catch (err) {
      console.error('Error toggling like:', err);
      alert(err.message || 'Error toggling like.');
    } finally {
      setLikeInProgress(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const patchData = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== mechanic[key]) patchData[key] = formData[key];
    });
    if (Object.keys(patchData).length === 0) {
      alert('No changes to update.');
      return;
    }
    try {
      const { mechanic: updatedMech } = await updateMechanic(
        mechanic._id,
        patchData
      );
      onUpdate(updatedMech);
      setIsEditing(false);
    } catch {
      alert('Error updating mechanic.');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this mechanic?')) {
      try {
        await deleteMechanic(mechanic._id);
        onDelete(mechanic._id);
      } catch {
        alert('Delete failed.');
      }
    }
  };

  const likesCount = Array.isArray(mechanic.likes)
    ? mechanic.likes.length
    : 0;
  const likeText = !isLoggedIn
    ? `❤️ Likes (${likesCount})`
    : isLiked
    ? `💔 Unlike (${likesCount})`
    : `❤️ Like (${likesCount})`;

  return (
    <div className="card h-100 shadow-sm">
      <img
        src={
          validator.isURL(mechanic.photo)
            ? mechanic.photo
            : '/styles/images/mechanic.jpg'
        }
        className="card-img-top"
        alt={`${mechanic.firstName} ${mechanic.lastName}`}
      />
      <div className="card-body d-flex flex-column">
        {isEditing ? (
          <>
            <input
              name="firstName"
              className="form-control mb-2"
              value={formData.firstName}
              onChange={handleChange}
            />
            <input
              name="lastName"
              className="form-control mb-2"
              value={formData.lastName}
              onChange={handleChange}
            />
            <input
              name="specialty"
              className="form-control mb-2"
              value={formData.specialty}
              onChange={handleChange}
            />
            <input
              name="photo"
              className="form-control mb-2"
              value={formData.photo}
              onChange={handleChange}
            />
            <input
              name="workshop"
              className="form-control mb-2"
              value={formData.workshop}
              onChange={handleChange}
            />
            <input
              name="city"
              className="form-control mb-3"
              value={formData.city}
              onChange={handleChange}
            />
            <div className="mt-auto d-flex justify-content-between">
              <button
                className="btn btn-success"
                onClick={handleUpdate}
              >
                Save
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <h5 className="card-title">
              {mechanic.firstName} {mechanic.lastName}
            </h5>
            <p className="card-text mb-1">
              <strong>Specialty:</strong> {mechanic.specialty}
            </p>
            <p className="card-text mb-1">
              <strong>Workshop:</strong> {mechanic.workshop}
            </p>
            <p className="card-text mb-3">
              <strong>City:</strong> {mechanic.city}
            </p>
            <div className="mt-auto">
              <button
                className="btn btn-outline-primary me-2"
                onClick={handleLike}
                disabled={likeInProgress || !isLoggedIn}
              >
                {likeText}
              </button>
              <button
                className="btn btn-outline-warning me-2"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}