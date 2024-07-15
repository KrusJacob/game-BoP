import { IEnemy } from "@/types/enemy.types";
import { IHero } from "@/types/hero.types";
import { create } from "zustand";

type State = {
  hero: IHero | undefined;
  enemy: IHero | IEnemy | undefined;
};

type Actions = {
  setHero: (hero: IHero) => void;
  setEnemy: (enemy: IHero | IEnemy) => void;
};

export const useGameStore = create<State & Actions>((set) => ({
  hero: undefined,
  enemy: undefined,
  setHero: (hero) => set((state) => ({ hero })),
  setEnemy: (enemy) => set((state) => ({ enemy })),
}));
