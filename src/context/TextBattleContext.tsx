import { ITextBattle } from "@/components/Hero/HeroCard/SkillText";
import { ReactNode, createContext, useContext, useState } from "react";

interface ITextBattleContext {
  battleText: ITextBattle[];
  addSkill: (text: string) => void;
  removeSkill: (i: number) => void;
}
const SkillContext = createContext<ITextBattleContext | undefined>(undefined);

export const useSkill = () => {
  const context = useContext(SkillContext);

  if (!context) {
    throw new Error("context error");
  }

  return context;
};

export const SkillProvider = ({ children }: { children: ReactNode }) => {
  const [battleText, setBattleText] = useState<ITextBattle[]>([]);

  const addSkill = (text: string) => {
    setBattleText((prev) => [...prev, { text }]);
  };

  const removeSkill = (index: number) => {
    setBattleText((prevSkills) => prevSkills.filter((_, i) => i !== index));
  };

  return <SkillContext.Provider value={{ battleText, addSkill, removeSkill }}>{children}</SkillContext.Provider>;
};
