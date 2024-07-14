import { IHero } from "@/types/hero.types";
import { create } from "zustand";

type State = {
  hero: IHero | undefined;
  enemy: IHero | undefined;
};

type Actions = {
  setHero: (hero: IHero) => void;
  setEnemy: (enemy: IHero) => void;
};

export const useGameStore = create<State & Actions>((set) => ({
  hero: undefined,
  enemy: undefined,
  setHero: (hero) => set((state) => ({ hero: { ...hero } })),
  setEnemy: (enemy) => set((state) => ({ enemy: { ...enemy } })),
}));
