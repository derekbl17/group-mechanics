import React from "react";

function WorkshopCard({ workshop }) {
  return (
    <div className="workshop-card">
      <h2>{workshop.name}</h2>
      <p>City: {workshop.city}</p>
    </div>
  );
}

export default WorkshopCard;
