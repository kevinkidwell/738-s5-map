import type { Alliance } from "../services/alliances.server";

export default function AllianceRow({
  alliance,
  onUpdateShade,
  onDelete,
}: {
  alliance: Alliance;
  onUpdateShade: (
    id: string,
    shadeKey: "base" | "light" | "medium" | "dark",
    newColor: string
  ) => void;
  onDelete: (id: string) => void;
}) {
  const renderSwatch = (
    shade: string,
    shadeKey: "base" | "light" | "medium" | "dark",
    label: string
  ) => (
    <div className="swatch-wrapper">
      <div className="swatch-square" style={{ backgroundColor: shade }} />
      <input
        type="text"
        className="form-control form-control-sm swatch-input"
        value={shade}
        onChange={(e) => onUpdateShade(alliance.id, shadeKey, e.target.value)}
        aria-label={`${label} hex code`}
      />
    </div>
  );

  return (
    <tr>
      {/* Alliance name */}
      <td className="fw-semibold">{alliance.name}</td>

      {/* Base color */}
      <td>{renderSwatch(alliance.shades[0], "base", "Base color")}</td>

      {/* Light shade */}
      <td>{renderSwatch(alliance.shades[1], "light", "Light shade")}</td>

      {/* Medium shade */}
      <td>{renderSwatch(alliance.shades[2], "medium", "Medium shade")}</td>

      {/* Dark shade */}
      <td>{renderSwatch(alliance.shades[3], "dark", "Dark shade")}</td>

      {/* Actions */}
      <td>
        <div className="d-flex">
          <button
            className="btn btn-sm btn-outline-secondary me-2"
            title="Edit Alliance"
            aria-label={`Edit ${alliance.name}`}
          >
            <i className="bi bi-pencil"></i>
          </button>
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => onDelete(alliance.id)}
            title="Delete Alliance"
            aria-label={`Delete ${alliance.name}`}
          >
            <i className="bi bi-trash"></i>
          </button>
        </div>
      </td>
    </tr>
  );
}
