import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./duelsPage.css";

const API_BASE = "http://localhost:8000";

export default function DuelsPage() {
  const [tab, setTab] = useState("active");
  const [duels, setDuels] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function loadDuels() {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        setError("You must be logged in to view duels.");
        return;
      }
      try {
        const res = await fetch(`${API_BASE}/duels/${userId}`);
        if (!res.ok) throw new Error("Failed to load duels");
        const data = await res.json();
        setDuels(data);
      } catch (e) {
        console.error(e);
        setError(e.message);
      }
    }

    loadDuels();
  }, []);

  const activeDuels = duels.filter((d) => d.status === "active");
  const pendingDuels = duels.filter((d) => d.status === "pending");
  const completedDuels = duels.filter((d) => d.status === "completed");

  let duelsToShow = activeDuels;
  if (tab === "pending") duelsToShow = pendingDuels;
  if (tab === "completed") duelsToShow = completedDuels;

  return (
    <div className="duelhub-wrapper">
      <div className="duelhub-card">
        <header className="duelhub-header">
          <h1 className="duelhub-title">Duel Hub</h1>
          <p className="duelhub-subtitle">
            Challenge friends and track your duels
          </p>
        </header>

        <div className="duelhub-tabs">
          {/* same tab buttons as before */}
        </div>

        {error && <p className="duelhub-empty">{error}</p>}

        <div className="duelhub-list">
          {duelsToShow.length === 0 && !error && (
            <p className="duelhub-empty">No duels in this tab yet.</p>
          )}

          {tab === "active" &&
            activeDuels.map((duel) => (
              <ActiveDuelCard key={duel.id} duel={duel} />
            ))}

          {tab === "pending" &&
            pendingDuels.map((duel) => (
              <PendingDuelCard key={duel.id} duel={duel} />
            ))}

          {tab === "completed" &&
            completedDuels.map((duel) => (
              <CompletedDuelCard key={duel.id} duel={duel} />
            ))}
        </div>
      </div>

      <button
        className="duelhub-fab"
        onClick={() => navigate("/duels/new")}
        aria-label="Create duel"
      >
        +
      </button>
    </div>
  );
}
