import React from 'react';
import { NavLink } from 'react-router-dom';
import './styles.css';

export default function BottomNav() {
  return (
    <div className="tabs">
      <NavLink to="/map" className="tab">🗺️ Map</NavLink>
      <NavLink to="/alliances" className="tab">🎨 Alliances</NavLink>
      <NavLink to="/dates" className="tab">📅 Dates</NavLink>
      <NavLink to="/calculations" className="tab">📊 Calculations</NavLink>
    </div>
  );
}
