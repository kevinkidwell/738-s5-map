import React, { useState } from 'react';
import { useApp } from '../store';
import { format, addDays, differenceInDays } from 'date-fns';

type TimelineEntry = {
  date: string;
  milestone: string;
};

const SeasonTimeline: React.FC<{ dataSource: 'live' | 'published' }> = ({ dataSource }) => {
  const { dates, publishedData, upsertDate } = useApp();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [increment, setIncrement] = useState<number | ''>('');
  const [generated, setGenerated] = useState<TimelineEntry[]>([]);

  // Known milestones keyed by "week-day"
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

  // Use published snapshot if requested, otherwise live data
  const data =
    dataSource === 'published'
      ? publishedData?.dates ?? []
      : generated.length
      ? generated
      : dates;

  const generateDates = () => {
    if (!startDate || !endDate) return;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const total = differenceInDays(end, start);
    const step = increment && increment > 1 ? increment : 1;

    const result: TimelineEntry[] = [];
    for (let i = 0; i <= total; i += step) {
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
      <h2>Season Timeline</h2>

      {dataSource === 'live' && (
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <input
            type="number"
            min={1}
            value={increment}
            onChange={(e) =>
              setIncrement(e.target.value ? parseInt(e.target.value) : '')
            }
            placeholder="Optional increment (days)"
          />
          <button onClick={generateDates}>Generate</button>
        </div>
      )}

      {data.length > 0 && (
        <table className="alliance-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Week #</th>
              <th>Day #</th>
              <th>Milestone</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, i) => {
              const week = Math.floor(i / 7) + 1;
              const day = i + 1;
              const isToday = entry.date === today;
              return (
                <tr key={entry.date} className={isToday ? 'today-row' : ''}>
                  <td>{entry.date}</td>
                  <td>Week {week}</td>
                  <td>Day {day}</td>
                  <td>
                    {dataSource === 'live' ? (
                      <input
                        type="text"
                        value={entry.milestone}
                        onChange={(e) => updateMilestone(i, e.target.value)}
                        placeholder="Add milestone"
                        style={{ width: '100%' }}
                      />
                    ) : (
                      entry.milestone
                    )}
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

export default SeasonTimeline;
