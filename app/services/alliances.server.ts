import { db } from "./firebase.server";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  addDoc,
  onSnapshot,
} from "firebase/firestore";

export type Alliance = {
  id: string;
  name: string;
  shades: string[];
};

// 🔹 Fetch all alliances once
export async function getAlliances(): Promise<Alliance[]> {
  const snapshot = await getDocs(collection(db, "alliances"));
  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...(docSnap.data() as Omit<Alliance, "id">),
  }));
}

// 🔹 Subscribe to live updates
export function subscribeAlliances(
  callback: (alliances: Alliance[]) => void
) {
  const unsub = onSnapshot(collection(db, "alliances"), (snapshot) => {
    const alliances = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...(docSnap.data() as Omit<Alliance, "id">),
    }));
    callback(alliances);
  });
  return unsub;
}

// 🔹 Add a new alliance with full shades array
export async function addAlliance(name: string, shades: string[]) {
  await addDoc(collection(db, "alliances"), { name, shades });
}

// 🔹 Update a single shade by index
export async function updateAllianceShade(
  id: string,
  index: number,
  newColor: string
) {
  const ref = doc(db, "alliances", id);
  await updateDoc(ref, {
    [`shades.${index}`]: newColor,
  });
}
