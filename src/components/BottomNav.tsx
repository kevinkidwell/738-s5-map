import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

export default function BottomNav() {
  return (
    <div className="tabs">
      <NavLink to="/map" className={({ isActive }) => classNames('tab', { active: isActive })}>
        🗺️ Map
      </NavLink>
      <NavLink to="/alliances" className={({ isActive }) => classNames('tab', { active: isActive })}>
        🎨 Alliances
      </NavLink>
      <NavLink to="/dates" className={({ isActive }) => classNames('tab', { active: isActive })}>
        📅 Dates
      </NavLink>
      <NavLink to="/calculations" className={({ isActive }) => classNames('tab', { active: isActive })}>
        📊 Calculations
      </NavLink>
    </div>
  );
}
