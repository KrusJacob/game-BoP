import { IAttackInfo } from "@/types/hero.types";
import { create } from "zustand";

interface IBattleTextState {
  battleText: IAttackInfo[];
}

type Actions = {
  addText: (info: IAttackInfo) => void;
  clearText: () => void;
};

export const useBattleTextStore = create<IBattleTextState & Actions>((set) => ({
  battleText: [],
  addText: (info) => set((state) => ({ battleText: [...state.battleText, info] })),
  clearText: () => set((state) => ({ battleText: [] })),
}));
