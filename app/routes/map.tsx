// app/routes/map.tsx
import { useState } from "react";

type Square = { id: string; color: string };
const GRID_SIZE = 10;

function generateGrid(): Square[][] {
  return Array.from({ length: GRID_SIZE }, (_, r) =>
    Array.from({ length: GRID_SIZE }, (_, c) => ({
      id: `${r}-${c}`,
      color: "#ffffff",
    }))
  );
}

export default function Map({ readOnly = false }: { readOnly?: boolean }) {
  const [grid, setGrid] = useState<Square[][]>(generateGrid());

  const handleColorChange = (row: number, col: number, newColor: string) => {
    setGrid((prev) =>
      prev.map((r, rIdx) =>
        r.map((sq, cIdx) =>
          rIdx === row && cIdx === col ? { ...sq, color: newColor } : sq
        )
      )
    );
  };

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h1 className="h3 m-0">Alliance Map</h1>
        <span className={`badge ${readOnly ? "bg-secondary" : "bg-success"}`}>
          {readOnly ? "Read-Only" : "Editing Enabled"}
        </span>
      </div>

      <div className="d-flex flex-column gap-1">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="d-flex gap-1">
            {row.map((square, colIndex) => (
              <div
                key={square.id}
                style={{
                  width: "30px",
                  height: "30px",
                  backgroundColor: square.color,
                  border: "1px solid #ced4da",
                  cursor: readOnly ? "default" : "pointer",
                }}
                onClick={() => {
                  if (!readOnly) handleColorChange(rowIndex, colIndex, "#f0c040");
                }}
                title={`Square ${square.id}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
