import { CHANCE_CRITICAL_DAMAGE, CHANCE_EVADE } from "@/constants/setup";
import { enemySkills, IEnemy } from "@/types/enemy.types";
import { IHero } from "@/types/hero.types";
import { getIgnoreDefSkill, getLockSkill, healHeroOfSkill, getСombatTechniquesSkill } from "../../utils";
import { getPercent } from "@/utils/getPercent";
import { getRandom } from "@/utils/getRandom";

export const SKILLS_SKELETON: enemySkills[] = [
  getLockSkill(),
  getLockSkill(),
  getIgnoreDefSkill(30),
  getСombatTechniquesSkill(2, 2),
];

export const SKILLS_SKELETON_BOSS = [...SKILLS_SKELETON];
SKILLS_SKELETON_BOSS[0] = {
  label: "Удар смерти",
  descr: function () {
    return `При каждой атаки есть ${this.data.chance}% шанс восстановить себе - ${this.data.modifierHeal}% от вашего макс.здоровья`;
  },
  fn: function (this: enemySkills[], hero: IHero | IEnemy, target: IHero | IEnemy) {
    const data = this[0].data;
    const chance = getRandom(1, 100);
    if (chance <= data.chance) {
      hero.pushSkillText(this[0].label);
      healHeroOfSkill(hero, 0, data.modifierHeal, false);
    }
  },
  trigger: "afterInitiatorAttack",
  img: "/assets/skill/enemies/skill_skeleton_1.png",
  data: {
    chance: 15,
    modifierHeal: 6,
  },
};
