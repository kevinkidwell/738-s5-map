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

  return (
    <div className="public-snapshot">
      <h1>Alliance Season Snapshot</h1>

      <section>
        <AlliancesPage dataSource="published" />
      </section>

      <section>
        <SeasonTimeline dataSource="published" />
      </section>

      <section>
        <MapPage dataSource="published" />
      </section>

      <section>
        <CalculationsPage dataSource="published" />
      </section>
    </div>
  );
};

export default PublicSnapshot;
