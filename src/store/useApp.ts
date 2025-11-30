// src/store/useApp.ts
import { create } from 'zustand';

interface Alliance {
  id: string;
  name: string;
  shades: string[];
}

interface PublishedData {
  alliances: Alliance[];
}

interface AppState {
  alliances: Alliance[];
  publishedData?: PublishedData;
  upsertAlliance: (name: string, baseColor: string) => void;
  overwriteAllianceShade: (id: string, shadeIndex: number, newColor: string) => void;
}

export const useApp = create<AppState>((set) => ({
  alliances: [],
  publishedData: undefined,

  upsertAlliance: (name, baseColor) =>
    set((state) => ({
      alliances: [
        ...state.alliances,
        {
          id: crypto.randomUUID(),
          name,
          // For now, just repeat the baseColor for all 4 milestone shades
          shades: [baseColor, baseColor, baseColor, baseColor],
        },
      ],
    })),

  overwriteAllianceShade: (id, shadeIndex, newColor) =>
    set((state) => ({
      alliances: state.alliances.map((a) =>
        a.id === id
          ? {
              ...a,
              shades: a.shades.map((s, i) => (i === shadeIndex ? newColor : s)),
            }
          : a
      ),
    })),
}));
