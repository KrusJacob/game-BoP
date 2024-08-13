import { IHero } from "@/types/hero.types";
import { getPercent } from "@/utils/getPercent";

export function applyPowerSkill(value: number, powerSkill: number) {
  return Math.round(value * (powerSkill / 100 + 1));
}

export function healHeroOfSkill(hero: IHero, healValue = 0, healPercent = 0) {
  let heal = healValue + getPercent(hero.getters.getMaxHp(), healPercent);
  heal = applyPowerSkill(healValue, hero.getters.getPowerSkill());
  hero.getHeal(heal);
  // hero.update();
}
