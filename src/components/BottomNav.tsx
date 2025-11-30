// src/components/BottomNav.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const BottomNav: React.FC = () => {
  return (
    <nav className="bottom-nav nav nav-tabs">
      <NavLink
        to="/alliances"
        className={({ isActive }) =>
          `nav-item nav-link flex-fill text-center ${isActive ? 'active' : ''}`
        }
      >
        <i className="fa-solid fa-users me-2" aria-hidden="true"></i>
        <span>Alliances</span>
      </NavLink>

      <NavLink
        to="/dates"
        className={({ isActive }) =>
          `nav-item nav-link flex-fill text-center ${isActive ? 'active' : ''}`
        }
      >
        <i className="fa-solid fa-calendar-days me-2" aria-hidden="true"></i>
        <span>Dates</span>
      </NavLink>

      <NavLink
        to="/map"
        className={({ isActive }) =>
          `nav-item nav-link flex-fill text-center ${isActive ? 'active' : ''}`
        }
      >
        <i className="fa-solid fa-map-location-dot me-2" aria-hidden="true"></i>
        <span>Map</span>
      </NavLink>

      <NavLink
        to="/calculations"
        className={({ isActive }) =>
          `nav-item nav-link flex-fill text-center ${isActive ? 'active' : ''}`
        }
      >
        <i className="fa-solid fa-calculator me-2" aria-hidden="true"></i>
        <span>Calculations</span>
      </NavLink>
    </nav>
  );
};

export default BottomNav;
