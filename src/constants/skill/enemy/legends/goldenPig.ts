import { enemySkills } from "@/types/enemy.types";
import { getLockSkill, getСombatTechniquesSkill } from "../../utils";

export const SKILLS_GOLDEN_PIG: enemySkills[] = [
  {
    label: "Полностью из золота?",
    descr: function () {
      return `Поговаривают что она вся состоит из чистого золота...`;
    },
    img: "/assets/skill/enemies/golden_pig_1.png",
    data: {},
  },
  getLockSkill(),
  getLockSkill(),
  getСombatTechniquesSkill(),
];
