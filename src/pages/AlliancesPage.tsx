import React, { useState } from 'react';
import { useApp } from '../store';

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

function getAccessibleTextColor(bgHex: string): string {
  // simplified: always white unless contrast fails
  return '#ffffff';
}

const milestoneLabels = [
  "Stronghold First Capture",
  "Stronghold Final Capture",
  "City First Capture",
  "City Final Capture"
];

function generateMilestoneShades(baseHex: string): string[] {
  return [
    adjustBrightness(baseHex, +80), // Stronghold First Capture (much lighter)
    adjustBrightness(baseHex, +40), // Stronghold Final Capture (lighter)
    baseHex,                        // City First Capture (exact user input)
    adjustBrightness(baseHex, -80)  // City Final Capture (much darker)
  ];
}

const AlliancesPage: React.FC<{ dataSource: 'live' | 'published' }> = ({ dataSource }) => {
  const { alliances, publishedData, upsertAlliance, overwriteAllianceShade } = useApp();
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

  const handleShadeClick = (allianceName: string, milestoneIndex: number, currentShade: string) => {
    const newShade = prompt(`Enter new hex for ${milestoneLabels[milestoneIndex]} (current ${currentShade})`, currentShade);
    if (newShade && /^#[0-9A-Fa-f]{6}$/.test(newShade)) {
      overwriteAllianceShade(allianceName, milestoneIndex, newShade);
    }
  };

  return (
    <div className="container py-4">
      <h1 className="h3 mb-3">Alliance Manager</h1>

      {dataSource === 'live' && (
        <form className="mb-4" onSubmit={handleSubmit}>
          <div className="row g-3 align-items-end">
            <div className="col-md-6">
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

            <div className="col-md-6">
              <label htmlFor="allianceColor" className="form-label">Base Color (HEX)</label>
              <div className="input-group">
                <span
                  className="input-group-text"
                  style={{ backgroundColor: allianceColor, color: getAccessibleTextColor(allianceColor) }}
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
            </div>
          </div>

          {livePreviewShades.length > 0 && (
            <div className="row mt-3">
              {livePreviewShades.map((shade, i) => (
                <div key={i} className="col-md-3 d-flex flex-column align-items-center">
                  <div
                    className="rounded mb-1"
                    style={{
                      width: '100%',
                      height: '40px',
                      backgroundColor: shade,
                      cursor: 'pointer'
                    }}
                  />
                  <small className="text-muted">{milestoneLabels[i]}</small>
                  <small>{shade}</small>
                </div>
              ))}
            </div>
          )}

          <div className="row mt-3">
            <div className="col-md-12">
              <button type="submit" className="btn btn-primary w-100">
                Add Alliance
              </button>
            </div>
          </div>
        </form>
      )}

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Alliance</th>
            {milestoneLabels.map(label => (
              <th key={label} scope="col">{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {allianceList.map((a) => {
            const shades = generateMilestoneShades(a.baseColor);
            return (
              <tr key={a.name}>
                <td>{a.name}</td>
                {shades.map((shade, i) => (
                  <td key={i} className="text-center">
                    <div
                      className="rounded mb-1"
                      style={{
                        width: '100%',
                        height: '40px',
                        backgroundColor: shade,
                        cursor: 'pointer'
                      }}
                      onClick={() => handleShadeClick(a.name, i, shade)}
                    />
                    <small>{shade}</small>
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AlliancesPage;
