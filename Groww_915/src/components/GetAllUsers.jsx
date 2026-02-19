import { useEffect, useState } from "react";

export const GetAllUsers = () => {
  // fetch('https://fakestoreapi.com/users')
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/users")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => setUsers(data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>Loading Users...</h2>
      </div>
    );
  }
  if (error) {
    return (
      <div style={{ padding: "40px", textAlign: "center", color: "red" }}>
        <h2>Error: {error}</h2>
      </div>
    );
  }
  return (
    <div>
      <h1>All Users</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {users.map((user) => (
          <div key={user.id} style={{ 
            border: "1px solid #ccc", 
            padding: "15px", 
            borderRadius: "8px",
            textAlign: "center"
          }}>
            <p style={{ color: "red", fontWeight: "800", margin: "2px" }}>
              Name: {user.name.firstname} {user.name.lastname}
            </p>
            <p style={{ margin: "2px" }}>Username:{user.username}</p>
            <p style={{ margin: "2px" }}>Email: {user.email}</p>
          </div>    
        ))}
      </div>
    </div>
  );
};