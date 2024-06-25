// src/BuatChecklist.js
import React, { useState } from "react";
import api from "../api/api";
import "./buatchecklist.css";
import { useNavigate } from "react-router-dom";

const BuatChecklist = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    try {
      const response = await api.post("/checklist", { name });
      setSuccess("Checklist created successfully.");
      navigate("/home");
      setName("");
    } catch (err) {
      setError("Failed to create checklist. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <button type="submit">Create Checklist</button>
    </form>
  );
};

export default BuatChecklist;
