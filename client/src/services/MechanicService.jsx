const apiUrl = import.meta.env.VITE_API_URL;

export async function getAllMechanics() {
  try {
    const response = await fetch(`${apiUrl}/api/mechGetAll`);
    if (!response.ok) {
      throw new Error("Failed to fetch mechanics");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching mechanics:", error);
    throw error;
  }
}

export async function updateMechanic(id, params) {
  try {
    const response = await fetch(`${apiUrl}/api/mechUpdate/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
    if (!response.ok) {
      throw new Error("Failed to update mechanic");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error updating mechanic:", err);
    throw err;
  }
}

export async function deleteMechanic(id) {
  try {
    const response = await fetch(`${apiUrl}/api/mechDelete/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete mechanic");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error deleting mechanic:", err);
    throw err;
  }
}

export async function toggleLikeMechanic(id) {
  try {
    const response = await fetch(`${apiUrl}/api/mechLike/${id}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error("Failed to toggle like");

    const text = await response.text();
    console.log("Raw toggle like response:", text);

    try {
      // Try to parse the response as JSON
      const data = JSON.parse(text);
      console.log("Parsed toggle like response:", data);

      // Handle both possible response formats
      if (data.mechanic) {
        return data.mechanic;
      } else {
        return data;
      }
    } catch (parseError) {
      console.error("Error parsing toggle like response:", parseError);
      throw new Error("Invalid response format");
    }
  } catch (error) {
    console.error("Error toggling like:", error);
    throw error;
  }
}

export async function getLikedMechanics() {
  try {
    const response = await fetch(`${apiUrl}/api/mechanics/liked`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch liked mechanics: ${response.status}`);
    }

    const text = await response.text(); // <-- get raw text instead of assuming JSON
    console.log("Raw liked mechanics response:", text);

    if (!text || text.trim() === "") {
      console.log("Empty response for liked mechanics");
      return [];
    }

    try {
      const data = JSON.parse(text);
      console.log("Parsed liked mechanics data:", data);

      // Handle different possible response formats
      if (Array.isArray(data)) {
        return data;
      } else if (data.mechanics && Array.isArray(data.mechanics)) {
        return data.mechanics;
      } else if (data.data && Array.isArray(data.data)) {
        return data.data;
      } else {
        console.warn("Unexpected liked mechanics response format:", data);
        return [];
      }
    } catch (parseError) {
      console.error("Failed to parse JSON from response:", parseError);
      return [];
    }
  } catch (error) {
    console.error("Error fetching liked mechanics:", error);
    return []; // fallback to empty on error
  }
}
