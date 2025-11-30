import React from 'react';
import { NavLink } from 'react-router-dom';

const BottomNav: React.FC = () => {
  return (
    <nav
      className="bottom-nav bg-light border-top d-flex justify-content-around p-2"
      aria-label="Main navigation"
      role="navigation"
    >
      <NavLink
        to="/alliances"
        className={({ isActive }) =>
          `btn flex-fill mx-1 d-flex flex-column align-items-center ${
            isActive ? 'btn-primary-subtle active' : 'btn-light'
          }`
        }
      >
        <i className="fa-solid fa-users mb-1" aria-hidden="true"></i>
        <span>Alliances</span>
      </NavLink>

      <NavLink
        to="/dates"
        className={({ isActive }) =>
          `btn flex-fill mx-1 d-flex flex-column align-items-center ${
            isActive ? 'btn-primary-subtle active' : 'btn-light'
          }`
        }
      >
        <i className="fa-solid fa-calendar-days mb-1" aria-hidden="true"></i>
        <span>Dates</span>
      </NavLink>

      <NavLink
        to="/map"
        className={({ isActive }) =>
          `btn flex-fill mx-1 d-flex flex-column align-items-center ${
            isActive ? 'btn-primary-subtle active' : 'btn-light'
          }`
        }
      >
        <i className="fa-solid fa-map-location-dot mb-1" aria-hidden="true"></i>
        <span>Map</span>
      </NavLink>

      <NavLink
        to="/calculations"
        className={({ isActive }) =>
          `btn flex-fill mx-1 d-flex flex-column align-items-center ${
            isActive ? 'btn-primary-subtle active' : 'btn-light'
          }`
        }
      >
        <i className="fa-solid fa-calculator mb-1" aria-hidden="true"></i>
        <span>Calculations</span>
      </NavLink>
    </nav>
  );
};

export default BottomNav;
