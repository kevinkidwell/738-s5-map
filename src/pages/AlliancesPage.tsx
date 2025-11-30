import React, { useState } from 'react';
import { useApp } from '../store';

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
                style={{ backgroundColor: allianceColor, color: '#fff' }}
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
            <th scope="col">Base Color</th>
          </tr>
        </thead>
        <tbody>
          {allianceList.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>
                <span
                  className="badge"
                  style={{
                    backgroundColor: a.baseColor,
                    color: '#fff',
                    padding: '0.5rem 1rem',
                  }}
                >
                  {a.baseColor}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AlliancesPage;
