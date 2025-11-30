import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useApp } from './store';
import MapPage from './pages/MapPage';
import AlliancesPage from './pages/AlliancesPage';
import SeasonTimeline from './pages/SeasonTimeline';
import CalculationsPage from './pages/CalculationsPage';
import BottomNav from './components/BottomNav';
import PublicSnapshot from './pages/PublicSnapshot';
import './styles.css';

function App() {
  const { publishSnapshot } = useApp();

  return (
    <BrowserRouter>
      <div className="app">
        {/* Header with publish button */}
        <header style={{ padding: '1rem', background: '#212529', color: '#fff' }}>
          <button onClick={publishSnapshot}>📤 Publish Snapshot</button>
        </header>

        {/* Main content area */}
        <main style={{ paddingBottom: '4rem' }}>
          <Routes>
            {/* Default route */}
            <Route path="/" element={<Navigate to="/alliances" />} />

            {/* Live editable routes */}
            <Route path="/alliances" element={<AlliancesPage dataSource="live" />} />
            <Route path="/dates" element={<SeasonTimeline dataSource="live" />} />
            <Route path="/map" element={<MapPage dataSource="live" />} />
            <Route path="/calculations" element={<CalculationsPage dataSource="live" />} />

            {/* Public snapshot route (combined site) */}
            <Route path="/public" element={<PublicSnapshot />} />

            {/* Optional: individual public routes if you want them */}
            <Route path="/public/alliances" element={<AlliancesPage dataSource="published" />} />
            <Route path="/public/dates" element={<SeasonTimeline dataSource="published" />} />
            <Route path="/public/map" element={<MapPage dataSource="published" />} />
            <Route path="/public/calculations" element={<CalculationsPage dataSource="published" />} />
          </Routes>
        </main>

        {/* Sticky bottom navigation */}
        <BottomNav />
      </div>
    </BrowserRouter>
  );
}

export default App;
