import { useState } from "react";

type AllianceFormProps = {
  onSubmit: (name: string, shades: string[]) => void;
  existingNames?: string[]; // pass current alliance names for duplicate check
};

export default function AllianceForm({ onSubmit, existingNames = [] }: AllianceFormProps) {
  const [name, setName] = useState("");
  const [shade, setShade] = useState("#000000");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Alliance name is required.");
      return;
    }

    if (existingNames.includes(name.trim().toLowerCase())) {
      setError("An alliance with this name already exists.");
      return;
    }

    onSubmit(name.trim(), [shade]);
    setName("");
    setShade("#000000");
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="row g-3">
        <div className="col-md-6">
          <label htmlFor="allianceName" className="form-label">
            Alliance Name <span className="text-danger">*</span>
          </label>
          <input
            id="allianceName"
            type="text"
            className={`form-control ${error ? "is-invalid" : ""}`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-required="true"
            aria-describedby={error ? "nameError" : undefined}
          />
          {error && (
            <div id="nameError" className="invalid-feedback">
              {error}
            </div>
          )}
        </div>

        <div className="col-md-4">
          <label htmlFor="shadePicker" className="form-label">
            Primary Shade
          </label>
          <input
            id="shadePicker"
            type="color"
            className="form-control form-control-color"
            value={shade}
            onChange={(e) => setShade(e.target.value)}
            title="Choose alliance color"
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
