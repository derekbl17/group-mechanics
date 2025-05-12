import React, { useEffect, useState } from "react";
import { getLikedMechanics } from "../services/MechanicService";
import MechanicCard from "../components/MechanicCard";
import { useAuth } from "../services/AuthContext"; // Adjust path as needed

const LikedMechanicsPage = () => {
  const [mechanics, setMechanics] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn, user } = useAuth();
  console.log("yata");
  useEffect(() => {
    const fetchLiked = async () => {
      if (!isLoggedIn) return;
      try {
        const data = await getLikedMechanics();
        setMechanics(data);
      } catch (err) {
        console.error("Could not load liked mechanics", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLiked();
  }, [isLoggedIn]);

  if (!isLoggedIn) return <div>Please log in to view liked mechanics.</div>;
  if (loading) return <div>Loading...</div>;

  return (
    <div className="container">
      <h1>Liked Mechanics</h1>
      {mechanics.length === 0 ? (
        <p>You haven’t liked any mechanics yet.</p>
      ) : (
        <div className="mechanic-grid">
          {mechanics.map((mechanic) => (
            <MechanicCard
              key={mechanic._id}
              mechanic={mechanic}
              isLiked={true}
              userId={user?._id}
              onLikeToggle={() => {
                // re-fetch to update after toggle
                getLikedMechanics().then(setMechanics);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default LikedMechanicsPage;
