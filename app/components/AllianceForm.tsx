import { useState } from "react";
import { generateAllianceShades } from "../utils/color";

export default function AllianceForm({
  onSubmit,
}: {
  onSubmit: (name: string, shades: string[]) => Promise<void>;
}) {
  const [name, setName] = useState("");
  const [baseColor, setBaseColor] = useState("#9370DB");
  const shades = generateAllianceShades(baseColor);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    await onSubmit(name.trim(), shades);
    setName("");
    setBaseColor("#9370DB");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Alliance Name</label>
          <input
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Dragon Clan"
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Base Color (Hex)</label>
          <input
            className="form-control"
            value={baseColor}
            onChange={(e) => setBaseColor(e.target.value)}
            placeholder="#9370DB"
          />
        </div>
      </div>

      <div className="row mt-3">
        {shades.map((shade, i) => (
          <div key={i} className="col-md-3 d-flex flex-column align-items-center">
            <small className="text-muted mb-1">
              {["Stronghold First", "Stronghold Final", "City First", "City Final"][i]}
            </small>
            <div
              className="rounded mb-1"
              style={{ width: "100%", height: 40, backgroundColor: shade }}
            />
            <small className="text-muted">{shade}</small>
          </div>
        ))}
      </div>

      <button type="submit" className="btn btn-primary mt-3 w-100">
        Add Alliance
      </button>
    </form>
  );
}
