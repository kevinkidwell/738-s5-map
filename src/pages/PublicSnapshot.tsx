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
      <main id="main-content" className="container py-4">
        <h1 className="h3">No snapshot published yet</h1>
        <p className="text-secondary">
          Please publish a snapshot from the main site before sharing this link.
        </p>
      </main>
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
    <main id="main-content" className="container py-4" role="main">
      <header className="mb-3">
        <h1 className="h3">Alliance Season Snapshot</h1>
        <p className="text-secondary" aria-live="polite">
          Last published on {publishedDate}
        </p>
      </header>

      <section aria-labelledby="alliances-section" className="mb-4">
        <h2 id="alliances-section" className="h5">Alliances</h2>
        <AlliancesPage dataSource="published" />
      </section>

      <section aria-labelledby="timeline-section" className="mb-4">
        <h2 id="timeline-section" className="h5">Season timeline</h2>
        <SeasonTimeline dataSource="published" />
      </section>

      <section aria-labelledby="map-section" className="mb-4">
        <h2 id="map-section" className="h5">Map</h2>
        <MapPage dataSource="published" />
      </section>

      <section aria-labelledby="calculations-section" className="mb-4">
        <h2 id="calculations-section" className="h5">Calculations</h2>
        <CalculationsPage dataSource="published" />
      </section>
    </main>
  );
};

export default PublicSnapshot;
