import { Square } from '../types';

/**
 * Define per-region inner grid sizes to total ~1989 squares.
 * Adjust rows/cols to match your exact map.
 */
export const regionsLayout: { rows: number; cols: number }[] = [
  { rows: 16, cols: 16 }, // 256
  { rows: 16, cols: 16 }, // 256
  { rows: 16, cols: 16 }, // 256
  { rows: 16, cols: 16 }, // 256
  { rows: 17, cols: 17 }, // 289 (center darker in your image)
  { rows: 16, cols: 16 }, // 256
  { rows: 16, cols: 16 }, // 256
  { rows: 16, cols: 16 }, // 256
  { rows: 16, cols: 16 }, // 256
]; // Sum: 256*8 + 289 = 234 + 1989? Actually 256*8=2048; 2048+289=2337 (too many). Adjust below.

export function buildSquares(): Square[] {
  // Adjust the layout to hit 1989 total. Example:
  const layout = [
    { rows: 13, cols: 13 }, // 169
    { rows: 13, cols: 13 }, // 169
    { rows: 13, cols: 13 }, // 169
    { rows: 13, cols: 13 }, // 169
    { rows: 17, cols: 17 }, // 289 (center)
    { rows: 13, cols: 13 }, // 169
    { rows: 13, cols: 13 }, // 169
    { rows: 13, cols: 13 }, // 169
    { rows: 13, cols: 13 }, // 169
  ]; // Sum: 169*8 + 289 = 164 + 1989? 169*8=1352; 1352+289=1641 (too few). We'll refine:

  const layoutRefined = [
    { rows: 15, cols: 15 }, // 225
    { rows: 15, cols: 15 }, // 225
    { rows: 15, cols: 15 }, // 225
    { rows: 15, cols: 15 }, // 225
    { rows: 21, cols: 21 }, // 441 (center)
    { rows: 15, cols: 15 }, // 225
    { rows: 15, cols: 15 }, // 225
    { rows: 15, cols: 15 }, // 225
    { rows: 15, cols: 15 }, // 225
  ]; // Sum: 225*8 + 441 = 225*8=1800; 1800+441=2241 (too many).

  // Final layout that sums to 1989; update when you share exact numbers.
  const layout1989 = [
    { rows: 14, cols: 14 }, // 196
    { rows: 14, cols: 14 }, // 196
    { rows: 14, cols: 14 }, // 196
    { rows: 14, cols: 14 }, // 196
    { rows: 17, cols: 17 }, // 289
    { rows: 14, cols: 14 }, // 196
    { rows: 14, cols: 14 }, // 196
    { rows: 14, cols: 14 }, // 196
    { rows: 14, cols: 14 }, // 196
  ]; // Sum: 196*8 + 289 = 1568 + 289 = 1857 (still short)

  // For now, we’ll programmatically cap to 1989 and leave layout configurable:
  const regions = [
    { rows: 16, cols: 16 }, // 256
    { rows: 16, cols: 16 }, // 256
    { rows: 16, cols: 16 }, // 256
    { rows: 16, cols: 16 }, // 256
    { rows: 19, cols: 19 }, // 361
    { rows: 16, cols: 16 }, // 256
    { rows: 16, cols: 16 }, // 256
    { rows: 16, cols: 16 }, // 256
    { rows: 16, cols: 16 }, // 256
  ]; // Sum: 256*8 + 361 = 2048 + 361 = 2409 (we'll slice to 1989)

  const squares: Square[] = [];
  let id = 0;
  regions.forEach((rc, region) => {
    for (let r = 0; r < rc.rows; r++) {
      for (let c = 0; c < rc.cols; c++) {
        squares.push({
          id: id++,
          region,
          row: r,
          col: c,
          type: 'Stronghold',
          level: 1,
        });
      }
    }
  });

  // Mark some intersections as City (placeholder: every Nth cell at grid crossings)
  squares.forEach((sq) => {
    const isIntersection = (sq.row % 4 === 0) && (sq.col % 4 === 0);
    if (isIntersection) sq.type = 'City';
  });

  return squares.slice(0, 1989); // enforce total for now
}
