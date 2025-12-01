import { useEffect, useState } from "react";
import AllianceForm from "../components/AllianceForm";
import AllianceTable from "../components/AllianceTable";
import { addAlliance, updateAllianceShade, subscribeAlliances } from "../services/alliances.server";

type Alliance = { id: string; name: string; shades: string[] };

export default function AlliancesRoute() {
  const [alliances, setAlliances] = useState<Alliance[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeAlliances(setAlliances);
    return () => unsubscribe();
  }, []);

  const handleAddAlliance = async (name: string, shades: string[]) => {
    await addAlliance(name, shades[0]); // baseColor passed in, service generates shades
  };

  const handleEditShade = async (id: string, index: number, newColor: string) => {
    await updateAllianceShade(id, index, newColor);
  };

  return (
    <div className="container py-4">
      <h1 className="h3 mb-4">Alliance Manager</h1>
      <AllianceForm onSubmit={handleAddAlliance} />
      <AllianceTable alliances={alliances} onEditShade={handleEditShade} />
    </div>
  );
}
