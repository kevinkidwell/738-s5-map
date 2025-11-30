import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useApp } from './store';
import MapPage from './pages/MapPage';
import AlliancesPage from './pages/AlliancesPage';
import SeasonTimeline from './pages/SeasonTimeline';
import CalculationsPage from './pages/CalculationsPage';
import BottomNav from './components/BottomNav';
import './styles.css';

function App() {
  const { publishSnapshot } = useApp();

  return (
    <BrowserRouter>
      <div className="app">
        <header style={{ padding: '1rem', background: '#212529', color: '#fff' }}>
          <button onClick={publishSnapshot}>📤 Publish Snapshot</button>
        </header>

        <main style={{ paddingBottom: '4rem' }}>
          <Routes>
            <Route path="/" element={<Navigate to="/alliances" />} />
            <Route path="/alliances" element={<AlliancesPage dataSource="live" />} />
            <Route path="/dates" element={<SeasonTimeline dataSource="live" />} />
            <Route path="/map" element={<MapPage dataSource="live" />} />
            <Route path="/calculations" element={<CalculationsPage dataSource="live" />} />

            {/* Public snapshot routes */}
            <Route path="/public" element={<PublicSnapshot />} />
            <Route path="/public/alliances" element={<AlliancesPage dataSource="published" />} />
            <Route path="/public/dates" element={<SeasonTimeline dataSource="published" />} />
            <Route path="/public/map" element={<MapPage dataSource="published" />} />
            <Route path="/public/calculations" element={<CalculationsPage dataSource="published" />} />
          </Routes>
        </main>

        <BottomNav />
      </div>
    </BrowserRouter>
  );
}

export default App;
