import React, { useState } from 'react';
import { useApp } from '../store';

const MapPage: React.FC<{ dataSource: 'live' | 'published' }> = ({ dataSource }) => {
  const { map, publishedData } = useApp();
  const data = dataSource === 'published' ? publishedData?.map ?? {} : map;

  // Example: allow editing in live mode
  const [zoneName, setZoneName] = useState('');
  const [owner, setOwner] = useState('');

  const addZone = () => {
    if (!zoneName.trim()) return;
    const next = { ...map, [zoneName]: owner };
    // In a real app you’d have upsertMap in store; for now just log
    console.log('Updated map:', next);
  };

  return (
    <div className="map-page">
      <h2>Alliance Map</h2>

      {/* Render snapshot or live data */}
      <table className="alliance-table">
        <thead>
          <tr>
            <th>Zone</th>
            <th>Owner</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([zone, owner]) => (
            <tr key={zone}>
              <td>{zone}</td>
              <td>{owner}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Editing controls only in live mode */}
      {dataSource === 'live' && (
        <div style={{ marginTop: '1rem' }}>
          <h3>Add / Update Zone</h3>
          <input
            placeholder="Zone name"
            value={zoneName}
            onChange={(e) => setZoneName(e.target.value)}
          />
          <input
            placeholder="Owner alliance"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
          />
          <button onClick={addZone}>Save</button>
        </div>
      )}
    </div>
  );
};

export default MapPage;
