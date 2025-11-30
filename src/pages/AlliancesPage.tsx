import React, { useState } from 'react';
import { useApp } from '../store';

// Utility: adjust brightness of a hex color
function adjustBrightness(hex: string, amount: number): string {
  let useHex = hex.replace('#', '');
  if (useHex.length === 3) {
    useHex = useHex.split('').map(c => c + c).join('');
  }
  const num = parseInt(useHex, 16);
  let r = (num >> 16) + amount;
  let g = ((num >> 8) & 0x00FF) + amount;
  let b = (num & 0x0000FF) + amount;
  r = Math.min(255, Math.max(0, r));
  g = Math.min(255, Math.max(0, g));
  b = Math.min(255, Math.max(0, b));
  return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
}

// Utility: pick black or white text depending on background brightness
function getContrastColor(hex: string): string {
  let useHex = hex.replace('#', '');
  if (useHex.length === 3) {
    useHex = useHex.split('').map(c => c + c).join('');
  }
  const num = parseInt(useHex, 16);
  const r = num >> 16;
  const g = (num >> 8) & 0x00FF;
  const b = num & 0x0000FF;
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b);
  return luminance > 186 ? '#000' : '#fff';
}

// Define milestone labels
const milestoneLabels = [
  "Stronghold First Capture",
  "Stronghold Final Capture",
  "City First Capture",
  "City Final Capture"
];

// Generate exactly four shades for the milestones
function generateMilestoneShades(baseHex: string): string[] {
  // Tune offsets to your design intent: darker for "First", lighter for "Final"
  const offsets = [-40, -10, +20, +50];
  return offsets.map(amount => adjustBrightness(baseHex, amount));
}

const AlliancesPage: React.FC<{ dataSource: 'live' | 'published' }> = ({ dataSource }) => {
  const { alliances, publishedData, upsertAlliance } = useApp();
  const allianceList = dataSource === 'live' ? alliances : publishedData?.alliances || [];

  const [allianceName, setAllianceName] = useState('');
  const [allianceColor, setAllianceColor] = useState('#000000');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^#[0-9A-Fa-f]{6}$/.test(allianceColor)) {
      alert('Please enter a valid hex code (e.g. #FF5733)');
      return;
    }
    upsertAlliance({ name: allianceName, baseColor: allianceColor });
    setAllianceName('');
    setAllianceColor('#000000');
  };

  const livePreviewShades =
    /^#[0-9A-Fa-f]{6}$/.test(allianceColor) ? generateMilestoneShades(allianceColor) : [];

  return (
    <div className="container py-4">
      <h1 className="h3 mb-3">Alliance Manager</h1>

      {dataSource === 'live' && (
        <form className="row g-3 align-items-end mb-4" onSubmit={handleSubmit}>
          <div className="col-md-4">
            <label htmlFor="allianceName" className="form-label">Alliance Name</label>
            <input
              id="allianceName"
              type="text"
              className="form-control"
              value={allianceName}
              onChange={(e) => setAllianceName(e.target.value)}
              required
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="allianceColor" className="form-label">Base Color (HEX)</label>
            <div className="input-group">
              <span
                className="input-group-text"
                style={{ backgroundColor: allianceColor, color: getContrastColor(allianceColor) }}
              >
                {allianceColor}
              </span>
              <input
                id="allianceColor"
                type="text"
                className="form-control"
                placeholder="#RRGGBB"
                value={allianceColor}
                onChange={(e) => setAllianceColor(e.target.value)}
                required
              />
            </div>
            <small className="form-text text-muted">
              Enter a valid hex code (e.g. #FF5733).
            </small>

            {/* Live preview with milestone labels */}
            {livePreviewShades.length > 0 && (
              <div className="d-flex gap-3 flex-wrap mt-2">
                {livePreviewShades.map((shade, i) => (
                  <div key={i} className="d-flex flex-column align-items-center">
                    <span
                      className="badge"
                      style={{
                        backgroundColor: shade,
                        color: getContrastColor(shade),
                        padding: '0.5rem 1rem',
                      }}
                    >
                      {shade}
                    </span>
                    <small className="text-muted">{milestoneLabels[i]}</small>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="col-md-4">
            <button type="submit" className="btn btn-primary w-100">
              Add Alliance
            </button>
          </div>
        </form>
      )}

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Alliance</th>
            <th scope="col">Milestone Colors</th>
          </tr>
        </thead>
        <tbody>
          {allianceList.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>
                <div className="d-flex gap-3 flex-wrap">
                  {generateMilestoneShades(a.baseColor).map((shade, i) => (
                    <div key={i} className="d-flex flex-column align-items-center">
                      <span
                        className="badge"
                        style={{
                          backgroundColor: shade,
                          color: getContrastColor(shade),
                          padding: '0.5rem 1rem',
                        }}
                      >
                        {shade}
                      </span>
                      <small className="text-muted">{milestoneLabels[i]}</small>
                    </div>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AlliancesPage;
