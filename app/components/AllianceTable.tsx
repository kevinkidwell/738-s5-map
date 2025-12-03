import AllianceRow from "./AllianceRow";
import type { Alliance } from "../services/alliances.server";

export default function AllianceTable({
  alliances,
  onUpdateShade,
  onDeleteAlliance,
}: {
  alliances: Alliance[];
  onUpdateShade: (id: string, shadeKey: "base" | "light" | "medium" | "dark", newColor: string) => void;
  onDeleteAlliance: (id: string) => void;
}) {
  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle rounded overflow-hidden border">
        <thead className="table-light text-uppercase small">
          <tr>
            <th>Alliance Name</th>
            <th>Base Color</th>
            <th>Light Shade</th>
            <th>Medium Shade</th>
            <th>Dark Shade</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {alliances.map((a) => (
            <AllianceRow
              key={a.id}
              alliance={a}
              onUpdateShade={onUpdateShade}
              onDelete={onDeleteAlliance}
            />
          ))}
          {alliances.length === 0 && (
            <tr>
              <td colSpan={6} className="text-muted text-center">
                No alliances yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
