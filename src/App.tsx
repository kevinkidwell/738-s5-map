import React, { useEffect, useState } from 'react';
import './styles.css';
import { useApp } from './store';
import { buildSquares } from './utils/layout';
import { GridCanvas } from './components/GridCanvas';
import { BottomTabs } from './components/BottomTabs';
import { AllianceManager } from './components/AllianceManager';
import { SquareEditor } from './components/SquareEditor';

export default function App() {
  const { setSquares } = useApp();
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    setSquares(buildSquares());
  }, [setSquares]);

  return (
    <div className="app">
      <div className="map-container">
        <GridCanvas gap={2} macroPad={24} />
        <SquareEditor />
        {activeTab === 1 && (
          <div className="panel" style={{ left: 16, right: 'auto' }}>
            <AllianceManager />
          </div>
        )}
        {activeTab === 2 && (
          <div className="panel" style={{ left: 16, right: 'auto' }}>
            <DateSettings />
          </div>
        )}
      </div>
      <BottomTabs active={activeTab} onChange={setActiveTab} />
    </div>
  );
}

const DateSettings: React.FC = () => {
  const { dateOptions, setDateOptions } = useApp();
  const [newDate, setNewDate] = useState('');
  return (
    <div>
      <h3>Date Settings</h3>
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          placeholder="YYYY-MM-DD"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
        />
        <button
          onClick={() => {
            if (newDate) setDateOptions([...dateOptions, newDate]);
            setNewDate('');
          }}
        >
          Add Date
        </button>
      </div>
      <ul>
        {dateOptions.map((d) => (
          <li key={d}>{d}</li>
        ))}
      </ul>
    </div>
  );
};
