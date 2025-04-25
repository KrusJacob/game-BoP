import { IEnemy, enemySkills } from "@/types/enemy.types";
import { IHero, attackOptions } from "@/types/hero.types";
import { getPercent } from "@/utils/getPercent";
import { goDamage } from "../func/fight";
import { CHANCE_CRITICAL_DAMAGE, CHANCE_EVADE } from "../setup";
import { magicalDamageAction, physicalDamageAction, pureDamageAction } from "../func/damageAction";

export function applyPowerSkill(value: number, powerSkill: number) {
  return Math.round(value * (powerSkill / 100 + 1));
}

export function goMagicalDamage(hero: IHero | IEnemy, target: IHero | IEnemy, damage: number) {
  const magicalDamage = applyPowerSkill(damage, hero.getters.getPowerSkill());
  const damagedValue = goDamage(hero, target, magicalDamageAction(magicalDamage));
  console.log(damagedValue, "magicalDamage");

  return damagedValue;
}

export function goPureDamage(hero: IHero | IEnemy, target: IHero | IEnemy, damage: number) {
  const pureDamage = applyPowerSkill(damage, hero.getters.getPowerSkill());
  const damagedValue = goDamage(hero, target, pureDamageAction(pureDamage));
  console.log(damagedValue, "pureDamage");
  return damagedValue;
}

export function goPhysicalDamage(
  hero: IHero | IEnemy,
  target: IHero | IEnemy,
  damage: number,
  options?: attackOptions
) {
  return goDamage(hero, target, physicalDamageAction(damage), options);
}

export function goHealHeroOfSkill(hero: IHero | IEnemy, healValue = 0, healPercent = 0, isPowerSkill = true) {
  const heal = Math.round(getHealOfSkill(hero, healValue, healPercent, isPowerSkill));
  console.log(heal, "- heal", hero.type);
  hero.getHeal(heal);
}

export function getHealOfSkill(hero: IHero | IEnemy, healValue = 0, healPercent = 0, isPowerSkill = true) {
  let heal = healValue + getPercent(hero.getters.getMaxHp(), healPercent);
  if (isPowerSkill) {
    heal = applyPowerSkill(heal, hero.getters.getPowerSkill());
  }

  return heal;
}

export function getIgnoreDefSkill(ignoreDef: number): enemySkills {
  return {
    label: "Жестокие удары",
    descr: function () {
      return `Атаки игнорируют ${this.data.ignoreDef}% защиты врага`;
    },
    fn: function (this: enemySkills[], hero: IHero | IEnemy, target: IHero | IEnemy) {
      hero.setters.incIgnoreDef(this[2].data.ignoreDef);
    },
    trigger: "inBeginFight",
    img: "/assets/skill/enemies/skill_boss_3.png",
    data: {
      ignoreDef: ignoreDef,
    },
  };
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

export function getСombatTechniquesSkill(bonusChanceCritDamage = 0, bonusChanceEvade = 0): enemySkills {
  return {
    label: "Техника боя",
    descr: function () {
      return `Шанс критического удара: ${this.data?.chanceCritDamage}%, Шанс уклонения: ${this.data?.chanceEvade}% `;
    },
    img: "/assets/skill/chances.png",
    data: {
      chanceCritDamage: CHANCE_CRITICAL_DAMAGE + bonusChanceCritDamage,
      chanceEvade: CHANCE_EVADE + bonusChanceEvade,
    },
  };
}
