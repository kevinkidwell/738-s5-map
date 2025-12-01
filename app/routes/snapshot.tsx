import { useEffect, useState } from "react";
import { useSearchParams } from "@remix-run/react";
import AllianceTable from "../components/AllianceTable";
import { getSnapshot } from "../services/snapshots.server";

export default function SnapshotRoute() {
  const [params] = useSearchParams();
  const snapshotId = params.get("id");
  const [snapshot, setSnapshot] = useState<{ alliances: any[] } | null>(null);

  useEffect(() => {
    if (!snapshotId) return;
    getSnapshot(snapshotId).then((data) => setSnapshot(data));
  }, [snapshotId]);

  return (
    <div className="container py-4">
      <h1 className="h3 mb-4">Snapshot View</h1>
      {snapshot ? (
        <AllianceTable alliances={snapshot.alliances} onEditShade={async () => {}} />
      ) : (
        <p className="text-muted">Snapshot not found.</p>
      )}
    </div>
  );
}
