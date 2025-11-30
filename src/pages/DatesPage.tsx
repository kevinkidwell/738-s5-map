import React, { useState } from 'react';
import { useApp } from '../store';

export default function DatesPage() {
  const { dateOptions, setDateOptions } = useApp();
  const [newDate, setNewDate] = useState('');

  return (
    <div className="sidebar">
      <h2>Date Settings</h2>
      <input
        placeholder="YYYY-MM-DD"
        value={newDate}
        onChange={(e) => setNewDate(e.target.value)}
      />
      <button onClick={() => {
        if (newDate) setDateOptions([...dateOptions, newDate]);
        setNewDate('');
      }}>Add Date</button>
      <ul>
        {dateOptions.map((d) => <li key={d}>{d}</li>)}
      </ul>
    </div>
  );
}
