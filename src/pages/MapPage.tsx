import React from 'react';
import { useApp } from '../store';

const MapPage: React.FC<{ dataSource: 'live' | 'published' }> = ({ dataSource }) => {
  const { map, publishedData } = useApp();
  const data = dataSource === 'published' ? publishedData?.map ?? {} : map;

  return (
    <div>
      <h2>Alliance Map</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      {dataSource === 'live' && <p>Map editing controls go here…</p>}
    </div>
  );
};

export default MapPage;
