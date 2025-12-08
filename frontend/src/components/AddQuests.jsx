import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./addQuests.css";
import api from "./api";
export default function AddQuest() {
  const [title, setTitle] = useState("");
  const [xp, setXp] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId"); // saved from login
    console.log("userId =>", userId);

    await api.post("/quests", {
      userId,
      title,
      xp: parseInt(xp, 10),
      completed: false
    });
   
    
    

    navigate("/quests"); // go back to quests page
  };

  return (
    <div className="add-quest-page">
  
      <div className="add-quest-card">
  
        <h2>Add New Quest</h2>
  
        <form onSubmit={handleSubmit}>
  
          <div className="input-group">
            <label>Quest Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Study for 30 min"
            />
          </div>
  
          <div className="input-group">
            <label>XP</label>
            <input
              type="number"
              value={xp}
              onChange={(e) => setXp(e.target.value)}
              placeholder="50"
            />
          </div>
  
          <button type="submit" className="add-btn">
            Save Quest
          </button>
  
          <button
            type="button"
            className="back-btn"
            onClick={() => navigate("/quests")}
          >
            ← Back
          </button>
  
        </form>
      </div>
    </div>
  );
  
}
