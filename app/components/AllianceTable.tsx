import { useState } from "react";
import ShadeSwatch from "./ShadeSwatch";

type Alliance = {
  id: string;
  name: string;
  shades: string[];
};

export default function AllianceTable({
  alliances,
  onEditShade,
}: {
  alliances: Alliance[];
  onEditShade: (id: string, index: number, newColor: string) => Promise<void>;
}) {
  const [editing, setEditing] = useState<{ id: string; i: number } | null>(null);
  const [value, setValue] = useState("");

  return (
    <table className="table table-striped align-middle">
      <thead>
        <tr>
          <th>Name</th>
          <th className="text-center">Stronghold First</th>
          <th className="text-center">Stronghold Final</th>
          <th className="text-center">City First</th>
          <th className="text-center">City Final</th>
        </tr>
      </thead>
      <tbody>
        {alliances.map((a) => (
          <tr key={a.id}>
            <td className="fw-semibold">{a.name}</td>
            {Array.isArray(a.shades) ? (
              a.shades.map((shade, i) => {
                const isEditing = editing?.id === a.id && editing?.i === i;
                return (
                  <td key={i} className="text-center">
                    {isEditing ? (
                      <input
                        className="form-control form-control-sm text-center"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onBlur={async () => {
                          await onEditShade(a.id, i, value);
                          setEditing(null);
                        }}
                        onKeyDown={async (e) => {
                          if (e.key === "Enter") {
                            await onEditShade(a.id, i, value);
                            setEditing(null);
                          }
                        }}
                        autoFocus
                      />
                    ) : (
                      <ShadeSwatch
                        shade={shade}
                        onClick={() => {
                          setEditing({ id: a.id, i });
                          setValue(shade);
                        }}
                      />
                    )}
                  </td>
                );
              })
            ) : (
              <td colSpan={4} className="text-muted text-center">No shades defined</td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
