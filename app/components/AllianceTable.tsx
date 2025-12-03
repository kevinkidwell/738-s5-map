import AllianceRow from "./AllianceRow";
import type { Alliance } from "../services/alliances.server";

export default function AllianceTable({
  alliances,
  onUpdateShade,
  onDeleteAlliance,
}: {
  alliances: Alliance[];
  onUpdateShade: (id: string, shadeKey: string, newColor: string) => void;
  onDeleteAlliance: (id: string) => void;
}) {
  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle">
        <thead className="table-light">
          <tr>
            <th scope="col">ALLIANCE NAME</th>
            <th scope="col">BASE COLOR</th>
            <th scope="col">LIGHT SHADE</th>
            <th scope="col">MEDIUM SHADE</th>
            <th scope="col">DARK SHADE</th>
            <th scope="col">ACTIONS</th>
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
