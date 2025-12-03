import ColorSwatch from "./ColorSwatch";
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
  return (
    <tr>
      {/* Alliance name */}
      <td className="fw-semibold">{alliance.name}</td>

      {/* Base color */}
      <td>
        <ColorSwatch
          value={alliance.shades[0]}
          onChange={(color) => onUpdateShade(alliance.id, "base", color)}
          label="Base color"
        />
      </td>

      {/* Light shade */}
      <td>
        <ColorSwatch
          value={alliance.shades[1]}
          onChange={(color) => onUpdateShade(alliance.id, "light", color)}
          label="Light shade"
        />
      </td>

      {/* Medium shade */}
      <td>
        <ColorSwatch
          value={alliance.shades[2]}
          onChange={(color) => onUpdateShade(alliance.id, "medium", color)}
          label="Medium shade"
        />
      </td>

      {/* Dark shade */}
      <td>
        <ColorSwatch
          value={alliance.shades[3]}
          onChange={(color) => onUpdateShade(alliance.id, "dark", color)}
          label="Dark shade"
        />
      </td>

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
