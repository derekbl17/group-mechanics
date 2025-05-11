import React, { useState, useEffect } from "react";
import { useAuth } from "../services/AuthContext";
import { getLikedMechanics } from "../services/MechanicService";
import MechanicCard from "../components/MechanicCard";

function LikedMechanicsPage() {
  const { user, isLoggedIn } = useAuth();
  const [mechanics, setMechanics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      fetchLikedMechanics();
    } else {
      setLoading(false);
    }
  }, [isLoggedIn]);

  const fetchLikedMechanics = async () => {
    try {
      setLoading(true);
      const likedMechanics = await getLikedMechanics();
      setMechanics(likedMechanics);
      setError(null);
    } catch (err) {
      console.error("Error fetching liked mechanics:", err);
      setError("Failed to load liked mechanics");
      setMechanics([]);
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="container">
        Please log in to view your liked mechanics
      </div>
    );
  }

  if (loading) return <div className="container">Loading...</div>;
  if (error) return <div className="container">Error: {error}</div>;

  return (
    <div className="container">
      <h1>Your Liked Mechanics</h1>
      {mechanics.length === 0 ? (
        <p>You haven't liked any mechanics yet</p>
      ) : (
        <div className="mechanic-grid">
          {mechanics.map((mechanic) => (
            <MechanicCard
              key={mechanic._id}
              mechanic={mechanic}
              isLiked={true} // Since these are all liked mechanics
              isLoggedIn={isLoggedIn}
              userId={user?._id}
              onLikeToggle={() => fetchLikedMechanics()} // Refresh after toggle
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default LikedMechanicsPage;
