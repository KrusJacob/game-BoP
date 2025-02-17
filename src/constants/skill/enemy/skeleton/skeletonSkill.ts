import { CHANCE_CRITICAL_DAMAGE, CHANCE_EVADE } from "@/constants/setup";
import { enemySkills, IEnemy } from "@/types/enemy.types";
import { IHero } from "@/types/hero.types";
import { getLockSkill, healHeroOfSkill } from "../../utils";
import { getPercent } from "@/utils/getPercent";
import { getRandom } from "@/utils/getRandom";

export const SKILLS_SKELETON: enemySkills[] = [
  {
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
  },
  getLockSkill(),
  {
    label: "Жестокие удары",
    descr: function () {
      return `Атаки игнорируют ${this.data.ignoreDef}% защиты врага`;
    },
    fn: function (this: enemySkills[], hero: IHero | IEnemy, target: IHero | IEnemy) {
      hero.buffs.nextAttack.ignoreDef = this[2].data.ignoreDef;
    },
    trigger: "beforeInitiatorAttack",
    img: "/assets/skill/enemies/skill_boss_3.png",
    data: {
      ignoreDef: 30,
    },
  },
  {
    label: "",
    descr: function () {
      return `Шанс критического удара: ${this.data?.chanceCritDamage}%, Шанс уклонения: ${this.data?.chanceEvade}% `;
    },
    img: "/assets/skill/chances.png",
    data: {
      chanceCritDamage: CHANCE_CRITICAL_DAMAGE + 2,
      chanceEvade: CHANCE_EVADE + 2,
    },
  },
];
