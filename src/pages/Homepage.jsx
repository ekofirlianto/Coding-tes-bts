import React, { useState, useEffect } from "react";
import api from "../api/api";
import "./home.css";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();
  const [checklist, setChecklist] = useState([]);
  const [error, setError] = useState("");
  const [checkedItems, setCheckedItems] = useState({});

  useEffect(() => {
    const fetchChecklist = async () => {
      try {
        const response = await api.get("/checklist");
        setChecklist(response.data);

        // Initialize checked state
        const initialCheckedState = response.data.data.reduce((acc, item) => {
          acc[item.id] = item.checked || false;
          return acc;
        }, {});
        setCheckedItems(initialCheckedState);
      } catch (err) {
        setError("Failed to fetch checklist. Please try again.");
      }
    };

    fetchChecklist();
  }, []);

  const handleNavigate = () => {
    navigate("/create-checklist"); // Ganti dengan path halaman tujuan
  };

  const handleCheckboxChange = (itemId) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [itemId]: !prevCheckedItems[itemId],
    }));
  };

  const handleDelete = async (itemId) => {
    try {
      await api.delete(`/checklist/${itemId}`);
      setChecklist((prevChecklist) => ({
        ...prevChecklist,
        data: prevChecklist.data.filter((item) => item.id !== itemId),
      }));
    } catch (err) {
      setError("Failed to delete item. Please try again.");
    }
  };

  return (
    <div>
      <button onClick={handleNavigate}>Buat Checklist</button>
      {error && <p>{error}</p>}
      <ul>
        {checklist?.data?.map((item) => (
          <li key={item.id}>
            {/* <input
              type="checkbox"
              checked={checkedItems[item.id] || false}
              onChange={() => handleCheckboxChange(item.id)}
            /> */}
            {item.name}
            <button
              className="delete-button"
              onClick={() => handleDelete(item.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Homepage;
