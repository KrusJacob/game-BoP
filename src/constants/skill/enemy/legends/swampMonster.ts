import { IEnemy, enemySkills } from "@/types/enemy.types";
import { getLockSkill, getСombatTechniquesSkill } from "../../utils";
import { IHero } from "@/types/hero.types";
import { goPosionDmg } from "@/constants/func/effects";

export const SKILLS_SWAMP_MONSTER: enemySkills[] = [
  {
    label: "Ядовитые споры",
    descr: function () {
      return `В начале хода накладывает на противника яд на ${this.data.duration} секунд, который наносит ${this.data.value} фиксированного урона в секунду`;
    },
    fn: function (this: enemySkills[], hero: IHero | IEnemy, target: IHero | IEnemy) {
      const data = this[0].data;
      goPosionDmg(hero, target, data.value, data.duration);
    },
    trigger: "afterInitiatorAttack",
    img: "/assets/skill/enemies/skill_beast_1.png",
    data: {
      duration: 20,
      value: 50,
    },
  },
  getLockSkill(),
  getLockSkill(),
  getСombatTechniquesSkill(),
];
