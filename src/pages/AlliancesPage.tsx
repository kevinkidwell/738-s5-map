import React, { useState } from 'react';
import { useApp } from '../store';
import { generateShades } from '../utils/color';

const AlliancesPage: React.FC<{ dataSource: 'live' | 'published' }> = ({ dataSource }) => {
  const { alliances, publishedData, upsertAlliance } = useApp();
  const data = dataSource === 'published' ? publishedData?.alliances ?? [] : alliances;

  const [newName, setNewName] = useState('');
  const [newHex, setNewHex] = useState('#4a90e2');

  const addAlliance = () => {
    if (!newName.trim() || !newHex.startsWith('#')) return;
    upsertAlliance({
      name: newName.trim(),
      baseColor: newHex,
      shades: generateShades(newHex),
    });
    setNewName('');
    setNewHex('#4a90e2');
  };

  return (
    <div className="alliance-table-wrapper">
      <h2>Alliance Colors</h2>
      <table className="alliance-table">
        <thead>
          <tr>
            <th>Alliance</th>
            <th>Dig Site</th>
            <th>City (First)</th>
            <th>City (Final)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((a) => {
            const shades = a.shades ?? generateShades(a.baseColor);
            return (
              <tr key={a.name}>
                <td>{a.name}</td>
                {shades.slice(0, 3).map((color, i) => (
                  <td key={i}>
                    <div className="swatch" style={{ backgroundColor: color }} />
                    <div>{color}</div>
                  </td>
                ))}
              </tr>
            );
          })}
          {dataSource === 'live' && (
            <tr>
              <td colSpan={4}>
                <input
                  placeholder="Alliance name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
                <input
                  type="color"
                  value={newHex}
                  onChange={(e) => setNewHex(e.target.value)}
                />
                <button onClick={addAlliance}>Add Alliance</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AlliancesPage;
