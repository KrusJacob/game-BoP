import { CHANCE_CRITICAL_DAMAGE, CHANCE_EVADE } from "@/constants/setup";
import { IEnemy, enemySkills } from "@/types/enemy.types";
import { getLockSkill, goMagicalDamage } from "../../utils";
import { IHero } from "@/types/hero.types";
import { getRandom } from "@/utils/getRandom";

export const SKILLS_GNOME: enemySkills[] = [
  {
    label: "Темный разряд",
    descr: function () {
      return `После каждой атаки есть ${this.data.chance}% шанс нанести врагу магический урон - ${
        this.data.modifierIntellect * 100
      }% от вашего интеллекта`;
    },
    fn: function (this: enemySkills[], hero: IHero | IEnemy, target: IHero | IEnemy) {
      const data = this[0].data;
      const chance = getRandom(1, 100);
      if (chance <= data.chance) {
        setTimeout(() => {
          hero.pushSkillText(this[0].label);
          const damage = hero.getters.getIntellect() * data.modifierIntellect;
          goMagicalDamage(hero, target, damage);
        }, 250);
      }
    },
    trigger: "afterInitiatorAttack",
    img: "/assets/skill/enemies/skill_gnome_1.png",
    data: {
      chance: 15,
      modifierIntellect: 2,
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
      ignoreDef: 20,
    },
  },
  {
    label: "Техника боя",
    descr: function () {
      return `Шанс критического удара: ${this.data?.chanceCritDamage}%, Шанс уклонения: ${this.data?.chanceEvade}% `;
    },
    img: "/assets/skill/chances.png",
    data: {
      chanceCritDamage: CHANCE_CRITICAL_DAMAGE + 1,
      chanceEvade: CHANCE_EVADE + 1,
    },
  },
];
