// app/services/alliances.server.ts
import { dbClient } from "./firebase.client";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

export type Alliance = {
  id: string;
  name: string;
  shades: string[]; // [base, light, medium, dark]
};

const alliancesCollection = collection(dbClient, "alliances");

/**
 * Fetch all alliances once (non‑realtime).
 */
export async function getAlliances(): Promise<Alliance[]> {
  const snapshot = await getDocs(alliancesCollection);
  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...(docSnap.data() as Omit<Alliance, "id">),
  }));
}

/**
 * Add a new alliance document.
 */
export async function addAlliance(name: string, shades: string[]): Promise<Alliance> {
  const docRef = await addDoc(alliancesCollection, { name, shades });
  return { id: docRef.id, name, shades };
}

/**
 * Update a single shade in the alliance’s shades array.
 */
export async function updateAllianceShade(
  id: string,
  shadeKey: "base" | "light" | "medium" | "dark",
  newColor: string
): Promise<void> {
  const shadeIndex =
    shadeKey === "base" ? 0 : shadeKey === "light" ? 1 : shadeKey === "medium" ? 2 : 3;

  const allianceDoc = doc(dbClient, "alliances", id);

  // Firestore supports updating array elements by index using field paths
  await updateDoc(allianceDoc, {
    [`shades.${shadeIndex}`]: newColor,
  });
}

/**
 * Delete an alliance document.
 */
export async function deleteAlliance(id: string): Promise<void> {
  const allianceDoc = doc(dbClient, "alliances", id);
  await deleteDoc(allianceDoc);
}
