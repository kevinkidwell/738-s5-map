import React, { useEffect, useMemo, useRef } from 'react';
import { useApp } from '../store';
import { getAllianceColor } from '../utils/color';

interface Props {
  gap: number;
  macroPad: number;
}

export const GridCanvas: React.FC<Props> = ({ gap, macroPad }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { squares, alliances, shadeRules, setSelectedId } = useApp();

  const size = useMemo(() => {
    const w = window.innerWidth;
    const h = window.innerHeight - 56; // leave some space for tabs
    return { width: w, height: h };
  }, []);

  // Precompute positions for hit detection
  const positions = useMemo(() => {
    const macroCols = 3, macroRows = 3;
    const regionBounds: { x: number; y: number; w: number; h: number }[] = [];
    const macroW = (size.width - macroPad * (macroCols + 1)) / macroCols;
    const macroH = (size.height - macroPad * (macroRows + 1)) / macroRows;

    for (let r = 0; r < macroRows; r++) {
      for (let c = 0; c < macroCols; c++) {
        const idx = r * macroCols + c;
        regionBounds[idx] = {
          x: macroPad + c * (macroW + macroPad),
          y: macroPad + r * (macroH + macroPad),
          w: macroW,
          h: macroH,
        };
      }
    }

    const pos: Record<number, { x: number; y: number; w: number; h: number }> = {};
    const byRegion: Record<number, { rows: number; cols: number }> = {};

    // Infer per-region sizes from squares list
    squares.forEach((sq) => {
      const key = sq.region;
      if (!byRegion[key]) byRegion[key] = { rows: sq.row + 1, cols: sq.col + 1 };
      else {
        byRegion[key].rows = Math.max(byRegion[key].rows, sq.row + 1);
        byRegion[key].cols = Math.max(byRegion[key].cols, sq.col + 1);
      }
    });

    squares.forEach((sq) => {
      const rb = regionBounds[sq.region];
      const inner = byRegion[sq.region];
      const cellW = (rb.w - gap * (inner.cols - 1)) / inner.cols;
      const cellH = (rb.h - gap * (inner.rows - 1)) / inner.rows;
      const x = rb.x + sq.col * (cellW + gap);
      const y = rb.y + sq.row * (cellH + gap);
      pos[sq.id] = { x, y, w: cellW, h: cellH };
    });

    return pos;
  }, [squares, size.width, size.height, gap, macroPad]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    canvas.width = size.width;
    canvas.height = size.height;
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, size.width, size.height);

    squares.forEach((sq) => {
      const p = positions[sq.id];
      const color = getAllianceColor(alliances, sq, useApp.getState().shadeRules);
      ctx.fillStyle = color;
      ctx.fillRect(p.x, p.y, p.w, p.h);
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 1;
      ctx.strokeRect(p.x, p.y, p.w, p.h);

      // Label: e.g., "GN Lv.7" style
      const label = `${sq.type === 'City' ? 'CT' : sq.type === 'Stronghold' ? 'GN' : 'TP'} Lv.${sq.level}`;
      ctx.fillStyle = '#fff';
      ctx.font = '10px system-ui';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(label, p.x + p.w / 2, p.y + p.h / 2);
    });
  }, [squares, alliances, positions, size.width, size.height]);

  const onClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    // hit test
    for (const id in positions) {
      const p = positions[Number(id)];
      if (mx >= p.x && mx <= p.x + p.w && my >= p.y && my <= p.y + p.h) {
        setSelectedId(Number(id));
        break;
      }
    }
  };

  return (
    <canvas
      ref={canvasRef}
      onClick={onClick}
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  );
};
