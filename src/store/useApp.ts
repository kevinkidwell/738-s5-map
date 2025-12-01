import { create } from 'zustand';
import { generateAllianceShades } from '../utils/color';

interface Alliance {
  id: string;
  name: string;
  shades: string[];
}

interface AppState {
  alliances: Alliance[];
  publishedData?: { alliances: Alliance[] };
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
          shades: generateAllianceShades(baseColor),
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
