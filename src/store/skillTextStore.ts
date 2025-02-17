import { create } from "zustand";

interface ISkillTextState {
  skillText: ISkillText[];
  enemySkillText: ISkillText[];
}

export interface ISkillText {
  text: string;
}

type Actions = {
  addSkill: (text: string) => void;
  addEnemySkill: (text: string) => void;
  removeSkill: (i: number) => void;
  removeEnemySkill: (i: number) => void;
};

export const useSkillTextStore = create<ISkillTextState & Actions>((set) => ({
  skillText: [],
  enemySkillText: [],
  addSkill: (text) => set((state) => ({ skillText: [...state.skillText, { text }] })),
  addEnemySkill: (text) => set((state) => ({ enemySkillText: [...state.enemySkillText, { text }] })),
  removeSkill: (index) => set((state) => ({ skillText: state.skillText.filter((_, i) => i !== index) })),
  removeEnemySkill: (index) => set((state) => ({ enemySkillText: state.skillText.filter((_, i) => i !== index) })),
}));
