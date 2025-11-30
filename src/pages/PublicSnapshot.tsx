import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AlliancesPage from './AlliancesPage';
import SeasonTimeline from './SeasonTimeline';
import MapPage from './MapPage';
import CalculationsPage from './CalculationsPage';

const PublicSnapshotNav: React.FC = () => (
  <nav
    className="bottom-nav bg-light border-top d-flex justify-content-around p-2"
    aria-label="Snapshot navigation"
    role="navigation"
  >
    <a href="/public/alliances" className="btn btn-light flex-fill text-center">
      <i className="fa-solid fa-users mb-1"></i>
      <span>Alliances</span>
    </a>
    <a href="/public/dates" className="btn btn-light flex-fill text-center">
      <i className="fa-solid fa-calendar-days mb-1"></i>
      <span>Dates</span>
    </a>
    <a href="/public/map" className="btn btn-light flex-fill text-center">
      <i className="fa-solid fa-map-location-dot mb-1"></i>
      <span>Map</span>
    </a>
    <a href="/public/calculations" className="btn btn-light flex-fill text-center">
      <i className="fa-solid fa-calculator mb-1"></i>
      <span>Calculations</span>
    </a>
  </nav>
);

const PublicSnapshot: React.FC = () => {
  return (
    <div className="d-flex flex-column vh-100">
      <main className="flex-grow-1 overflow-auto">
        <Routes>
          <Route path="/" element={<Navigate to="/public/map" />} />
          <Route path="/public/alliances" element={<AlliancesPage dataSource="published" />} />
          <Route path="/public/dates" element={<SeasonTimeline dataSource="published" />} />
          <Route path="/public/map" element={<MapPage dataSource="published" />} />
          <Route path="/public/calculations" element={<CalculationsPage dataSource="published" />} />
        </Routes>
      </main>
      <PublicSnapshotNav />
    </div>
  );
};

export default PublicSnapshot;
