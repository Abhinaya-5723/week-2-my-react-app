import React from "react";
import AddIncidentForm from "./AddIncidentForm.jsx";
import IncidentCard from "./IncidentCard.jsx";

export default function IncidentList({ incidents, onAdd, onDelete }) {
  return (
    <section>
      <h2 className="title">Incident List</h2>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <AddIncidentForm onAdd={onAdd} />
      </div>

      <div className="grid" role="list" style={{ marginTop: 12 }}>
        {incidents && incidents.length ? (
          incidents.map(i => <IncidentCard key={i.id} incident={i} onDelete={onDelete} />)
        ) : (
          <p style={{ textAlign: "center", color: "var(--muted)" }}>No incidents yet</p>
        )}
      </div>
    </section>
  );
}
