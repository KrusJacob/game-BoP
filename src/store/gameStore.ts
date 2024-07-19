import { IEnemy } from "@/types/enemy.types";
import { IHero } from "@/types/hero.types";
import { create } from "zustand";

type State = {
  hero: IHero | null;
  enemy: IHero | IEnemy | null;
};

type Actions = {
  setHero: (hero: IHero) => void;
  setEnemy: (enemy: IHero | IEnemy | null) => void;
};

export const useGameStore = create<State & Actions>((set) => ({
  hero: null,
  enemy: null,
  setHero: (hero) => set((state) => ({ hero })),
  setEnemy: (enemy) => set((state) => ({ enemy })),
}));
