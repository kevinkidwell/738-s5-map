import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useApp } from './store';
import MapPage from './pages/MapPage';
import AlliancesPage from './pages/AlliancesPage';
import SeasonTimeline from './pages/SeasonTimeline';
import CalculationsPage from './pages/CalculationsPage';
import BottomNav from './components/BottomNav';
import PublicSnapshot from './pages/PublicSnapshot';
import Toast from './components/Toast';
import './styles.css';

function AppShell() {
  const navigate = useNavigate();
  const { publishSnapshot } = useApp();
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'info';
    show: boolean;
  }>({
    message: '',
    type: 'success',
    show: false,
  });

  const showToast = (message: string, type: 'success' | 'info') => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setToast({ message: `${message} at ${timestamp}`, type, show: true });
    window.setTimeout(() => setToast((t) => ({ ...t, show: false })), 4000);
  };

  const handlePublish = () => {
    publishSnapshot();
    showToast('Snapshot published successfully', 'success');
  };

  const copySnapshotLink = async () => {
    const url = `${window.location.origin}/public`;
    try {
      await navigator.clipboard.writeText(url);
      showToast('Snapshot link copied', 'info');
    } catch {
      showToast('Copy failed — select and copy the URL manually', 'warning' as any);
    }
  };

  const viewSnapshot = () => {
    navigate('/public');
  };

  return (
    <>
      <header className="app-header" role="banner">
        <button onClick={handlePublish} aria-label="Publish snapshot of the entire site">
          <i className="fa-solid fa-upload me-2" aria-hidden="true"></i>
          <span>Publish Snapshot</span>
        </button>
        <button onClick={copySnapshotLink} aria-label="Copy public snapshot link">
          <i className="fa-solid fa-link me-2" aria-hidden="true"></i>
          <span>Copy Snapshot Link</span>
        </button>
        <button onClick={viewSnapshot} aria-label="View published snapshot">
          <i className="fa-solid fa-eye me-2" aria-hidden="true"></i>
          <span>View Snapshot</span>
        </button>
      </header>

      <main id="main-content" role="main">
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

      <Toast
        message={toast.message}
        type={toast.type}
        show={toast.show}
        onClose={() => setToast((t) => ({ ...t, show: false }))}
      />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

export default App;
