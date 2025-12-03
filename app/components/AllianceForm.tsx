// app/components/AllianceForm.tsx
import { useState } from "react";

export default function AllianceForm({
  onSubmit,
}: {
  onSubmit: (name: string, shades: string[]) => void;
}) {
  const [name, setName] = useState("");
  const [shade, setShade] = useState("#000000");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit(name, [shade]);
    setName("");
    setShade("#000000");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Alliance Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Primary Shade</label>
          <input
            type="color"
            className="form-control form-control-color"
            value={shade}
            onChange={(e) => setShade(e.target.value)}
            title="Choose color"
          />
        </div>
        <div className="col-md-2 d-flex align-items-end">
          <button type="submit" className="btn btn-primary w-100">
            Add Alliance
          </button>
        </div>
      </div>
    </form>
  );
}
