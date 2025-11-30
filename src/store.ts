import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Alliance = {
  name: string;
  baseColor: string; // HEX string, ensure contrast in UI when used
  shades?: string[];
};

type DateEntry = {
  date: string;
  milestone: string;
};

type PublishedData = {
  alliances: Alliance[];
  dates: DateEntry[];
  map: any;
  calculations: any;
  publishedAt: string;
};

type AppState = {
  alliances: Alliance[];
  dates: DateEntry[];
  map: any;
  calculations: any;
  publishedData: PublishedData | null;
  upsertAlliance: (a: Alliance) => void;
  upsertDate: (d: DateEntry) => void;
  publishSnapshot: () => void;
  resetData: () => void;
};

export const useApp = create<AppState>()(
  persist(
    (set, get) => ({
      alliances: [],
      dates: [],
      map: {},
      calculations: {},
      publishedData: null,

      upsertAlliance: (a) =>
        set((state) => ({
          alliances: [
            ...state.alliances.filter((x) => x.name !== a.name),
            a,
          ],
        })),

      upsertDate: (d) =>
        set((state) => ({
          dates: [
            ...state.dates.filter((x) => !(x.date === d.date && x.milestone === d.milestone)),
            d,
          ],
        })),

      publishSnapshot: () =>
        set((state) => ({
          publishedData: {
            alliances: state.alliances,
            dates: state.dates,
            map: state.map,
            calculations: state.calculations,
            publishedAt: new Date().toISOString(),
          },
        })),

      resetData: () =>
        set({
          alliances: [],
          dates: [],
          map: {},
          calculations: {},
          // Keep publishedData intact to preserve public snapshot unless explicitly cleared elsewhere
        }),
    }),
    {
      name: 'alliance-manager-storage',
      version: 1,
      // optional: partialize to exclude transient UI state if added later
    }
  )
);
