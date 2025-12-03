import { db } from "./firebase.server";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  addDoc,
  onSnapshot,
} from "firebase/firestore";

export type Alliance = { id: string; name: string; shades: string[] };

export async function getAlliances(): Promise<Alliance[]> {
  const snapshot = await getDocs(collection(db, "alliances"));
  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...(docSnap.data() as Omit<Alliance, "id">),
  }));
}

export function subscribeAlliances(callback: (alliances: Alliance[]) => void) {
  return onSnapshot(collection(db, "alliances"), (snapshot) => {
    const alliances = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...(docSnap.data() as Omit<Alliance, "id">),
    }));
    callback(alliances);
  });
}

export async function addAlliance(name: string, shades: string[]) {
  await addDoc(collection(db, "alliances"), { name, shades });
}

export async function updateAllianceShade(id: string, index: number, newColor: string) {
  const ref = doc(db, "alliances", id);
  await updateDoc(ref, { [`shades.${index}`]: newColor });
}
