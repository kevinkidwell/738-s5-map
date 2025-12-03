import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";

import AllianceManager from "../components/AllianceManager";
import { getAlliances, updateAllianceShade, addAlliance } from "../services/alliances.server";

// Loader fetches initial alliances from Firestore
export const loader = async () => {
  const alliances = await getAlliances();
  return json({ alliances });
};

export default function Index() {
  const { alliances } = useLoaderData<typeof loader>();

  return (
    <div className="container py-4">
      <h1 className="mb-4">Alliance Manager</h1>
      <AllianceManager
        alliances={alliances}
        onAddAlliance={addAlliance}
        onEditShade={updateAllianceShade}
      />
    </div>
  );
}
