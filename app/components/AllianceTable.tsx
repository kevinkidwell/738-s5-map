import AllianceRow from "./AllianceRow";
import type { Alliance } from "../services/alliances.server";

export default function AllianceTable({
  alliances,
  onUpdateShade,
  onDeleteAlliance,
}: {
  alliances: Alliance[];
  onUpdateShade: (
    id: string,
    shadeKey: "base" | "light" | "medium" | "dark",
    newColor: string
  ) => void;
  onDeleteAlliance: (id: string) => void;
}) {
  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle border rounded overflow-hidden shadow-sm">
        <thead className="table-light text-uppercase small">
          <tr>
            <th scope="col">Alliance Name</th>
            <th scope="col">Base Color</th>
            <th scope="col">Light Shade</th>
            <th scope="col">Medium Shade</th>
            <th scope="col">Dark Shade</th>
            <th scope="col">Actions</th>
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
              <td colSpan={6} className="text-muted text-center py-4">
                No alliances yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
