import { Alliance, Square } from '../types';

function hexToHsl(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      default: h = (r - g) / d + 4; break;
    }
    h *= 60;
  }
  return { h, s, l };
}

function hslToHex(h: number, s: number, l: number): string {
  s = Math.max(0, Math.min(1, s));
  l = Math.max(0, Math.min(1, l));
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;
  if (0 <= h && h < 60) { r = c; g = x; }
  else if (60 <= h && h < 120) { r = x; g = c; }
  else if (120 <= h && h < 180) { g = c; b = x; }
  else if (180 <= h && h < 240) { g = x; b = c; }
  else if (240 <= h && h < 300) { r = x; b = c; }
  else { r = c; b = x; }
  const toHex = (v: number) => Math.round((v + m) * 255).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function generateShades(baseHex: string): string[] {
  const { h, s, l } = hexToHsl(baseHex);
  return [
    hslToHex(h, s * 0.95, Math.min(0.92, l + 0.18)), // Shade 1 (lighter)
    hslToHex(h, s, l),                               // Shade 2 (base)
    hslToHex(h, s * 1.05, Math.max(0.12, l - 0.18)), // Shade 3 (darker)
  ];
}

export function getAllianceColor(
  alliances: Alliance[],
  square: Square,
  shadeRules: Record<string, { shadeIndex: 0 | 1 | 2 }>
): string {
  const allianceName = square.finalCapture ?? square.current ?? square.firstCapture;
  if (!allianceName) return '#333333';

  const alliance = alliances.find((a) => a.name === allianceName);
  if (!alliance) return '#666666';

  const shades = alliance.shades ?? generateShades(alliance.baseColor);
  const stage = square.finalCapture ? 'Final' : square.firstCapture ? 'First' : 'Current';
  const key = `${square.type}.${stage}`;
  const idx = shadeRules[key]?.shadeIndex ?? 1;
  return shades[idx];
}
