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
