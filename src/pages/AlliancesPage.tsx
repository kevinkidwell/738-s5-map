import React from 'react';
import { useApp } from '../store';

const AlliancesPage: React.FC<{ dataSource: 'live' | 'published' }> = ({ dataSource }) => {
  const { alliances, publishedData } = useApp();
  const data = dataSource === 'published' ? publishedData?.alliances ?? [] : alliances;

  return (
    <div>
      <h2>Alliance Manager</h2>
      <table className="alliance-table">
        <thead>
          <tr>
            <th>Alliance</th>
            <th>Base Color</th>
          </tr>
        </thead>
        <tbody>
          {data.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.baseColor}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {dataSource === 'live' && <p>Edit controls go here…</p>}
    </div>
  );
};

export default AlliancesPage;
