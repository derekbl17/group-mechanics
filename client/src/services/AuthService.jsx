const apiUrl = import.meta.env.VITE_API_URL;

export async function loginUser(formData) {
  const res = await fetch(`${apiUrl}/api/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Something went wrong");

  return data;
}
