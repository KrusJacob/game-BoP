import { enemySkills } from "@/types/enemy.types";
import { IHero } from "@/types/hero.types";
import { getPercent } from "@/utils/getPercent";

export function applyPowerSkill(value: number, powerSkill: number) {
  return Math.round(value * (powerSkill / 100 + 1));
}

export function healHeroOfSkill(hero: IHero, healValue = 0, healPercent = 0, isPowerSkill = true) {
  let heal = healValue + getPercent(hero.getters.getMaxHp(), healPercent);
  if (isPowerSkill) {
    heal = applyPowerSkill(heal, hero.getters.getPowerSkill());
  }
  console.log(heal);
  hero.getHeal(heal);
}

export function getLockSkill(): enemySkills {
  return {
    label: "",
    descr: function () {
      return `Описание способности. В разработке...`;
    },
    img: "/src/assets/skill/lock.png",
    data: {},
  };
}
