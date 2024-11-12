import { UpgradeSkills } from "@/types/skill.types";
import { create } from "zustand";

type State = {
  upgradeSkills: UpgradeSkills;
};

type Actions = {
  setUpgradeSkills: (upgradeSkills: UpgradeSkills) => void;
};

export const useSkillUpgradeStore = create<State & Actions>((set) => ({
  upgradeSkills: {} as UpgradeSkills,
  setUpgradeSkills: (upgradeSkills) => set(() => ({ upgradeSkills })),
}));
