import { CHANCE_CRITICAL_DAMAGE, CHANCE_EVADE } from "@/constants/setup";
import { IEnemy, enemySkills } from "@/types/enemy.types";
import { getLockSkill, getСombatTechniquesSkill } from "../../utils";
import { IHero } from "@/types/hero.types";
import { getRandom } from "@/utils/getRandom";
import { goPosionDmg } from "@/constants/func/fight";

export const SKILLS_ROGUE: enemySkills[] = [
  getLockSkill(),
  getLockSkill(),
  getLockSkill(),
  getСombatTechniquesSkill(),
];

export const SKILLS_ROGUE_BOSS = SKILLS_ROGUE;
SKILLS_ROGUE_BOSS[0] = {
  label: "Отравленный клинок",
  descr: function () {
    return `При каждой атаке есть ${this.data.chance}% шанс отравить врага ядом. Яд каждую секунду наносит магический урон и длиться ${this.data.duration} секунд`;
  },
  fn: function (this: enemySkills[], hero: IHero | IEnemy, target: IHero | IEnemy) {
    const data = this[0].data;
    const chance = getRandom(1, 100);
    if (chance <= data.chance) {
      hero.pushSkillText(this[0].label);
      const poisinValue = Math.floor(hero.getters.getAttack() * data.modifierDmg);
      goPosionDmg(hero, target, poisinValue, data.duration);
    }
  },
  trigger: "afterInitiatorAttack",
  img: "/assets/skill/enemies/skill_rogue_1.png",
  data: {
    chance: 18,
    duration: 4,
    modifierDmg: 0.3,
  },
};
