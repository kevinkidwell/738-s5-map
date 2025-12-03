import { useEffect, useState } from "react";
import AllianceTable from "../components/AllianceTable";
import { subscribeAlliances } from "../services/alliances.server";

type Alliance = { id: string; name: string; shades: string[] };

export default function PublicAlliances() {
  const [alliances, setAlliances] = useState<Alliance[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeAlliances(setAlliances);
    return () => unsubscribe();
  }, []);

  return (
    <div className="container py-4">
      <h1 className="h3 mb-4">Public Alliances</h1>
      <p className="text-muted">
        This is a read‑only view of alliances. Editing and adding are disabled.
      </p>
      <AllianceTable alliances={alliances} onEditShade={() => {}} readOnly />
    </div>
  );
}
