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
