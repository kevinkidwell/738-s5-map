import { create } from 'zustand';

type Alliance = {
  name: string;
  baseColor: string;
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
};

export const useApp = create<AppState>((set, get) => ({
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
        ...state.dates.filter((x) => x.date !== d.date),
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
      },
    })),
}));
