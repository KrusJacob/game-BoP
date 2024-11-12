import { create } from "zustand";

interface ISkillTextState {
  skillText: ISkillText[];
}

export interface ISkillText {
  text: string;
}

type Actions = {
  addSkill: (text: string) => void;
  removeSkill: (i: number) => void;
};

export const useSkillTextStore = create<ISkillTextState & Actions>((set) => ({
  skillText: [],
  addSkill: (text) => set((state) => ({ skillText: [...state.skillText, { text }] })),
  removeSkill: (index) => set((state) => ({ skillText: state.skillText.filter((_, i) => i !== index) })),
}));
