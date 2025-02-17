import { CHANCE_CRITICAL_DAMAGE, CHANCE_EVADE } from "@/constants/setup";
import { IEnemy, enemySkills } from "@/types/enemy.types";
import { getLockSkill, healHeroOfSkill } from "../../utils";
import { IHero } from "@/types/hero.types";
import { getPercent } from "@/utils/getPercent";

export const SKILLS_BEAST: enemySkills[] = [
  getLockSkill(),
  getLockSkill(),
  getLockSkill(),
  {
    label: "Техника боя",
    descr: function () {
      return `Шанс критического удара: ${this.data?.chanceCritDamage}%, Шанс уклонения: ${this.data?.chanceEvade}% `;
    },
    img: "/assets/skill/chances.png",
    data: {
      chanceCritDamage: CHANCE_CRITICAL_DAMAGE,
      chanceEvade: CHANCE_EVADE,
    },
  },
];

export const SKILLS_BEAST_BOSS: enemySkills[] = [
  {
    label: "Голодный взгляд",
    descr: function () {
      return `Каждая атака исцеляют вас на ${this.data.modifierDrain}% от вашего макс.запаса здоровья`;
    },
    fn: function (this: enemySkills[], hero: IHero | IEnemy, target: IHero | IEnemy) {
      healHeroOfSkill(hero, 0, this[0].data.modifierDrain, false);
    },
    trigger: "afterInitiatorAttack",
    img: "/assets/skill/enemies/skill_beast_1.png",
    data: {
      modifierDrain: 2,
    },
  },
  getLockSkill(),
  getLockSkill(),
  {
    label: "Техника боя",
    descr: function () {
      return `Шанс критического удара: ${this.data?.chanceCritDamage}%, Шанс уклонения: ${this.data?.chanceEvade}% `;
    },
    img: "/assets/skill/chances.png",
    data: {
      chanceCritDamage: CHANCE_CRITICAL_DAMAGE,
      chanceEvade: CHANCE_EVADE,
    },
  },
];
