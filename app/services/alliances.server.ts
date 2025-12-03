import { db } from "./firebase.server";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  addDoc,
} from "firebase/firestore";

export type Alliance = {
  id: string;
  name: string;
  shades: string[];
};

/**
 * Fetch all alliances from Firestore.
 */
export async function getAlliances(): Promise<Alliance[]> {
  const snapshot = await getDocs(collection(db, "alliances"));
  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...(docSnap.data() as Omit<Alliance, "id">),
  }));
}

/**
 * Add a new alliance to Firestore.
 */
export async function addAlliance(name: string, shades: string[]) {
  await addDoc(collection(db, "alliances"), { name, shades });
}

/**
 * Update a specific shade in an alliance.
 */
export async function updateAllianceShade(
  id: string,
  index: number,
  newColor: string
) {
  const ref = doc(db, "alliances", id);
  await updateDoc(ref, { [`shades.${index}`]: newColor });
}
