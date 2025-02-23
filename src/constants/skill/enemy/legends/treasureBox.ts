import { enemySkills } from "@/types/enemy.types";
import { getLockSkill, getСombatTechniquesSkill } from "../../utils";

export const SKILLS_TREASURE_BOX: enemySkills[] = [
  {
    label: "Полон золотом",
    descr: function () {
      return `Сундук полностю забит золотом, так откройте же его`;
    },
    img: "/assets/skill/enemies/gnome_trader_1.png",
    data: {},
  },
  getLockSkill(),
  getLockSkill(),
  getСombatTechniquesSkill(),
];
