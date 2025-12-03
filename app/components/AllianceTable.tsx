import { useState } from "react";
import { Modal } from "bootstrap";

type Alliance = { id: string; name: string; shades: string[] };

function getContrastColor(hex: string): string {
  const c = hex.substring(1);
  const rgb = parseInt(c, 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = rgb & 0xff;
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#000000" : "#ffffff";
}

export default function AllianceTable({
  alliances,
  onEditShade,
  readOnly = false,
}: {
  alliances: Alliance[];
  onEditShade: (id: string, index: number, newColor: string) => void;
  readOnly?: boolean;
}) {
  const [selectedAlliance, setSelectedAlliance] = useState<Alliance | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [newColor, setNewColor] = useState<string>("#000000");
  const [error, setError] = useState<string | null>(null);

  const openModal = (alliance: Alliance, index: number, shade: string) => {
    setSelectedAlliance(alliance);
    setSelectedIndex(index);
    setNewColor(shade);
    setError(null);
    const modalEl = document.getElementById("shadeModal");
    if (modalEl) {
      const bsModal = new Modal(modalEl);
      bsModal.show();
    }
  };

  const saveColor = () => {
    if (!newColor || !/^#[0-9A-Fa-f]{6}$/.test(newColor)) {
      setError("Please select a valid hex color.");
      return;
    }
    if (selectedAlliance && selectedIndex !== null) {
      onEditShade(selectedAlliance.id, selectedIndex, newColor);
    }
    const modalEl = document.getElementById("shadeModal");
    if (modalEl) {
      const bsModal = Modal.getInstance(modalEl);
      bsModal?.hide();
    }
  };

  return (
    <>
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Shades</th>
            </tr>
          </thead>
          <tbody>
            {alliances.map((a) => (
              <tr key={a.id}>
                <td className="fw-semibold">{a.name}</td>
                <td>
                  {a.shades.map((shade, idx) => (
                    <span
                      key={idx}
                      className="badge me-1"
                      style={{
                        backgroundColor: shade,
                        color: getContrastColor(shade),
                        cursor: readOnly ? "default" : "pointer",
                      }}
                      role="button"
                      aria-label={`Shade ${shade}`}
                      onClick={() => !readOnly && openModal(a, idx, shade)}
                    >
                      {shade}
                    </span>
                  ))}
                </td>
              </tr>
            ))}
            {alliances.length === 0 && (
              <tr>
                <td colSpan={2} className="text-muted">
                  No alliances yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Bootstrap Modal */}
      <div
        className="modal fade"
        id="shadeModal"
        tabIndex={-1}
        aria-labelledby="shadeModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="shadeModalLabel">
                Edit Shade
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <label htmlFor="colorPicker" className="form-label">
                Choose a new color <span className="text-danger">*</span>
              </label>
              <input
                id="colorPicker"
                type="color"
                className={`form-control form-control-color ${error ? "is-invalid" : ""}`}
                value={newColor}
                onChange={(e) => setNewColor(e.target.value)}
                aria-required="true"
                aria-describedby={error ? "colorError" : undefined}
                title="Select alliance shade"
              />
              {error && (
                <div id="colorError" className="invalid-feedback">
                  {error}
                </div>
              )}
              <div
                className="mt-3 p-3 border rounded"
                style={{
                  backgroundColor: newColor,
                  color: getContrastColor(newColor),
                }}
              >
                Preview: {newColor}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button type="button" className="btn btn-primary" onClick={saveColor}>
                Save Shade
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
