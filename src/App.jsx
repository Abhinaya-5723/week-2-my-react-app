import React, { useEffect, useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Home from "./components/Home.jsx";
import IncidentList from "./components/IncidentList.jsx";
import "./App.css";

/* example initial incidents (timestamps are ms) */
const SAMPLE_INCIDENTS = [
  { id: "INC-741085", priority: "Medium", severity: "3 - Low", status: "Closed", timestamp: Date.now() - 1000 * 60 * 60 * 5 },
  { id: "INC-602934", priority: "Critical", severity: "1 - Critical", status: "Resolved", timestamp: Date.now() - 1000 * 60 * 60 * 48 },
  { id: "INC-74108222", priority: "Medium", severity: "3 - Low", status: "Closed", timestamp: Date.now() - 1000 * 60 * 30 },
  { id: "INC-7412235085", priority: "High", severity: "2 - Medium", status: "Open", timestamp: Date.now() - 1000 * 60 * 90 },
  { id: "INC-852963", priority: "Low", severity: "3 - Low", status: "In Progress", timestamp: Date.now() - 1000 * 60 * 200 },
];

function formatTimeDiff(ms) {
  const s = Math.floor(ms / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m} min`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} hr`;
  const d = Math.floor(h / 24);
  return `${d} d`;
}

export default function App() {
  // theme stored as "dark" or "light"
  const [theme, setTheme] = useState(() => localStorage.getItem("theme_v1") || "dark");

  // incidents persisted
  const [incidents, setIncidents] = useState(() => {
    const raw = localStorage.getItem("incidents_v1");
    if (raw) {
      try { return JSON.parse(raw); } catch { /* ignore */ }
    }
    return SAMPLE_INCIDENTS;
  });

  // small tick to recompute time string every minute
  const [, setTick] = useState(0);

  // persist incidents and theme
  useEffect(() => {
    localStorage.setItem("incidents_v1", JSON.stringify(incidents));
  }, [incidents]);

  useEffect(() => {
    localStorage.setItem("theme_v1", theme);
  }, [theme]);

  // update tick every minute (so time-since updates)
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 60 * 1000);
    return () => clearInterval(id);
  }, []);

  // compute last incident timestamp
  const lastIncidentTimestamp = useMemo(() => {
    if (!incidents || incidents.length === 0) return null;
    return Math.max(...incidents.map(i => i.timestamp || 0));
  }, [incidents]);

  const timeSinceLastIncident = lastIncidentTimestamp ? formatTimeDiff(Date.now() - lastIncidentTimestamp) : "N/A";

  // helpers for add/delete
  function generateId() {
    return `INC-${Math.floor(Math.random() * 900000) + 100000}`;
  }

  function addIncident({ id, priority, severity, status }) {
    const newInc = {
      id: id && id.trim() ? id.trim() : generateId(),
      priority,
      severity,
      status,
      timestamp: Date.now(),
    };
    setIncidents(prev => [newInc, ...prev]);
  }

  function deleteIncident(id) {
    setIncidents(prev => prev.filter(i => i.id !== id));
  }

  function toggleTheme() {
    setTheme(t => (t === "dark" ? "light" : "dark"));
  }

  return (
    <div className={`app ${theme}`}>
      <Header
        user={{ prefix: "Ms.", lastName: "Abhinaya" }}
        timeSinceLastIncident={timeSinceLastIncident}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/incidents" element={
            <IncidentList
              incidents={incidents}
              onAdd={addIncident}
              onDelete={deleteIncident}
            />
          } />
          {/* fallback to home */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      <footer className="footer">Incident portal — demo</footer>
    </div>
  );
}
