// app/services/alliances.server.ts
import { db } from "./firebase.server";
import { collection, getDocs, doc, updateDoc, addDoc } from "firebase/firestore";

export type Alliance = { id: string; name: string; shades: string[] };

export async function getAlliances(): Promise<Alliance[]> {
  const snapshot = await getDocs(collection(db, "alliances"));
  return snapshot.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<Alliance, "id">),
  }));
}

export async function addAlliance(name: string, shades: string[]) {
  await addDoc(collection(db, "alliances"), { name, shades });
}

export async function updateAllianceShade(id: string, index: number, newColor: string) {
  await updateDoc(doc(db, "alliances", id), { [`shades.${index}`]: newColor });
}
