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

  const handleUpdateShade = async (
    id: string,
    shadeKey: "base" | "light" | "medium" | "dark",
    newColor: string
  ) => {
    await updateAllianceShade(id, shadeKey, newColor);
  };

  const handleDeleteAlliance = async (id: string) => {
    await deleteAlliance(id);
  };

  const handleAddAlliance = async () => {
    await addAlliance("New Alliance", ["#3B82F6", "#93C5FD", "#2563EB", "#1E40AF"]);
  };

  return (
    <>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h4 mb-1">Alliances</h1>
          <p className="text-muted mb-0">Manage your alliance network and color schemes</p>
        </div>
        <button className="btn btn-primary" onClick={handleAddAlliance}>
          + Add Alliance
        </button>
      </div>

      {/* Table card */}
      <div className="card shadow-sm">
        <div className="card-body">
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
    </>
  );
}
