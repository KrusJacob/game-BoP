import { CHANCE_CRITICAL_DAMAGE, CHANCE_EVADE } from "@/constants/setup";
import { enemySkills, IEnemy } from "@/types/enemy.types";
import { IHero } from "@/types/hero.types";
import { getLockSkill } from "../../utils";

export const SKILLS_NAGA: enemySkills[] = [
  getLockSkill(),
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
    img: "/src/assets/talent/chanceCritDamage.png",
    data: {
      ignoreDef: 25,
    },
  },
  {
    label: "",
    descr: function () {
      return `Шанс критического удара: ${this.data?.chanceCritDamage}%, Шанс уклонения: ${this.data?.chanceEvade}% `;
    },
    img: "/src/assets/skill/chances.png",
    data: {
      chanceCritDamage: CHANCE_CRITICAL_DAMAGE + 2,
      chanceEvade: CHANCE_EVADE + 2,
    },
  },
];
