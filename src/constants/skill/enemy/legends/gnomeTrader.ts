import { enemySkills } from "@/types/enemy.types";
import { getLockSkill, getСombatTechniquesSkill } from "../../utils";

export const SKILLS_GNOME_TRADER: enemySkills[] = [
  {
    label: "Добрая душа",
    descr: function () {
      return `Добрый гном-торговец готов поделится с вами частью своего богатства`;
    },
    img: "/assets/skill/enemies/gnome_trader_1.png",
    data: {},
  },
  getLockSkill(),
  getLockSkill(),
  getСombatTechniquesSkill(),
];
