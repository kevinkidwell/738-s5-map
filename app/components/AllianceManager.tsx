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

  const handleUpdateShade = async (id: string, shadeKey: "base" | "light" | "medium" | "dark", newColor: string) => {
    await updateAllianceShade(id, shadeKey, newColor);
  };

  const handleDeleteAlliance = async (id: string) => {
    await deleteAlliance(id);
  };

  const handleAddAlliance = async () => {
    // Add a new row in the style of the screenshot (example defaults)
    await addAlliance("New Alliance", ["#3B82F6", "#93C5FD", "#2563EB", "#1E40AF"]);
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <h2 className="h5 mb-1">Alliances</h2>
            <p className="text-muted mb-0">Manage your alliance network and color schemes</p>
          </div>
          <button className="btn btn-primary" onClick={handleAddAlliance}>
            + Add Alliance
          </button>
        </div>

        <div className="mt-4">
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
        </div>
      </div>
    </div>
  );
}
