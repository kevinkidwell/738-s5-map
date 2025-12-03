import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <nav className="bg-light border-end vh-100 p-3" style={{ width: "240px" }}>
        <h2 className="h5 mb-4">Alliance Manager</h2>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <a className="nav-link active fw-semibold" href="/alliances">Alliances</a>
          </li>
          <li className="nav-item mb-2">
            <a className="nav-link" href="/map">Map</a>
          </li>
          <li className="nav-item mb-2">
            <a className="nav-link" href="/calculations">Calculations</a>
          </li>
          <li className="nav-item mb-2">
            <a className="nav-link" href="/dates">Dates</a>
          </li>
        </ul>
      </nav>

      {/* Main content */}
      <main className="flex-grow-1 p-4 bg-white">{children}</main>
    </div>
  );
}
