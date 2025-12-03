import { useEffect, useState } from "react";
import AllianceTable from "./AllianceTable";
import { addAlliance, updateAllianceShade, deleteAlliance } from "../services/alliances.server";
import { subscribeAlliances } from "../services/alliances.client";
import type { Alliance } from "../services/alliances.server";

export default function AllianceManager() {
  const [alliances, setAlliances] = useState<Alliance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = subscribeAlliances((data) => {
      setAlliances(data);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleUpdateShade = async (id: string, shadeKey: string, newColor: string) => {
    await updateAllianceShade(id, shadeKey, newColor);
  };

  const handleDeleteAlliance = async (id: string) => {
    await deleteAlliance(id);
  };

  const handleAddAlliance = async () => {
    await addAlliance("New Alliance", ["#3B82F6", "#93C5FD", "#2563EB", "#1E40AF"]);
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h5 mb-3">Alliances</h2>
        <p className="text-muted mb-4">
          Manage your alliance network and color schemes
        </p>

        {loading ? (
          <div className="text-center py-5" aria-live="polite">
            <div className="spinner-border text-primary" role="status" aria-hidden="true"></div>
            <p className="mt-3">Loading alliances…</p>
          </div>
        ) : (
          <AllianceTable
            alliances={alliances}
            onUpdateShade={handleUpdateShade}
            onDeleteAlliance={handleDeleteAlliance}
          />
        )}

        <button className="btn btn-primary mt-3" onClick={handleAddAlliance}>
          + Add Alliance
        </button>
      </div>
    </div>
  );
}
