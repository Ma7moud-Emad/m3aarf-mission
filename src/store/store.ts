import { create } from "zustand";
import type { StoreState } from "../types";

export const useStore = create<StoreState>((set) => ({
  search: "",
  setSearch: (value: string) => set({ search: value }),
  draggedTaskId: null,
  setDraggedTaskId: (id: string | null) => set({ draggedTaskId: id }),
}));
