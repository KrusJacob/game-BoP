import { CHANCE_CRITICAL_DAMAGE, CHANCE_EVADE } from "@/constants/setup";
import { IEnemy, enemySkills } from "@/types/enemy.types";
import { getLockSkill, healHeroOfSkill, getСombatTechniquesSkill } from "../../utils";
import { IHero } from "@/types/hero.types";
import { getPercent } from "@/utils/getPercent";

export const SKILLS_BEAST: enemySkills[] = [
  getLockSkill(),
  getLockSkill(),
  getLockSkill(),
  getСombatTechniquesSkill(),
];

export const SKILLS_BEAST_BOSS = [...SKILLS_BEAST];
SKILLS_BEAST_BOSS[0] = {
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
};
