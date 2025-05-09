import React from "react";
import MechanicDisplay from "../components/MechanicDisplay";
import WorkshopRegForm from "../components/WorkshopRegForm";
import WorkshopDisplay from "../components/WorkshopDisplay";

export default function HomePage() {
  return (
    <div>
      <h1>Home</h1>
      <MechanicDisplay />
      <WorkshopRegForm />
      <WorkshopDisplay />
    </div>
  );
}
