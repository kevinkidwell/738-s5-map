import React, { useState } from 'react';
import { useApp } from '../store';
import { format, addDays, differenceInDays } from 'date-fns';

type TimelineEntry = {
  date: string;
  milestone: string;
};

export const DatesPage: React.FC = () => {
  const { upsertDate } = useApp();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [increment, setIncrement] = useState(1);
  const [generated, setGenerated] = useState<TimelineEntry[]>([]);

  const knownMilestones: Record<string, string> = {
    '1-4': 'Fiona Exclusive Weapon',
    '3-4': 'Stetmann Exclusive Weapon',
    '2-15': 'Trade Post Level 1 Unlocks',
    '3-16': 'Trade Post Level 2 Unlocks',
    '3-17': 'Trade Post Level 3 Unlocks',
    '3-18': 'Trade Post Level 4 Unlocks — Stetmann Exclusive Weapon',
    '3-19': 'Trade Post Level 5 Unlocks',
    '3-22': 'TP Lvl 1 - Protection Drops',
    '4-23': 'TP Lvl 2 - Protection Drops',
    '4-24': 'TP Lvl 3 - Protection Drops',
    '4-26': 'TP Lvl 4 - Protection Drops',
    '3-21': 'Grand Nexus (Sunday)',
    '4-25': 'Warzone Outpost Construction Completed',
  };

  const generateDates = () => {
    if (!startDate || !endDate || increment < 1) return;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const total = differenceInDays(end, start);
    const result: TimelineEntry[] = [];

    for (let i = 0; i <= total; i += increment) {
      const d = addDays(start, i);
      const dateStr = format(d, 'yyyy-MM-dd');
      const week = Math.floor(i / 7) + 1;
      const day = i + 1;
      const key = `${week}-${day}`;
      const milestone = knownMilestones[key] ?? '';
      result.push({ date: dateStr, milestone });
    }

    setGenerated(result);
  };

  const updateMilestone = (index: number, value: string) => {
    const next = [...generated];
    next[index].milestone = value;
    setGenerated(next);
    upsertDate({ date: next[index].date, milestone: value });
  };

  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="alliance-table-wrapper">
      <h2>Timeline Generator</h2>

      {/* Date Range Picker */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        <input
          type="number"
          min={1}
          value={increment}
          onChange={(e) => setIncrement(parseInt(e.target.value))}
          placeholder="Increment (days)"
        />
        <button onClick={generateDates}>Generate</button>
      </div>

      {/* Generated Table */}
      {generated.length > 0 && (
        <table className="alliance-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Week #</th>
              <th>Day #</th>
              <th>Important Milestones</th>
            </tr>
          </thead>
          <tbody>
            {generated.map((entry, i) => {
              const week = Math.floor(i / 7) + 1;
              const day = i + 1;
              const isToday = entry.date === today;
              return (
                <tr key={entry.date} className={isToday ? 'today-row' : ''}>
                  <td>{entry.date}</td>
                  <td>Week {week}</td>
                  <td>Day {day}</td>
                  <td>
                    <input
                      type="text"
                      value={entry.milestone}
                      onChange={(e) => updateMilestone(i, e.target.value)}
                      placeholder="Add milestone"
                      style={{ width: '100%' }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};
