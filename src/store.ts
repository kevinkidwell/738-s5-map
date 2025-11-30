import { create } from 'zustand';
import { Alliance, ShadeRule, Square } from './types';

interface AppState {
  squares: Square[];
  alliances: Alliance[];
  dateOptions: string[];
  shadeRules: Record<string, ShadeRule>;
  selectedId: number | null;

  setSquares: (s: Square[]) => void;
  updateSquare: (id: number, patch: Partial<Square>) => void;

  upsertAlliance: (a: Alliance) => void;
  setDateOptions: (d: string[]) => void;
  setShadeRule: (key: string, idx: 0 | 1 | 2) => void;

  setSelectedId: (id: number | null) => void;
}

export const useApp = create<AppState>((set) => ({
  squares: [],
  alliances: [
    { name: 'Alliance A', baseColor: '#FF5733' },
    { name: 'Alliance B', baseColor: '#33C1FF' },
    { name: 'Alliance C', baseColor: '#9D33FF' },
  ],
  dateOptions: ['2025-11-01', '2025-11-15', '2025-12-01'],
  shadeRules: {
    'City.First': { key: 'City.First', shadeIndex: 0 },
    'City.Final': { key: 'City.Final', shadeIndex: 2 },
    'Stronghold.First': { key: 'Stronghold.First', shadeIndex: 1 },
    'Stronghold.Final': { key: 'Stronghold.Final', shadeIndex: 0 },
    'Trade Post.First': { key: 'Trade Post.First', shadeIndex: 0 },
    'Trade Post.Final': { key: 'Trade Post.Final', shadeIndex: 2 },
  },
  selectedId: null,

  setSquares: (s) => set({ squares: s }),
  updateSquare: (id, patch) =>
    set((state) => ({
      squares: state.squares.map((sq) => (sq.id === id ? { ...sq, ...patch } : sq)),
    })),

  upsertAlliance: (a) =>
    set((state) => {
      const idx = state.alliances.findIndex((x) => x.name === a.name);
      const next = [...state.alliances];
      if (idx >= 0) next[idx] = a;
      else next.push(a);
      return { alliances: next };
    }),
  setDateOptions: (d) => set({ dateOptions: d }),
  setShadeRule: (key, idx) =>
    set((s) => ({ shadeRules: { ...s.shadeRules, [key]: { key, shadeIndex: idx } } })),
  setSelectedId: (id) => set({ selectedId: id }),
}));
