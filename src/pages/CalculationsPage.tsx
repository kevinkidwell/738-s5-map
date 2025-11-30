import React from 'react';
import { useApp } from '../store';

const CalculationsPage: React.FC<{ dataSource: 'live' | 'published' }> = ({ dataSource }) => {
  const { calculations, publishedData } = useApp();
  const data = dataSource === 'published' ? publishedData?.calculations ?? {} : calculations;

  return (
    <div>
      <h2>Calculations</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      {dataSource === 'live' && <p>Calculation inputs + editing controls go here…</p>}
    </div>
  );
};

export default CalculationsPage;
