import React, { useState } from "react";
import validator from "validator";
import {
  deleteMechanic,
  updateMechanic,
  toggleLikeMechanic,
} from "../services/MechanicService";

function MechanicCard({
  mechanic,
  onDelete,
  onUpdate,
  onLikeToggle,
  isLiked,
  isLoggedIn,
  role, // Accept role as a prop
}) {
  if (!mechanic || !mechanic._id) {
    console.warn("Invalid mechanic data passed to MechanicCard:", mechanic);
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
    if (!isLoggedIn || likeInProgress) {
      console.log("Like action prevented - not logged in or in progress");
      return;
    }

    try {
      setLikeInProgress(true);
      console.log("Toggling like for mechanic:", mechanic._id);

      const updatedMechanic = await toggleLikeMechanic(mechanic._id);
      console.log("Toggled like response:", updatedMechanic);

      onLikeToggle(mechanic._id, updatedMechanic);
    } catch (err) {
      console.error("Error toggling like:", err);
      alert(err.message || "Error toggling like. Please try again.");
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
      onUpdate(updated.mechanic);
      setIsEditing(false);
    } catch (err) {
      alert("Error updating mechanic.");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this mechanic?")) {
      try {
        await deleteMechanic(mechanic._id);
        onDelete(mechanic._id);
      } catch (err) {
        alert("Delete failed.");
      }
    }
  };

  // Make sure likes array exists and is an array
  const likesCount = Array.isArray(mechanic.likes) ? mechanic.likes.length : 0;

  const getLikeButtonText = () => {
    if (!isLoggedIn) {
      return `❤️ Likes (${likesCount})`;
    }
    return isLiked ? `💔 Unlike (${likesCount})` : `❤️ Like (${likesCount})`;
  };

  return (
    <div className="mechanic-card">
      <img
        src={validator.isURL(mechanic.photo) ? mechanic.photo : "../styles/images/mechanic.jpg"}
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

          {/* Conditional rendering of buttons based on role */}
          {role === "admin" ? (
            <>
              <button onClick={() => setIsEditing(true)}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
            </>
          ) : (
            <>
              <button
                onClick={handleLike}
                disabled={likeInProgress || !isLoggedIn}
                className={!isLoggedIn ? "disabled-button" : ""}
              >
                {getLikeButtonText()}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default MechanicCard;
