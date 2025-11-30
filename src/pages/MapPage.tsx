import React, { useEffect } from 'react';
import { useApp } from '../store';
import { buildSquares } from '../utils/layout';
import { GridCanvas } from '../components/GridCanvas';
import { SquareEditor } from '../components/SquareEditor';

export default function MapPage() {
  const { setSquares } = useApp();
  useEffect(() => {
    setSquares(buildSquares());
  }, [setSquares]);

  return (
    <div className="map-container">
      <GridCanvas gap={2} macroPad={24} />
      <SquareEditor />
    </div>
  );
}
