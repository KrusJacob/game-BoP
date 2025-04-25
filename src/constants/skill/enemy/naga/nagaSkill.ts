import { enemySkills, IEnemy } from "@/types/enemy.types";
import { IHero } from "@/types/hero.types";
import { getIgnoreDefSkill, getLockSkill, getСombatTechniquesSkill } from "../../utils";
import { getRandom } from "@/utils/getRandom";
import { goStun } from "@/constants/func/effects";

export const SKILLS_NAGA: enemySkills[] = [
  getLockSkill(),
  getLockSkill(),
  getIgnoreDefSkill(25),
  getСombatTechniquesSkill(2, 2),
];

export const SKILLS_NAGA_BOSS = [...SKILLS_NAGA];
SKILLS_NAGA_BOSS[0] = {
  label: "Удар якорем",
  descr: function () {
    return `При каждой атаке есть ${this.data.chance}% шанс оглушить противника на ${this.data.duration} секунд`;
  },
  fn: function (this: enemySkills[], hero: IHero | IEnemy, target: IHero | IEnemy) {
    const data = this[0].data;
    const chance = getRandom(1, 100);
    if (chance <= data.chance) {
      hero.pushSkillText(this[0].label);
      goStun(target, data.duration);
    }
  },
  trigger: "afterInitiatorAttack",
  img: "/assets/skill/enemies/skill_naga_1.png",
  data: {
    chance: 12,
    duration: 2,
  },
};
