import { useEffect, useState } from "react";
import AllianceForm from "./AllianceForm";
import AllianceTable from "./AllianceTable";
import {
  addAlliance,
  updateAllianceShade,
  subscribeAlliances,
} from "../services/alliances.server";

export type Alliance = { id: string; name: string; shades: string[] };

type AllianceManagerProps = {
  readOnly?: boolean;
};

export default function AllianceManager({ readOnly = false }: AllianceManagerProps) {
  const [alliances, setAlliances] = useState<Alliance[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeAlliances(setAlliances);
    return () => unsubscribe();
  }, []);

  const handleAddAlliance = async (name: string, shades: string[]) => {
    if (!readOnly) {
      await addAlliance(name, shades);
    }
  };

  const handleEditShade = async (id: string, index: number, newColor: string) => {
    if (!readOnly) {
      await updateAllianceShade(id, index, newColor);
    }
  };

  return (
    <div className="container py-4">
      <h1 className="h3 mb-4">Alliance Manager</h1>

      {/* Hide form in read-only mode */}
      {!readOnly && <AllianceForm onSubmit={handleAddAlliance} />}

      <AllianceTable
        alliances={alliances}
        onEditShade={handleEditShade}
        readOnly={readOnly}
      />
    </div>
  );
}
