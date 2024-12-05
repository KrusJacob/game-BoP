import { enemySkills } from "@/types/enemy.types";
import { getLockSkill } from "../../utils";

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
  {
    label: "",
    descr: function () {
      return `Шанс критического удара: ${this.data?.chanceCritDamage}%, Шанс уклонения: ${this.data?.chanceEvade}% `;
    },
    img: "/assets/skill/chances.png",
    data: {
      chanceCritDamage: 0,
      chanceEvade: 0,
    },
  },
];
