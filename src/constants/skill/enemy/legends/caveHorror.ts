import { IEnemy, enemySkills } from "@/types/enemy.types";
import { getLockSkill, getСombatTechniquesSkill, goMagicalDamage, getIgnoreDefSkill } from "../../utils";
import { IHero } from "@/types/hero.types";
import { goStun } from "@/constants/func/fight";

export const SKILLS_CAVE_HORROR: enemySkills[] = [
  {
    label: "Взор ужаса",
    descr: function () {
      return `В начале хода наносит противнику ${this.data.value} магического урона и оглушает на ${this.data.duration} cекунд`;
    },
    fn: function (this: enemySkills[], hero: IHero | IEnemy, target: IHero | IEnemy) {
      const data = this[0].data;
      console.log(goMagicalDamage(hero, target, data.value));
      // goMagicalDamage(hero, target, data.value);
      goStun(target, data.duration);
    },
    trigger: "inBeginFight",
    img: "/assets/skill/enemies/skill_beast_1.png",
    data: {
      value: 250,
      duration: 6,
    },
  },
  getLockSkill(),
  getIgnoreDefSkill(20),
  getСombatTechniquesSkill(),
];
