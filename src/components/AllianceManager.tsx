import React, { useState } from 'react';
import { useApp } from '../store';
import { generateShades } from '../utils/color';

export const AllianceManager: React.FC = () => {
  const { alliances, upsertAlliance, shadeRules, setShadeRule } = useApp();
  const [name, setName] = useState('');
  const [color, setColor] = useState('#4a90e2');

  const add = () => {
    if (!name.trim()) return;
    upsertAlliance({ name, baseColor: color, shades: generateShades(color) });
    setName('');
  };

  const keys = Object.keys(shadeRules);

  return (
    <div>
      <h3>Alliances</h3>
      <div style={{ display: 'grid', gap: 8 }}>
        <input
          placeholder="Alliance name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        <button onClick={add}>Add / Update</button>
      </div>
      <ul>
        {alliances.map((a) => (
          <li key={a.name}>
            <span style={{ color: a.baseColor }}>{a.name}</span> — {a.baseColor}
          </li>
        ))}
      </ul>
      <h4>Shade assignments</h4>
      {keys.map((k) => (
        <div key={k} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ width: 160 }}>{k}</span>
          <select
            value={useApp.getState().shadeRules[k].shadeIndex}
            onChange={(e) => setShadeRule(k, Number(e.target.value) as 0 | 1 | 2)}
          >
            <option value={0}>Shade 1 (lighter)</option>
            <option value={1}>Shade 2 (base)</option>
            <option value={2}>Shade 3 (darker)</option>
          </select>
        </div>
      ))}
    </div>
  );
};
