const apiUrl = import.meta.env.VITE_API_URL;

export async function getAllWorkshops() {
  try {
    const response = await fetch(`${apiUrl}/api/workshopGetAll`);
    if (!response.ok) {
      throw new Error("Failed to fetch workshops");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching workshops:", error);
    throw error;
  }
}

export async function registerWorkshop(workshopData) {
  try {
    const response = await fetch(`${apiUrl}/api/workshopReg`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(workshopData),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch workshops");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching workshops:", error);
    throw error;
  }
}

export async function deleteWorkshop(id) {
  try {
    const response = await fetch(`${apiUrl}/api/workshopDelete/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete workshop");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting workshop:", error);
    throw error;
  }
}

export async function updateWorkshop(id, updateData) {
  try {
    const response = await fetch(`${apiUrl}/api/workshopUpdate/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });
    if (!response.ok) {
      throw new Error("Failed to update workshop");
    }
    const data = await response.json();
    return data.workshop; // assuming backend returns { workshop: updatedWorkshop }
  } catch (error) {
    console.error("Error updating workshop:", error);
    throw error;
  }
}
