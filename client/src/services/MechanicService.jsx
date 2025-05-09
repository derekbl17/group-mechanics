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
