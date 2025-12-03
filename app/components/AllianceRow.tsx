import ColorSwatch from "./ColorSwatch";
import type { Alliance } from "../services/alliances.server";

export default function AllianceRow({
  alliance,
  onUpdateShade,
  onDelete,
}: {
  alliance: Alliance;
  onUpdateShade: (id: string, shadeKey: string, newColor: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <tr>
      <td className="fw-semibold">{alliance.name}</td>
      <td>
        <ColorSwatch
          value={alliance.shades[0]}
          onChange={(color) => onUpdateShade(alliance.id, "base", color)}
        />
      </td>
      <td>
        <ColorSwatch
          value={alliance.shades[1]}
          onChange={(color) => onUpdateShade(alliance.id, "light", color)}
        />
      </td>
      <td>
        <ColorSwatch
          value={alliance.shades[2]}
          onChange={(color) => onUpdateShade(alliance.id, "medium", color)}
        />
      </td>
      <td>
        <ColorSwatch
          value={alliance.shades[3]}
          onChange={(color) => onUpdateShade(alliance.id, "dark", color)}
        />
      </td>
      <td>
        <button
          className="btn btn-sm btn-outline-danger"
          onClick={() => onDelete(alliance.id)}
          aria-label={`Delete ${alliance.name}`}
        >
          <i className="bi bi-trash"></i>
        </button>
      </td>
    </tr>
  );
}
