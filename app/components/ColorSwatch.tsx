import { useState } from "react";

function getContrastColor(hex: string): string {
  const c = hex.substring(1);
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
}: {
  value: string;
  onChange: (newColor: string) => void;
}) {
  const [color, setColor] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setColor(newColor);
    onChange(newColor);
  };

  return (
    <div className="d-flex align-items-center gap-2">
      <span
        className="badge"
        style={{
          backgroundColor: color,
          color: getContrastColor(color),
          minWidth: "80px",
        }}
      >
        {color}
      </span>
      <input
        type="color"
        className="form-control form-control-color"
        value={color}
        onChange={handleChange}
        title="Edit shade"
        aria-label={`Edit color ${color}`}
      />
    </div>
  );
}
