export function generateAllianceShades(baseHex: string): string[] {
  const clamp = (n: number) => Math.max(0, Math.min(255, n));
  const hex = baseHex.replace("#", "");
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  const lighten = (pct: number) =>
    "#" +
    [r, g, b]
      .map((c) => clamp(Math.round(c + (255 - c) * pct)))
      .map((n) => n.toString(16).padStart(2, "0"))
      .join("");

  const darken = (pct: number) =>
    "#" +
    [r, g, b]
      .map((c) => clamp(Math.round(c * (1 - pct))))
      .map((n) => n.toString(16).padStart(2, "0"))
      .join("");

  return [
    darken(0.2),       // Stronghold First Capture
    baseHex,           // Stronghold Final Capture
    lighten(0.2),      // City First Capture
    lighten(0.35),     // City Final Capture
  ];
}
