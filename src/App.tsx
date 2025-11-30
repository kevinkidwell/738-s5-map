import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useApp } from './store';
import MapPage from './pages/MapPage';
import AlliancesPage from './pages/AlliancesPage';
import SeasonTimeline from './pages/SeasonTimeline';
import CalculationsPage from './pages/CalculationsPage';
import BottomNav from './components/BottomNav';
import PublicSnapshot from './pages/PublicSnapshot';
import Toast from './components/Toast';
import './styles.css';

function App() {
  const { publishSnapshot } = useApp();
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info'; show: boolean }>({
    message: '',
    type: 'success',
    show: false,
  });

  const showToast = (message: string, type: 'success' | 'info') => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setToast({ message: `${message} at ${timestamp}`, type, show: true });
    setTimeout(() => setToast({ ...toast, show: false }), 4000);
  };

  const handlePublish = () => {
    publishSnapshot();
    showToast('Snapshot published successfully', 'success');
  };

  const copySnapshotLink = () => {
    const url = `${window.location.origin}/public`;
    navigator.clipboard.writeText(url).then(() => {
      showToast('Snapshot link copied', 'info');
    });
  };

  return (
    <BrowserRouter>
      <div className="app">
        <header style={{ padding: '1rem', background: '#212529', color: '#fff', display: 'flex', gap: '1rem' }}>
          <button onClick={handlePublish}>📤 Publish Snapshot</button>
          <button onClick={copySnapshotLink}>🔗 Copy Snapshot Link</button>
        </header>

        <main style={{ paddingBottom: '4rem' }}>
          <Routes>
            <Route path="/" element={<Navigate to="/alliances" />} />
            <Route path="/alliances" element={<AlliancesPage dataSource="live" />} />
            <Route path="/dates" element={<SeasonTimeline dataSource="live" />} />
            <Route path="/map" element={<MapPage dataSource="live" />} />
            <Route path="/calculations" element={<CalculationsPage dataSource="live" />} />
            <Route path="/public" element={<PublicSnapshot />} />
          </Routes>
        </main>

        <BottomNav />

        {/* Toast notification */}
        <Toast
          message={toast.message}
          type={toast.type}
          show={toast.show}
          onClose={() => setToast({ ...toast, show: false })}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
