import { create } from "zustand";
import { db } from "../firebase";
import { generateAllianceShades } from "../utils/color";

interface Alliance {
  id: string;
  name: string;
  shades: string[];
}

interface AppState {
  alliances: Alliance[];
  subscribeAlliances: () => void;
  upsertAlliance: (name: string, baseColor: string) => Promise<void>;
  overwriteAllianceShade: (id: string, shadeIndex: number, newColor: string) => Promise<void>;
}

export const useApp = create<AppState>((set) => ({
  alliances: [],

  subscribeAlliances: () => {
    db.collection("alliances").onSnapshot((snapshot) => {
      const data: Alliance[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Alliance, "id">),
      }));
      set({ alliances: data });
    });
  },

  upsertAlliance: async (name, baseColor) => {
    await db.collection("alliances").add({
  name,
  shades: [baseColor, baseColor, baseColor, baseColor], // always array of 4
  createdAt: firebase.firestore.FieldValue.serverTimestamp(),
});
  },

  overwriteAllianceShade: async (id, shadeIndex, newColor) => {
    const ref = db.collection("alliances").doc(id);
const docSnap = await ref.get();
if (docSnap.exists) {
  const data = docSnap.data();
  const shades = Array.isArray(data.shades) ? [...data.shades] : [];
  shades[shadeIndex] = newColor;
  await ref.update({ shades });
}

  },
}));
