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

// Utility: calculate relative luminance
function luminance(r: number, g: number, b: number): number {
  const a = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

// Utility: contrast ratio between two colors
function contrastRatio(hex1: string, hex2: string): number {
  function hexToRgb(hex: string) {
    let useHex = hex.replace('#', '');
    if (useHex.length === 3) {
      useHex = useHex.split('').map(c => c + c).join('');
    }
    const num = parseInt(useHex, 16);
    return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
  }
  const [r1, g1, b1] = hexToRgb(hex1);
  const [r2, g2, b2] = hexToRgb(hex2);
  const L1 = luminance(r1, g1, b1);
  const L2 = luminance(r2, g2, b2);
  return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
}

// Utility: pick text color that meets WCAG 2.1 AA
function getAccessibleTextColor(bgHex: string): string {
  const whiteContrast = contrastRatio(bgHex, '#ffffff');
  const blackContrast = contrastRatio(bgHex, '#000000');
  if (whiteContrast >= 4.5 && whiteContrast >= blackContrast) return '#fff';
  if (blackContrast >= 4.5) return '#000';
  return whiteContrast > blackContrast ? '#fff' : '#000';
}

// Milestone labels
const milestoneLabels = [
  "Stronghold First Capture",
  "Stronghold Final Capture",
  "City First Capture",
  "City Final Capture"
];

// Generate four shades with base color used for City First Capture
function generateMilestoneShades(baseHex: string): string[] {
  return [
    adjustBrightness(baseHex, +40), // Stronghold First Capture (lighter)
    adjustBrightness(baseHex, -20), // Stronghold Final Capture (slightly darker)
    baseHex,                        // City First Capture (exact user input)
    adjustBrightness(baseHex, -60)  // City Final Capture (darkest)
  ];
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
                        color: getAccessibleTextColor(shade),
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
                          color: getAccessibleTextColor(shade),
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
