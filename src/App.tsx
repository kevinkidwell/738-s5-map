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

  const copySnapshotLink = () => {
    const url = `${window.location.origin}/public`;
    navigator.clipboard.writeText(url).then(() => {
      alert('Snapshot link copied to clipboard!');
    });
  };

  return (
    <BrowserRouter>
      <div className="app">
        {/* Header with publish + share buttons */}
        <header style={{ padding: '1rem', background: '#212529', color: '#fff', display: 'flex', gap: '1rem' }}>
          <button onClick={publishSnapshot}>📤 Publish Snapshot</button>
          <button onClick={copySnapshotLink}>🔗 Copy Snapshot Link</button>
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

            {/* Combined snapshot site */}
            <Route path="/public" element={<PublicSnapshot />} />
          </Routes>
        </main>

        {/* Sticky bottom navigation */}
        <BottomNav />
      </div>
    </BrowserRouter>
  );
}

export default App;
