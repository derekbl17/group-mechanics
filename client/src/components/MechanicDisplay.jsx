import React, { useState, useEffect } from 'react';
import { useAuth } from '../services/AuthContext';
import { getAllMechanics, getLikedMechanics } from '../services/MechanicService';
import MechanicCard from './MechanicCard';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function MechanicDisplay() {
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
      setMechanics(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchLikedMechanics = async () => {
    try {
      const liked = await getLikedMechanics();
      if (Array.isArray(liked)) {
        setLikedMechanicIds(new Set(liked.map((m) => m._id)));
      } else {
        setLikedMechanicIds(new Set());
      }
    } catch {
      setLikedMechanicIds(new Set());
    }
  };

  const handleDelete = (id) => setMechanics((prev) => prev.filter((m) => m._id !== id));

  const handleUpdate = (updated) =>
    setMechanics((prev) => prev.map((m) => (m._id === updated._id ? updated : m)));

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
          <div key={mechanic._id} className="col-sm-6 col-md-4 col-lg-3">
            <MechanicCard
              mechanic={mechanic}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
              onLikeToggle={handleLikeToggle}
              isLiked={likedMechanicIds.has(mechanic._id)}
              isLoggedIn={isLoggedIn}
              userId={user?.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
}