// utils/color.ts
export function generateAllianceShades(baseHex: string): string[] {
  const offsets = [-20, 0, 20, 40]; // adjust lightness progression
  return offsets.map((offset) => adjustColor(baseHex, offset));
}

function adjustColor(hex: string, percent: number): string {
  let num = parseInt(hex.replace('#', ''), 16);
  let r = (num >> 16) + percent;
  let g = ((num >> 8) & 0x00ff) + percent;
  let b = (num & 0x0000ff) + percent;

  r = Math.min(255, Math.max(0, r));
  g = Math.min(255, Math.max(0, g));
  b = Math.min(255, Math.max(0, b));

  return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
}

