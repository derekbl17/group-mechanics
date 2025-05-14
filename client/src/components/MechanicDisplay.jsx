import React, { useState, useEffect } from 'react';
import { useAuth } from '../services/AuthContext';
import { getAllMechanics, getLikedMechanics } from '../services/MechanicService';
import MechanicCard from './MechanicCard';
import 'bootstrap/dist/css/bootstrap.min.css';

const MechanicDisplay = ({role}) => {
  const { user, isLoggedIn } = useAuth();
  const [mechanics, setMechanics] = useState([]);
  const [likedMechanicIds, setLikedMechanicIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const init = async () => {
      await fetchMechanics();
      console.log(user);
      if (isLoggedIn && user?._id) {
        await fetchLikedMechanics();
      } else {
        setLikedMechanicIds(new Set());
      }
    };
    init();

  }, [isLoggedIn, user]);

  const fetchMechanics = async () => {
    try {
      const data = await getAllMechanics();
      setMechanics(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchLikedMechanics = async () => {
    try {
      const likedMechanicsData = await getLikedMechanics();

      if (Array.isArray(likedMechanicsData) && likedMechanicsData.length > 0) {
        const likedIds = new Set(
          likedMechanicsData.map((mechanic) => mechanic._id)
        );
        console.log("Liked mechanic IDs:", Array.from(likedIds));
        setLikedMechanicIds(likedIds);
      } else {
        setLikedMechanicIds(new Set());
      }
    } catch {
      setLikedMechanicIds(new Set());
    }
  };

  const handleDelete = (id) => setMechanics((prev) => prev.filter((m) => m._id !== id));

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

  const handleLikeToggle = (id, updated) => {
    setMechanics((prev) => prev.map((m) => (m._id === id ? updated : m)));
    if (user?.id && Array.isArray(updated.likes)) {
      const liked = updated.likes.includes(user.id);
      setLikedMechanicIds((prev) => {
        const s = new Set(prev);
        liked ? s.add(id) : s.delete(id);
        return s;
      });
    }
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  if (error)
    return (
      <div className="alert alert-danger text-center my-5">
        Error: {error}
      </div>
    );

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">All Mechanics</h1>
      <div className="row g-4">
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
}

export default MechanicDisplay;
