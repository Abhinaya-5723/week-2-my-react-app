import React from "react";
import { NavLink } from "react-router-dom";

export default function Header({ user, timeSinceLastIncident, theme, toggleTheme }) {
  return (
    <header className="header" role="banner">
      <div className="left">Welcome {user.prefix} {user.lastName}!</div>

      <div className="center">Time since last incident: <strong>{timeSinceLastIncident}</strong></div>

      <div className="right">
        <NavLink to="/" className={({isActive}) => "nav-button " + (isActive? "active" : "")}>Home</NavLink>
        <NavLink to="/incidents" className={({isActive}) => "nav-button " + (isActive? "active" : "")}>Incidents</NavLink>

        <button
          className="nav-button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </header>
  );
}
