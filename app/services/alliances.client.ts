// app/services/alliances.client.ts
import { dbClient } from "./firebase.client";
import { collection, onSnapshot } from "firebase/firestore";
import type { Alliance } from "./alliances.server";

export function subscribeAlliances(callback: (alliances: Alliance[]) => void) {
  return onSnapshot(collection(dbClient, "alliances"), (snapshot) => {
    const alliances = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Alliance, "id">),
    }));
    callback(alliances);
  });
}
