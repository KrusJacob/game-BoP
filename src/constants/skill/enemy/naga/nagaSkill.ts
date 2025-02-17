import { CHANCE_CRITICAL_DAMAGE, CHANCE_EVADE } from "@/constants/setup";
import { enemySkills, IEnemy } from "@/types/enemy.types";
import { IHero } from "@/types/hero.types";
import { getLockSkill } from "../../utils";
import { getRandom } from "@/utils/getRandom";
import { goStun } from "@/constants/func/fight";

export const SKILLS_NAGA: enemySkills[] = [
  {
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
      ignoreDef: 25,
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
