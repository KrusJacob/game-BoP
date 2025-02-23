import { CHANCE_CRITICAL_DAMAGE, CHANCE_EVADE } from "@/constants/setup";
import { enemySkills, IEnemy } from "@/types/enemy.types";
import { IHero } from "@/types/hero.types";
import { getIgnoreDefSkill, getLockSkill, getСombatTechniquesSkill } from "../../utils";
import { goBleedDmg } from "@/constants/func/fight";

export const SKILLS_GOBLIN: enemySkills[] = [
  getLockSkill(),
  getLockSkill(),
  getIgnoreDefSkill(15),
  getСombatTechniquesSkill(1, 1),
];

export const SKILLS_GOBLIN_BOSS = [...SKILLS_GOBLIN];
SKILLS_GOBLIN_BOSS[0] = {
  label: "Глубокая рана",
  descr: function () {
    return `Критические удары вызывают кровотечение, нанося врагу каждую секунду магический урон в течении ${this.data.duration} секунд`;
  },
  fn: function (this: enemySkills[], hero: IHero | IEnemy, target: IHero | IEnemy) {
    console.log("skill goblin");
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
};
SKILLS_GOBLIN_BOSS[3] = getСombatTechniquesSkill(11, 1);
