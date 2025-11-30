import React from 'react';
import { NavLink } from 'react-router-dom';

const BottomNav: React.FC = () => {
  return (
    <nav
      className="bottom-nav bg-light border-top d-flex justify-content-around"
      aria-label="Main navigation"
      role="navigation"
    >
      <NavLink
        to="/alliances"
        className={({ isActive }) =>
          `flex-fill text-center nav-item ${
            isActive ? 'btn btn-primary-subtle active' : 'btn btn-light'
          }`
        }
      >
        <i className="fa-solid fa-users d-block mb-1 nav-icon" aria-hidden="true"></i>
        <span className="nav-text">Alliances</span>
      </NavLink>

      <NavLink
        to="/dates"
        className={({ isActive }) =>
          `flex-fill text-center nav-item ${
            isActive ? 'btn btn-primary-subtle active' : 'btn btn-light'
          }`
        }
      >
        <i className="fa-solid fa-calendar-days d-block mb-1 nav-icon" aria-hidden="true"></i>
        <span className="nav-text">Dates</span>
      </NavLink>

      <NavLink
        to="/map"
        className={({ isActive }) =>
          `flex-fill text-center nav-item ${
            isActive ? 'btn btn-primary-subtle active' : 'btn btn-light'
          }`
        }
      >
        <i className="fa-solid fa-map-location-dot d-block mb-1 nav-icon" aria-hidden="true"></i>
        <span className="nav-text">Map</span>
      </NavLink>

      <NavLink
        to="/calculations"
        className={({ isActive }) =>
          `flex-fill text-center nav-item ${
            isActive ? 'btn btn-primary-subtle active' : 'btn btn-light'
          }`
        }
      >
        <i className="fa-solid fa-calculator d-block mb-1 nav-icon" aria-hidden="true"></i>
        <span className="nav-text">Calculations</span>
      </NavLink>
    </nav>
  );
};

export default BottomNav;
