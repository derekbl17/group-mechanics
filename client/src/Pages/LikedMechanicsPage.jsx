// import React, { useEffect, useState } from "react";
// import { getLikedMechanics } from "../services/MechanicService";
// import MechanicCard from "../components/MechanicCard";
// import { useAuth } from "../services/AuthContext"; // Adjust path as needed

// const LikedMechanicsPage = () => {
//   const [mechanics, setMechanics] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { isLoggedIn, user } = useAuth();
//   useEffect(() => {
//     const fetchLiked = async () => {
//       if (!isLoggedIn) return;
//       try {
//         const data = await getLikedMechanics();
//         setMechanics(data);
//       } catch (err) {
//         console.error("Could not load liked mechanics", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLiked();
//   }, [isLoggedIn]);

//   if (!isLoggedIn) return <div>Please log in to view liked mechanics.</div>;
//   if (loading) return <div>Loading...</div>;

//   return (
//     <div className="card-container">
//       <h1>Liked Mechanics</h1>
//       {mechanics.length === 0 ? (
//         <p>You haven’t liked any mechanics yet.</p>
//       ) : (
//         <div className="mechanic-grid">
//           {mechanics.map((mechanic) => (
//             <MechanicCard
//               key={mechanic._id}
//               mechanic={mechanic}
//               isLiked={true}
//               userId={user?._id}
//               onLikeToggle={() => {
//                 // re-fetch to update after toggle
//                 getLikedMechanics().then(setMechanics);
//               }}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default LikedMechanicsPage;

import React, { useEffect, useState } from "react";
import {
  getAllMechanics,
  getLikedMechanics,
} from "../services/MechanicService";
import MechanicCard from "../components/MechanicCard";
import { useAuth } from "../services/AuthContext";

const LikedMechanicsPage = ({ role }) => {
  const { user, isLoggedIn } = useAuth();
  const [mechanics, setMechanics] = useState([]);
  const [likedMechanicIds, setLikedMechanicIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        const allMechanics = await getAllMechanics();
        setMechanics(allMechanics);

        if (isLoggedIn && user?._id) {
          const likedData = await getLikedMechanics();
          const likedIds = new Set(likedData.map((m) => m._id));
          setLikedMechanicIds(likedIds);
        } else {
          setLikedMechanicIds(new Set());
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [isLoggedIn, user]);

  const handleLikeToggle = async (mechanicId, updatedMechanic) => {
    if (!mechanicId || !updatedMechanic) return;

    setMechanics((prev) =>
      prev.map((m) => (m._id === mechanicId ? updatedMechanic : m))
    );

    if (user?.id && Array.isArray(updatedMechanic.likes)) {
      const liked = updatedMechanic.likes.includes(user.id);
      setLikedMechanicIds((prev) => {
        const newSet = new Set(prev);
        liked ? newSet.add(mechanicId) : newSet.delete(mechanicId);
        return newSet;
      });
      if (!liked) {
        setMechanics((prev) => prev.filter((m) => m._id !== mechanicId));
      }
    }
  };

  const likedMechanics = mechanics.filter((m) => likedMechanicIds.has(m._id));

  if (!isLoggedIn) return <div>Please log in to view liked mechanics.</div>;
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="card-container">
      <h1>Liked Mechanics</h1>
      {likedMechanics.length === 0 ? (
        <p>You haven’t liked any mechanics yet.</p>
      ) : (
        <div className="mechanic-grid">
          {likedMechanics.map((mechanic) => (
            <MechanicCard
              key={mechanic._id}
              mechanic={mechanic}
              onLikeToggle={handleLikeToggle}
              isLiked={true}
              isLoggedIn={isLoggedIn}
              role={role}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default LikedMechanicsPage;
