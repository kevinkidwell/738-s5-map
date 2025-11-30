import React, { useState } from 'react';
import { useApp } from '../store';
import { generateShades } from '../utils/color';

export const AllianceManager: React.FC = () => {
  const { alliances, upsertAlliance } = useApp();
  const [editing, setEditing] = useState<{ name: string; index: number } | null>(null);
  const [hexInput, setHexInput] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState('');
  const [newHex, setNewHex] = useState('#4a90e2');

  const handleEdit = (name: string, index: number, currentHex: string) => {
    setEditing({ name, index });
    setHexInput(currentHex);
  };

  const applyEdit = () => {
    if (!editing) return;
    const { name, index } = editing;
    const alliance = alliances.find((a) => a.name === name);
    if (!alliance) return;
    const nextShades = [...(alliance.shades ?? generateShades(alliance.baseColor))];
    nextShades[index] = hexInput;
    upsertAlliance({ ...alliance, shades: nextShades });
    setEditing(null);
  };

  const addAlliance = () => {
    if (!newName.trim() || !newHex.startsWith('#')) return;
    upsertAlliance({
      name: newName.trim(),
      baseColor: newHex,
      shades: generateShades(newHex),
    });
    setNewName('');
    setNewHex('#4a90e2');
    setShowAdd(false);
  };

  return (
    <div>
      <h2>Alliance Colors</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '0.75rem 0.5rem' }}>Alliance</th>
            <th>Dig Site (First)</th>
            <th>City (First)</th>
            <th>City (Final)</th>
          </tr>
        </thead>
        <tbody>
          {alliances.map((a) => {
            const shades = a.shades ?? generateShades(a.baseColor);
            return (
              <tr key={a.name}>
                <td style={{ padding: '1rem 0.5rem', fontSize: '1rem' }}>{a.name}</td>
                {[0, 1, 2].map((i) => (
                  <td key={i} style={{ textAlign: 'center', padding: '1rem 0.5rem' }}>
                    {editing?.name === a.name && editing.index === i ? (
                      <div>
                        <input
                          value={hexInput}
                          onChange={(e) => setHexInput(e.target.value)}
                          style={{ width: '6rem', fontSize: '0.875rem' }}
                        />
                        <button onClick={applyEdit} style={{ marginLeft: '0.5rem' }}>Save</button>
                      </div>
                    ) : (
                      <div onClick={() => handleEdit(a.name, i, shades[i])} style={{ cursor: 'pointer' }}>
                        <div style={{
                          width: '3rem',
                          height: '3rem',
                          backgroundColor: shades[i],
                          borderRadius: '0.5rem',
                          border: '1px solid #444',
                          margin: '0 auto',
                        }} />
                        <div style={{
                          fontSize: '0.75rem',
                          marginTop: '0.5rem',
                          lineHeight: '1.2',
                        }}>
                          {["Dig Site", "City", "City"][i]}<br />({["First", "First", "Final"][i]})
                        </div>
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            );
          })}
          <tr>
            <td colSpan={4} style={{ textAlign: 'center', padding: '1rem' }}>
              <button onClick={() => setShowAdd(!showAdd)}>➕ Add Alliance</button>
            </td>
          </tr>
        </tbody>
      </table>

      {showAdd && (
        <div style={{ marginTop: '1rem', padding: '1rem', borderTop: '1px solid #444' }}>
          <h3>Add New Alliance</h3>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <input
              placeholder="Alliance name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              style={{ flex: 1 }}
            />
            <input
              type="color"
              value={newHex}
              onChange={(e) => setNewHex(e.target.value)}
            />
            <button onClick={addAlliance}>Add</button>
          </div>
        </div>
      )}
    </div>
  );
};
