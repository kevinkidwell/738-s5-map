import { NavLink } from "@remix-run/react";

export default function BottomNav() {
  return (
    <nav className="navbar fixed-bottom bg-white border-top">
      <div className="container d-flex justify-content-around">
        <NavLink to="/alliances" className="nav-link">Alliances</NavLink>
        <NavLink to="/map" className="nav-link">Map</NavLink>
        <NavLink to="/timeline" className="nav-link">Timeline</NavLink>
        <NavLink to="/snapshots" className="nav-link">Snapshots</NavLink>
      </div>
    </nav>
  );
}
