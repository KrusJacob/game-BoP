import { CHANCE_CRITICAL_DAMAGE, CHANCE_EVADE } from "@/constants/setup";
import { enemySkills, IEnemy } from "@/types/enemy.types";
import { IHero } from "@/types/hero.types";
import { getLockSkill } from "../../utils";
import { goBleedDmg } from "@/constants/func/fight";

export const SKILLS_GOBLIN: enemySkills[] = [
  {
    label: "Глубокая рана",
    descr: function () {
      return `Критические удары вызывают кровотечение, нанося врагу каждую секунду магический урон в течении ${this.data.duration} секунд`;
    },
    fn: function (this: enemySkills[], hero: IHero | IEnemy, target: IHero | IEnemy) {
      const data = this[0].data;
      hero.pushSkillText(this[0].label);
      const bleedValue = Math.floor(hero.getters.getAttack() * data.modifierDmg);
      goBleedDmg(hero, target, bleedValue, data.duration);
    },
    trigger: "afterInitiatorCrit",
    img: "/assets/skill/enemies/skill_goblin_1.png",
    data: {
      modifierDmg: 0.5,
      duration: 6,
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
      ignoreDef: 15,
    },
  },
  {
    label: "",
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
