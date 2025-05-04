import React, { useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL; // assuming you're using Vite

export default function AdminCheckButton() {
  const [message, setMessage] = useState("");

  const checkAdmin = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/admin-check`, {
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setMessage(`✅ ${data.message}`);
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    }
  };

  return (
    <div>
      <button onClick={checkAdmin}>Check if Admin</button>
      {message && <p>{message}</p>}
    </div>
  );
}
