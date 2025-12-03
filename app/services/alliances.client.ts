import { dbClient } from "./firebase.client";
import { collection, onSnapshot } from "firebase/firestore";
import type { Alliance } from "./alliances.server";

/**
 * Subscribe to alliance updates in Firestore.
 * This runs in the browser and streams live changes.
 */
export function subscribeAlliances(
  callback: (alliances: Alliance[]) => void
) {
  return onSnapshot(collection(dbClient, "alliances"), (snapshot) => {
    const alliances = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...(docSnap.data() as Omit<Alliance, "id">),
    }));
    callback(alliances);
  });
}
