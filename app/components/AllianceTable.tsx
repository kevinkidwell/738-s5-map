// app/components/AllianceTable.tsx
type Alliance = { id: string; name: string; shades: string[] };

export default function AllianceTable({
  alliances,
  onEditShade,
  readOnly = false,
}: {
  alliances: Alliance[];
  onEditShade: (id: string, index: number, newColor: string) => void;
  readOnly?: boolean;
}) {
  return (
    <div className="table-responsive">
      <table className="table table-striped align-middle">
        <thead>
          <tr>
            <th>Name</th>
            <th>Shades</th>
          </tr>
        </thead>
        <tbody>
          {alliances.map((a) => (
            <tr key={a.id}>
              <td className="fw-semibold">{a.name}</td>
              <td>
                {a.shades.map((shade, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`badge border me-1 ${readOnly ? "" : "btn"}`}
                    style={{
                      backgroundColor: shade,
                      borderColor: "#dee2e6",
                      cursor: readOnly ? "default" : "pointer",
                    }}
                    onClick={() => {
                      if (readOnly) return;
                      const next = prompt("Enter new color hex:", shade);
                      if (next) onEditShade(a.id, idx, next);
                    }}
                    title={readOnly ? "Read-only" : "Edit shade"}
                  >
                    {shade}
                  </button>
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
  );
}
