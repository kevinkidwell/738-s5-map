type Alliance = { id: string; name: string; shades: string[] };

type AllianceTableProps = {
  alliances: Alliance[];
  onEditShade: (id: string, index: number, newColor: string) => void;
  readOnly?: boolean;
};

export default function AllianceTable({
  alliances,
  onEditShade,
  readOnly,
}: AllianceTableProps) {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Shades</th>
        </tr>
      </thead>
      <tbody>
        {alliances.map((a) => (
          <tr key={a.id}>
            <td>{a.name}</td>
            <td>
              {a.shades.map((shade, idx) => (
                <span
                  key={idx}
                  className="badge me-1"
                  style={{
                    backgroundColor: shade,
                    cursor: readOnly ? "default" : "pointer",
                  }}
                  onClick={() => {
                    if (!readOnly) {
                      const newColor = prompt("Enter new color hex:", shade);
                      if (newColor) {
                        onEditShade(a.id, idx, newColor);
                      }
                    }
                  }}
                >
                  {shade}
                </span>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
