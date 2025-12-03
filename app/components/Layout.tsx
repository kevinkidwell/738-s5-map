import React from "react";
import { useLocation } from "@remix-run/react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  const navItems = [
    { label: "Alliances", path: "/alliances" },
    { label: "Map", path: "/map" },
    { label: "Calculations", path: "/calculations" },
    { label: "Dates", path: "/dates" },
  ];

  return (
    <div className="d-flex">
      <nav className="sidebar bg-light border-end vh-100 p-3" style={{ width: "240px" }}>
        <h2 className="h5 mb-4">Alliance Manager</h2>
        <ul className="nav flex-column">
          {navItems.map((item) => (
            <li key={item.path} className="nav-item mb-2">
              <a
                href={item.path}
                className={`nav-link fw-semibold ${
                  location.pathname === item.path ? "active text-primary" : "text-dark"
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <main className="flex-grow-1 p-4 bg-white">{children}</main>
    </div>
  );
}
