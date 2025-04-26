import { IEnemy, enemySkills } from "@/types/enemy.types";
import { getIgnoreDefSkill, getLockSkill, goMagicalDamage, getСombatTechniquesSkill } from "../../utils";
import { IHero } from "@/types/hero.types";
import { getRandom } from "@/utils/getRandom";

export const SKILLS_GNOME: enemySkills[] = [
  getLockSkill(),
  getLockSkill(),
  getIgnoreDefSkill(20),
  getСombatTechniquesSkill(2, 2),
];

export const SKILLS_GNOME_BOSS = [...SKILLS_GNOME];
SKILLS_GNOME_BOSS[0] = {
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
};
