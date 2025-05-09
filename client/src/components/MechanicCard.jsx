import React from "react";
import validator from "validator";

function MechanicCard({ mechanic }) {
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
      <h2>
        {mechanic.firstName} {mechanic.lastName}
      </h2>
      <p>Specialty: {mechanic.specialty}</p>
      <p>Workshop: {mechanic.workshop}</p>
      <p>City: {mechanic.city}</p>
    </div>
  );
}

export default MechanicCard;
