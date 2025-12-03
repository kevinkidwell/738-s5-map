import { useState } from "react";

type AllianceFormProps = {
  onSubmit: (name: string, shades: string[]) => void;
  readOnly?: boolean;
};

export default function AllianceForm({ onSubmit, readOnly }: AllianceFormProps) {
  const [name, setName] = useState("");
  const [shade, setShade] = useState("#000000");

  if (readOnly) {
    return null; // hide form in public view
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit(name, [shade]);
    setName("");
    setShade("#000000");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="mb-2">
        <label className="form-label">Alliance Name</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-2">
        <label className="form-label">Shade</label>
        <input
          type="color"
          className="form-control form-control-color"
          value={shade}
          onChange={(e) => setShade(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Add Alliance
      </button>
    </form>
  );
}
