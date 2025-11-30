import React from 'react';
import { useApp } from '../store';
import { SquareType } from '../types';

export const SquareEditor: React.FC = () => {
  const { selectedId, squares, updateSquare, alliances, dateOptions } = useApp();
  if (selectedId === null) return null;
  const square = squares.find((s) => s.id === selectedId);
  if (!square) return null;

  const allianceNames = alliances.map((a) => a.name);
  const set = (patch: Partial<typeof square>) => updateSquare(square.id, patch);

  return (
    <div className="panel">
      <h3>Square #{square.id}</h3>
      <div style={{ display: 'grid', gap: 8 }}>
        <label>
          Type
          <select
            value={square.type}
            onChange={(e) => set({ type: e.target.value as SquareType })}
          >
            <option>City</option>
            <option>Stronghold</option>
            <option>Trade Post</option>
          </select>
        </label>
        <label>
          Level
          <input
            type="number"
            min={1}
            max={10}
            value={square.level}
            onChange={(e) => set({ level: Number(e.target.value) })}
          />
        </label>
        <label>
          Current
          <select
            value={square.current ?? ''}
            onChange={(e) => set({ current: e.target.value || undefined })}
          >
            <option value="">—</option>
            {allianceNames.map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>
        </label>
        <label>
          First Capture
          <select
            value={square.firstCapture ?? ''}
            onChange={(e) => set({ firstCapture: e.target.value || undefined })}
          >
            <option value="">—</option>
            {allianceNames.map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>
        </label>
        <label>
          First Capture Date
          <select
            value={square.firstCaptureDate ?? ''}
            onChange={(e) => set({ firstCaptureDate: e.target.value || undefined })}
          >
            <option value="">—</option>
            {dateOptions.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </label>
        <label>
          Drop Date
          <select
            value={square.dropDate ?? ''}
            onChange={(e) => set({ dropDate: e.target.value || undefined })}
          >
            <option value="">—</option>
            {dateOptions.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </label>
        <label>
          Final Capture
          <select
            value={square.finalCapture ?? ''}
            onChange={(e) => set({ finalCapture: e.target.value || undefined })}
          >
            <option value="">—</option>
            {allianceNames.map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
};
