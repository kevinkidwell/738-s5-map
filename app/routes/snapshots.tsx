import { useEffect, useState } from "react";
import AllianceTable from "../components/AllianceTable";
import { subscribeSnapshots } from "../services/snapshots.server";

type Alliance = { id: string; name: string; shades: string[] };
type Snapshot = { id: string; alliances: Alliance[]; publishedAt?: unknown };

export default function SnapshotsRoute() {
  const [snapshots, setSnapshots] = useState<Snapshot[]>([]);
  const [current, setCurrent] = useState<Snapshot | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeSnapshots((list) => {
      setSnapshots(list);
      setCurrent(list[0] || null);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="container py-4">
      <h1 className="h3 mb-4">Published Snapshots</h1>
      <div className="mb-4">
        <label className="form-label">Select Snapshot</label>
        <select
          className="form-select"
          value={current?.id || ""}
          onChange={(e) => setCurrent(snapshots.find(s => s.id === e.target.value) || null)}
        >
          {snapshots.map(s => (
            <option key={s.id} value={s.id}>
              {s.publishedAt ? new Date((s.publishedAt as any).toDate()).toLocaleString() : s.id}
            </option>
          ))}
        </select>
      </div>
      {current ? (
        <AllianceTable alliances={current.alliances} onEditShade={async () => {}} />
      ) : (
        <p className="text-muted">No snapshot selected.</p>
      )}
    </div>
  );
}
