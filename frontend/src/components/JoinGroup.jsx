import "./joinGroup.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";

export default function JoinGroup() {

  const navigate = useNavigate();
  const [code, setCode] = useState("");

  const validCode = code.trim().length === 5;

  const handleContinue = async () => {
    if (!validCode) return;

    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please log in first.");
      navigate("/login");
      return;
    }

    try {
      const { data } = await api.post("/groups/join", {
        userId,
        code,
      });
      localStorage.setItem("groupId", data.id);
      localStorage.setItem("groupCode", data.code);
      localStorage.setItem("groupName", data.name);
      localStorage.setItem("duelhabit:onboardingComplete", "true");
      navigate("/home");
    } catch (err) {
      const msg = err?.response?.data?.detail || "Invalid group code.";
      alert(msg);
    }
  };

  return (
    <div className="jg-page">

      <div className="jg-card">

        <div className="jg-steps">
          <div className="jg-step active"></div>
          <div className="jg-step active"></div>
          <div className="jg-step active"></div>
          <div className="jg-step active"></div>
        </div>

        <h2>Join Your Friends</h2>
        <p className="jg-sub">
          Create a group or join one with a code
        </p>

        <label className="jg-label">Group Code</label>

        <input
          className="jg-input"
          placeholder="ABCDE"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
        />

        <button
        //code must have five characters; errors shown after backend call
          className={`jg-btn-light ${validCode ? "enabled" : ""}`}
          disabled={!validCode}
          onClick={handleContinue}
        >
          Continue
        </button>

        <button
          className="jg-back-link"
          onClick={() => navigate("/join-friends")}
        >
          ← Back
        </button>
      </div>
    </div>
  );
}
