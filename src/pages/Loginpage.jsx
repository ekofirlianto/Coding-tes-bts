// src/Loginpage.js
import React, { useState } from "react";
import api from "../api/api";
import "./login.css";
import { useNavigate } from "react-router-dom";

const Loginpage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post("/login", { username, password });
      console.log("Response:", response.data);
      if (response.data.statusCode === 2110) {
        localStorage.setItem("token", response.data.data.token);
        navigate("/home");
      }
      // Lakukan sesuatu dengan response, misalnya simpan token atau alihkan halaman
    } catch (err) {
      console.error("Error:", err);
      setError("Login failed. Please check your username and password.");
    }
  };

  const handleRegister = () => {
    navigate("/register"); // Ganti dengan path halaman tujuan
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div style={{ display: "flex", gap: "5px" }}>
        <button type="submit">Login</button>
        <button onClick={handleRegister}>Register</button>
      </div>
    </form>
  );
};

export default Loginpage;
