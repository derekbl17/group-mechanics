import React, { useState, useEffect } from "react";
import { useAuth } from "../services/AuthContext";
import {
  getAllMechanics,
  getLikedMechanics,
} from "../services/MechanicService";
import MechanicCard from "./MechanicCard";

function MechanicDisplay({role}) {
  const { user, isLoggedIn } = useAuth();
  const [mechanics, setMechanics] = useState([]);
  const [likedMechanicIds, setLikedMechanicIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMechanics();

    if (isLoggedIn && user?.id) {
      fetchLikedMechanics();
    } else {
      setLikedMechanicIds(new Set());
    }
  }, [isLoggedIn, user]);

  const fetchMechanics = async () => {
    try {
      const data = await getAllMechanics();
      console.log("All mechanics:", data);
      setMechanics(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching mechanics:", err);
      setError(err.message);
      setLoading(false);
    }
  };

  const fetchLikedMechanics = async () => {
    if (!isLoggedIn) {
      return;
    }

    try {
      console.log("Fetching liked mechanics for user:");
      const likedMechanicsData = await getLikedMechanics();
      console.log("Liked mechanics data:", likedMechanicsData);

      if (Array.isArray(likedMechanicsData) && likedMechanicsData.length > 0) {
        const likedIds = new Set(
          likedMechanicsData.map((mechanic) => mechanic._id)
        );
        console.log("Liked mechanic IDs:", Array.from(likedIds));
        setLikedMechanicIds(likedIds);
      } else {
        console.log("No liked mechanics or invalid data");
        setLikedMechanicIds(new Set());
      }
    } catch (error) {
      console.error("Error loading liked mechanics", error);
      setLikedMechanicIds(new Set());
    }
  };

  const handleDelete = (id) => {
    setMechanics((prev) => prev.filter((m) => m._id !== id));
  };

  const handleUpdate = (updatedMechanic) => {
    setMechanics((prev) =>
      prev.map((m) => (m._id === updatedMechanic._id ? updatedMechanic : m))
    );
  };

  const handleLikeToggle = async (mechanicId, updatedMechanic) => {
    console.log("Like toggle for mechanic:", mechanicId);
    console.log("Updated mechanic data:", updatedMechanic);

    if (!mechanicId || !updatedMechanic) {
      console.error("Missing data in handleLikeToggle");
      return;
    }

    setMechanics((prevMechanics) =>
      prevMechanics.map((m) => (m._id === mechanicId ? updatedMechanic : m))
    );

    if (user?.id && Array.isArray(updatedMechanic.likes)) {
      const isLikedByUser = updatedMechanic.likes.includes(user.id);
      console.log(`Mechanic ${mechanicId} is liked by user:`, isLikedByUser);

      setLikedMechanicIds((prev) => {
        const newSet = new Set(prev);
        if (isLikedByUser) {
          newSet.add(mechanicId);
        } else {
          newSet.delete(mechanicId);
        }
        return newSet;
      });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>All Mechanics</h1>
      <div className="mechanic-container">
        {mechanics.map((mechanic) => (
          <MechanicCard
            key={mechanic._id}
            mechanic={mechanic}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
            onLikeToggle={handleLikeToggle}
            isLiked={likedMechanicIds.has(mechanic._id)}
            isLoggedIn={isLoggedIn}
            role={role}
          />
        ))}
      </div>
    </div>
  );
}

export default MechanicDisplay;
