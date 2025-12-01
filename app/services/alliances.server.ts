// app/services/alliances.server.ts
import { db } from "./firebase.server";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { generateAllianceShades } from "../utils/color";

const alliancesRef = collection(db, "alliances");

export async function addAlliance(name: string, baseColor: string) {
  const shades = generateAllianceShades(baseColor);
  return await addDoc(alliancesRef, {
    name,
    shades,
    createdAt: new Date(),
  });
}

export async function updateAllianceShade(id: string, index: number, newColor: string) {
  const ref = doc(db, "alliances", id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return;
  const data = snap.data();
  const shades = Array.isArray(data?.shades) ? [...data.shades] : ["", "", "", ""];
  shades[index] = newColor;
  await updateDoc(ref, { shades, lastUpdated: new Date() });
}

export function subscribeAlliances(callback: (alliances: any[]) => void) {
  return onSnapshot(alliancesRef, (snapshot) => {
    const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    callback(list);
  });
}
