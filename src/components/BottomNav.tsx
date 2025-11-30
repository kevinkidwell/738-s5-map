import React from 'react';
import { NavLink } from 'react-router-dom';

const BottomNav: React.FC = () => {
  return (
    <nav
      className="bottom-nav nav nav-tabs"
      aria-label="Main navigation"
      role="navigation"
    >
      <NavLink
        to="/alliances"
        className={({ isActive }) =>
          `nav-link ${isActive ? 'active' : ''}`
        }
      >
        <i className="fa-solid fa-users" aria-hidden="true"></i>
        <span>Alliances</span>
      </NavLink>

      <NavLink
        to="/dates"
        className={({ isActive }) =>
          `nav-link ${isActive ? 'active' : ''}`
        }
      >
        <i className="fa-solid fa-calendar-days" aria-hidden="true"></i>
        <span>Dates</span>
      </NavLink>

      <NavLink
        to="/map"
        className={({ isActive }) =>
          `nav-link ${isActive ? 'active' : ''}`
        }
      >
        <i className="fa-solid fa-map-location-dot" aria-hidden="true"></i>
        <span>Map</span>
      </NavLink>

      <NavLink
        to="/calculations"
        className={({ isActive }) =>
          `nav-link ${isActive ? 'active' : ''}`
        }
      >
        <i className="fa-solid fa-calculator" aria-hidden="true"></i>
        <span>Calculations</span>
      </NavLink>
    </nav>
  );
};

export default BottomNav;
