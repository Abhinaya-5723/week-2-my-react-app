import React from "react";

export default function IncidentCard({ incident, onDelete }) {
  const { id, priority, severity, status } = incident;
  return (
    <article className="card" role="listitem">
      <h4>{id}</h4>
      <p><strong>Priority:</strong> {priority}</p>
      <p><strong>Severity:</strong> {severity}</p>
      <p><strong>Status:</strong> {status}</p>
      <button className="delete" onClick={() => onDelete(id)}>Delete</button>
    </article>
  );
}
