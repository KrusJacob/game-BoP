import { enemySkills } from "@/types/enemy.types";
import { getLockSkill } from "../../utils";

export const SKILLS_TREASURE_BOX: enemySkills[] = [
  {
    label: "Полон золотом",
    descr: function () {
      return `Сундук полностю забит золотом, так откройте же его`;
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
