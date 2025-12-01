import { create } from "zustand";

type Alliance = {
  id: string;
  name: string;
  shades: string[];
};

interface AllianceStore {
  editing: { id: string; index: number } | null;
  setEditing: (id: string, index: number) => void;
  clearEditing: () => void;

  previewColor: string;
  setPreviewColor: (hex: string) => void;

  selectedSnapshotId: string | null;
  setSelectedSnapshotId: (id: string) => void;
}

export const useAllianceStore = create<AllianceStore>((set) => ({
  editing: null,
  setEditing: (id, index) => set({ editing: { id, index } }),
  clearEditing: () => set({ editing: null }),

  previewColor: "#9370DB",
  setPreviewColor: (hex) => set({ previewColor: hex }),

  selectedSnapshotId: null,
  setSelectedSnapshotId: (id) => set({ selectedSnapshotId: id }),
}));
