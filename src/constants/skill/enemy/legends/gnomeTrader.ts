import { enemySkills } from "@/types/enemy.types";
import { getLockSkill } from "../../utils";

export const SKILLS_GNOME_TRADER: enemySkills[] = [
  {
    label: "Добрая душа",
    descr: function () {
      return `Добрый гном-торговец готов поделится с вами частью своего богатства`;
    },
    img: "/src/assets/skill/enemies/gnome_trader_1.png",
    data: {},
  },
  getLockSkill(),
  getLockSkill(),
  {
    label: "",
    descr: function () {
      return `Шанс критического удара: ${this.data?.chanceCritDamage}%, Шанс уклонения: ${this.data?.chanceEvade}% `;
    },
    img: "/src/assets/skill/chances.png",
    data: {
      chanceCritDamage: 0,
      chanceEvade: 0,
    },
  },
];
