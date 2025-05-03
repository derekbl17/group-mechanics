import { useState, useEffect } from "react";
import axios from "axios";
import RegistrationForm from "./components/RegistrationForm.jsx";
import MechanicRegistrationForm from "./components/MechanicRegistrationForm.jsx";
const apiUrl = import.meta.env.VITE_API_URL;
console.log(apiUrl);

function App() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const result = await axios.get(`${apiUrl}/api/test`);
      console.log(result.data);
      setPosts(result.data);
    } catch (err) {
      console.error("Failed to fetch posts", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the POST request to the backend
      const result = await axios.post(`${apiUrl}/api/test`, {
        name,
        message,
      });
      setResponse(result.data);
      setError(null);
      fetchPosts();
    } catch (err) {
      setError("Failed to send data");
      setResponse(null);
    }
  };

  return (
    <>
      <RegistrationForm />
      <MechanicRegistrationForm />
      <h1>Test POST Form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Message:
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>

      {response && (
        <div>
          <h3>Response from Backend:</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
      <h1>Posts</h1>
      <ul>
        {posts?.map((post) => (
          <li key={post._id}>
            <strong>{post.name}</strong>: {post.message}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
