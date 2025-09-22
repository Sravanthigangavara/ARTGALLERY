import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api"; // axios instance
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [artworks, setArtworks] = useState([]);

  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (!username || role !== "admin") {
      navigate("/login");
    } else {
      fetchUsers();
      fetchArtworks();
    }
  }, [username, role, navigate]);

  // ✅ Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin/users"); // updated endpoint
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  // ✅ Fetch all artworks
  const fetchArtworks = async () => {
    try {
      const res = await api.get("/admin/artworks"); // updated endpoint
      setArtworks(res.data);
    } catch (err) {
      console.error("Error fetching artworks:", err);
    }
  };

  // Delete user
  const deleteUser = async (username) => {
    if (!window.confirm(`Delete user "${username}"?`)) return;
    try {
      await api.delete(`/admin/users/${username}`);
      setUsers(users.filter((u) => u.username !== username));
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  // Delete artwork
  const deleteArtwork = async (id) => {
    if (!window.confirm("Delete this artwork?")) return;
    try {
      await api.delete(`/admin/artworks/${id}`);
      setArtworks(artworks.filter((a) => a.id !== id));
    } catch (err) {
      console.error("Error deleting artwork:", err);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="admin-dashboard">
      {/* Navbar */}
      <nav className="navbar-admin">
        <Link to="/" className="logo">ArtGallery Admin</Link>
        <div className="nav-links">
          <Link to="/" className="nav-btn">Dashboard</Link>
          <button className="nav-btn logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <div className="dashboard-container">
        {/* Users Section */}
        <section className="users-section">
          <h2>All Users</h2>
          {users.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.username}>
                    <td>{user.username}</td>
                    <td>{user.role}</td>
                    <td>
                      <button className="delete-btn" onClick={() => deleteUser(user.username)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : <p>No users found.</p>}
        </section>

        {/* Artworks Section */}
        <section className="artworks-section">
          <h2>All Artworks</h2>
          {artworks.length > 0 ? (
            <div className="art-grid">
              {artworks.map((art) => (
                <div key={art.id} className="art-card">
                  {art.imageUrl && <img src={`${api.defaults.baseURL}${art.imageUrl}`} alt={art.title} />}
                  <h3>{art.title}</h3>
                  <p>{art.description}</p>
                  <p><strong>Type:</strong> {art.type}</p>
                  <p><strong>Price:</strong> ${art.price}</p>
                  <p><em>By: {art.artist?.username || "Unknown"}</em></p>
                  <button className="delete-btn" onClick={() => deleteArtwork(art.id)}>Delete Artwork</button>
                </div>
              ))}
            </div>
          ) : <p>No artworks found.</p>}
        </section>
      </div>
    </div>
  );
}
