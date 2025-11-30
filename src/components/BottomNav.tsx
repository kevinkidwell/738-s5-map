import React from 'react';
import { NavLink } from 'react-router-dom';

const BottomNav: React.FC = () => {
  return (
    <nav className="bottom-nav bg-light border-top d-flex justify-content-around p-2">
      <NavLink
        to="/alliances"
        className={({ isActive }) =>
          `btn btn-primary-subtle flex-fill mx-1 ${isActive ? 'active' : ''}`
        }
      >
        Alliances
      </NavLink>
      <NavLink
        to="/dates"
        className={({ isActive }) =>
          `btn btn-primary-subtle flex-fill mx-1 ${isActive ? 'active' : ''}`
        }
      >
        Dates
      </NavLink>
      <NavLink
        to="/map"
        className={({ isActive }) =>
          `btn btn-primary-subtle flex-fill mx-1 ${isActive ? 'active' : ''}`
        }
      >
        Map
      </NavLink>
      <NavLink
        to="/calculations"
        className={({ isActive }) =>
          `btn btn-primary-subtle flex-fill mx-1 ${isActive ? 'active' : ''}`
        }
      >
        Calculations
      </NavLink>
    </nav>
  );
};

export default BottomNav;
