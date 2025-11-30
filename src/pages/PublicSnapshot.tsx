import React from 'react';
import { useApp } from '../store';
import AlliancesPage from './AlliancesPage';
import SeasonTimeline from './SeasonTimeline';
import MapPage from './MapPage';
import CalculationsPage from './CalculationsPage';

const PublicSnapshot: React.FC = () => {
  const { publishedData } = useApp();

  if (!publishedData) {
    return (
      <div style={{ padding: '2rem' }}>
        <h2>No snapshot published yet</h2>
        <p>Please publish a snapshot from the main site before sharing this link.</p>
      </div>
    );
  }

  const publishedDate = new Date(publishedData.publishedAt).toLocaleString([], {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="public-snapshot">
      <h1>Alliance Season Snapshot</h1>
      <p>Last published on {new Date(publishedData.publishedAt).toLocaleString()}</p>

      <AlliancesPage dataSource="published" />
      <SeasonTimeline dataSource="published" />
      <MapPage dataSource="published" />
      <CalculationsPage dataSource="published" />
    </div>
  );
};

export default PublicSnapshot;
