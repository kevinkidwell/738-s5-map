import { useEffect, useState } from "react";

function getContrastColor(hex: string): string {
  const c = hex.replace("#", "");
  const rgb = parseInt(c, 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = rgb & 0xff;
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#000000" : "#ffffff";
}

export default function ColorSwatch({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (newColor: string) => void;
  label: string;
}) {
  const [color, setColor] = useState(value);

  useEffect(() => {
    setColor(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setColor(newColor);
    onChange(newColor);
  };

  return (
    <div className="d-flex align-items-center gap-2 py-2">
      {/* Hex swatch badge */}
      <span
        className="badge"
        style={{
          backgroundColor: color,
          color: getContrastColor(color),
          minWidth: "96px",
          textAlign: "center",
          fontWeight: 500,
          borderRadius: "6px",
        }}
        aria-label={`${label} ${color}`}
      >
        {color}
      </span>

      {/* Inline color picker */}
      <input
        type="color"
        className="form-control form-control-color"
        value={color}
        onChange={handleChange}
        title={`Edit ${label}`}
        aria-label={`Edit ${label}`}
        style={{ height: "32px", width: "40px", padding: 0 }}
      />
    </div>
  );
}
