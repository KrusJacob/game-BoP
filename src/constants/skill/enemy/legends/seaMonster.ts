import { CHANCE_CRITICAL_DAMAGE, CHANCE_EVADE } from "@/constants/setup";
import { IEnemy, enemySkills } from "@/types/enemy.types";
import { getLockSkill, getСombatTechniquesSkill, getIgnoreDefSkill } from "../../utils";
import { IHero } from "@/types/hero.types";
import { goHealTick } from "@/constants/func/fight";

export const SKILLS_SEA_MONSTER: enemySkills[] = [
  {
    label: "Восстанавливающиеся  чешуя",
    descr: function () {
      return `Каждую секунду восстанавливает герою ${this.data.value} здоровья.`;
    },
    fn: function (this: enemySkills[], hero: IHero | IEnemy, target: IHero | IEnemy) {
      const data = this[0].data;
      goHealTick(hero, target, data.value, 0);
    },
    trigger: "inBeginFight",
    img: "/assets/skill/enemies/skill_beast_1.png",
    data: {
      value: 75,
    },
  },
  getLockSkill(),
  getIgnoreDefSkill(30),
  getСombatTechniquesSkill(),
];
