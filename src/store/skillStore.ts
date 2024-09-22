import { UpgradeSkills } from "@/types/skill.types";
import { create } from "zustand";

type State = {
  upgradeSkills: UpgradeSkills;
  //   totalPoint: number;
};

type Actions = {
  setUpgradeSkills: (upgradeSkills: UpgradeSkills) => void;
  //   uncPointSkills: () => void;
};

export const useSkillStore = create<State & Actions>((set) => ({
  upgradeSkills: {} as UpgradeSkills,
  //   totalPoint: 0,
  setUpgradeSkills: (upgradeSkills) => set(() => ({ upgradeSkills })),
  //   uncPointSkills: () => set((state) => ({ ...state, totalPoint: state.totalPoint + 1 })),
}));
