import React, { useState } from "react";

export default function AddIncidentForm({ onAdd }) {
  const [id, setId] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [severity, setSeverity] = useState("3 - Low");
  const [status, setStatus] = useState("Open");

  function submit(e) {
    e.preventDefault();
    onAdd({ id, priority, severity, status });
    setId("");
    setPriority("Medium");
    setSeverity("3 - Low");
    setStatus("Open");
  }

  return (
    <form className="add-form" onSubmit={submit}>
      <input className="input" value={id} onChange={e => setId(e.target.value)} placeholder="Optional ID (INC-12345)" aria-label="ID" />
      <select className="input" value={priority} onChange={e => setPriority(e.target.value)} aria-label="Priority">
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
        <option>Critical</option>
      </select>
      <select className="input" value={severity} onChange={e => setSeverity(e.target.value)} aria-label="Severity">
        <option>3 - Low</option>
        <option>2 - Medium</option>
        <option>1 - Critical</option>
      </select>
      <select className="input" value={status} onChange={e => setStatus(e.target.value)} aria-label="Status">
        <option>Open</option>
        <option>In Progress</option>
        <option>Resolved</option>
        <option>Closed</option>
      </select>

      <button type="submit" className="add-btn">Add Incident</button>
    </form>
  );
}
