import React from 'react';
import { useApp } from '../store';

const SeasonTimeline: React.FC<{ dataSource: 'live' | 'published' }> = ({ dataSource }) => {
  const { dates, publishedData } = useApp();
  const data = dataSource === 'published' ? publishedData?.dates ?? [] : dates;

  return (
    <div>
      <h2>Season Timeline</h2>
      <table className="alliance-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Milestone</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d.date}>
              <td>{d.date}</td>
              <td>{d.milestone}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {dataSource === 'live' && <p>Date generation + editing controls go here…</p>}
    </div>
  );
};

export default SeasonTimeline;
