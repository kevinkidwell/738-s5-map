import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MapPage from './pages/MapPage';
import AlliancesPage from './pages/AlliancesPage';
import DatesPage from './pages/DatesPage';
import CalculationsPage from './pages/CalculationsPage';
import BottomNav from './components/BottomNav';
import './styles.css';

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Navigate to="/map" />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/alliances" element={<AlliancesPage />} />
          <Route path="/dates" element={<DatesPage />} />
          <Route path="/calculations" element={<CalculationsPage />} />
        </Routes>
        <BottomNav />
      </div>
    </BrowserRouter>
  );
}
