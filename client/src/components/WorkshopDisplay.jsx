import React, { useEffect, useState } from "react";
import { getAllWorkshops } from "../services/WorkshopService";
import WorkshopCard from "./WorkshopCard";

export default function WorkshopDisplay() {
  const [workshops, setWorkshop] = useState([]);

  useEffect(() => {
    getAllWorkshops()
      .then((data) => {
        setWorkshop(data);
      })
      .catch((err) => {
        console.log("error fetching workshops ", err);
      });
  }, []);
  return (
    <div>
      <h2>workshops</h2>
      <div className="workshop-container">
        {workshops.map((workshop) => (
          <WorkshopCard key={workshop._id} workshop={workshop} />
        ))}
      </div>
    </div>
  );
}
