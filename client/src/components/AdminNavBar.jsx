import React, { useState } from "react";
import MechanicRegistrationForm from "./MechanicRegistrationForm";
import MechanicDisplay from "./MechanicDisplay";
import WorkshopRegForm from "./WorkshopRegForm";
import WorkshopDisplay from "./WorkshopDisplay";

const AdminNavBar = ({ user }) => {
  const [activeComponent, setActiveComponent] = useState("mechanicReg");
  const handleClick = (component) => {
    setActiveComponent(component);
  };

  return (
    <div>
      <nav>
        <button onClick={() => handleClick("mechanicReg")}>Mechaniku registracija</button>
        <button onClick={() => handleClick("mechanicDisplay")}>Mechanikai</button>
        <button onClick={() => handleClick("workshopReg")}>Servisu registracija</button>
        <button onClick={() => handleClick("workshopDisplay")}>Servisai</button>
      </nav>

      <div>
        {activeComponent === "mechanicReg" && <MechanicRegistrationForm />}
        {activeComponent === "mechanicDisplay" && <MechanicDisplay role={user.role} />}
        {activeComponent === "workshopReg" && <WorkshopRegForm />}
        {activeComponent === "workshopDisplay" && <WorkshopDisplay />}
      </div>
    </div>
  );
};

export default AdminNavBar;
