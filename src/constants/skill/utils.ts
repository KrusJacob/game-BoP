import { IEnemy, enemySkills } from "@/types/enemy.types";
import { IHero } from "@/types/hero.types";
import { getPercent } from "@/utils/getPercent";
import { goDamage, magicalDamageAction, physicalDamageAction, pureDamageAction } from "../func/fight";

export function applyPowerSkill(value: number, powerSkill: number) {
  return Math.round(value * (powerSkill / 100 + 1));
}

export function goMagicalDamage(hero: IHero | IEnemy, target: IHero | IEnemy, damage: number) {
  const magicalDamage = applyPowerSkill(damage, hero.getters.getPowerSkill());
  console.log(magicalDamage, "damage");
  const damagedValue = goDamage(hero, target, magicalDamageAction(magicalDamage));

  return damagedValue;
}

export function goPureDamage(hero: IHero | IEnemy, target: IHero | IEnemy, damage: number) {
  const pureDamage = applyPowerSkill(damage, hero.getters.getPowerSkill());
  return goDamage(hero, target, pureDamageAction(pureDamage));
}

export function goPhysicalDamage(hero: IHero | IEnemy, target: IHero | IEnemy, damage: number) {
  goDamage(hero, target, physicalDamageAction(damage));
}

export function healHeroOfSkill(hero: IHero | IEnemy, healValue = 0, healPercent = 0, isPowerSkill = true) {
  let heal = healValue + getPercent(hero.getters.getMaxHp(), healPercent);
  if (isPowerSkill) {
    heal = applyPowerSkill(heal, hero.getters.getPowerSkill());
  }
  hero.getHeal(heal);
  console.log(hero.getHeal(heal), "- heal", hero.type);
}

export function getLockSkill(): enemySkills {
  return {
    label: "",
    descr: function () {
      return `Описание способности. В разработке...`;
    },
    img: "/assets/skill/lock.png",
    data: {},
  };
}
