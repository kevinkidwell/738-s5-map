import { useState } from "react";

type Square = {
  id: string;
  color: string;
};

const GRID_SIZE = 10;

function generateGrid(): Square[][] {
  return Array.from({ length: GRID_SIZE }, (_, row) =>
    Array.from({ length: GRID_SIZE }, (_, col) => ({
      id: `${row}-${col}`,
      color: "#ffffff",
    }))
  );
}

export default function Map() {
  const [grid, setGrid] = useState<Square[][]>(generateGrid());

  const handleColorChange = (row: number, col: number, newColor: string) => {
    setGrid((prev) =>
      prev.map((r, rIdx) =>
        r.map((square, cIdx) =>
          rIdx === row && cIdx === col
            ? { ...square, color: newColor }
            : square
        )
      )
    );
  };

  return (
    <div className="container py-4">
      <h1 className="h3 mb-4">Alliance Map</h1>
      <p>This page will display the interactive grid map and square editor.</p>

      <div className="d-flex flex-column gap-2">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="d-flex gap-2">
            {row.map((square, colIndex) => (
              <div
                key={square.id}
                style={{
                  width: "30px",
                  height: "30px",
                  backgroundColor: square.color,
                  border: "1px solid #ccc",
                  cursor: "pointer",
                }}
                onClick={() =>
                  handleColorChange(rowIndex, colIndex, "#f0c040")
                }
                title={`Square ${square.id}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
