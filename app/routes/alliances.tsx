// app/routes/alliances.tsx
import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { getAlliances } from "~/services/alliances.server";
import AllianceManager from "~/components/AllianceManager";

export const loader: LoaderFunction = async () => {
  try {
    const alliances = await getAlliances();
    return json({ alliances });
  } catch (error) {
    console.error("alliances loader error:", error);
    // Return a controlled response instead of crashing the function
    return json({ alliances: [] }, { status: 500 });
  }
};

export default function AlliancesRoute() {
  // You can use useLoaderData if needed, but the AllianceManager subscribes client-side too
  return <AllianceManager />;
}
