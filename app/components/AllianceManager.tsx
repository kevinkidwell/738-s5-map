// app/components/AllianceManager.tsx
import { useEffect, useState } from "react";
import AllianceForm from "./AllianceForm";
import AllianceTable from "./AllianceTable";
import { addAlliance, updateAllianceShade } from "../services/alliances.server";
import { subscribeAlliances } from "../services/alliances.client";
import type { Alliance } from "../services/alliances.server";

export default function AllianceManager({ readOnly = false }: { readOnly?: boolean }) {
  const [alliances, setAlliances] = useState<Alliance[]>([]);

  useEffect(() => {
    const unsub = subscribeAlliances(setAlliances);
    return () => unsub();
  }, []);

  const handleAddAlliance = async (name: string, shades: string[]) => {
    if (!readOnly) await addAlliance(name, shades);
  };

  const handleEditShade = async (id: string, index: number, newColor: string) => {
    if (!readOnly) await updateAllianceShade(id, index, newColor);
  };

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h1 className="h3 m-0">Alliance Manager</h1>
        {!readOnly && (
          <span className="badge bg-success">Editing Enabled</span>
        )}
        {readOnly && (
          <span className="badge bg-secondary">Read-Only</span>
        )}
      </div>

      {!readOnly && <AllianceForm onSubmit={handleAddAlliance} />}

      <AllianceTable
        alliances={alliances}
        onEditShade={handleEditShade}
        readOnly={readOnly}
      />
    </div>
  );
}
