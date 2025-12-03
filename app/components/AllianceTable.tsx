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
      <table className="table table-hover align-middle">
        <thead className="table-light">
          <tr className="text-uppercase small">
            <th scope="col">Alliance name</th>
            <th scope="col">Base color</th>
            <th scope="col">Light shade</th>
            <th scope="col">Medium shade</th>
            <th scope="col">Dark shade</th>
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
              <td colSpan={6} className="text-muted text-center">No alliances yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
