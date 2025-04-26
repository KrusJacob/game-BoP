import { ICharacter, attackOptions } from "@/types/hero.types";
import { MULTIPLIER_CRITICAL_DAMAGE } from "../setup";
import { getPercent } from "@/utils/getPercent";
import { get } from "http";

export function getCriticalDamage(value: number) {
  return value * MULTIPLIER_CRITICAL_DAMAGE;
}

export function getDamageWithOptions(damage: number, options?: attackOptions) {
  if (!options) {
    return damage;
  }
  let bonusDamage = 0;
  if (options.bonusDamage) {
    bonusDamage += options.bonusDamage;
  }
  return Math.floor(damage * (options.modifier ? options.modifier : 1) + bonusDamage);
}

export function getDamageWithBuffs(attacker: ICharacter) {
  return attacker.getters.getAttack() * attacker.buffs.getBuffDamage();
}

function getDamageWithMagicDef(damage: number, magicDef: number, hero?: ICharacter, options?: attackOptions) {
  return getPercent(damage, 100 - magicDef);
}

function getDamageWithReduction(target: ICharacter, value: number) {
  return Math.floor(value * target.buffs.getBuffDef());
}

function getDamageAfterDef(damage: number, def: number) {
  let res = Math.max(1, damage - def);
  if (def > 0 && def <= 15) {
    res = res * 0.95;
  } else if (def > 15 && def <= 30) {
    res = res * 0.9;
  } else if (def > 30 && def <= 50) {
    res = res * 0.8;
  } else if (def > 50 && def <= 65) {
    res = res * 0.7;
  } else if (def > 65) {
    res = res * 0.6;
  }
  return Math.round(res);
}

function getDamageWithDef(hero: ICharacter, damage: number, def: number, options?: attackOptions) {
  if (!options?.ignoreDef && !hero.buffs.nextAttack.ignoreDef && hero.getters.getIgnoreDef() === 0) {
    return getDamageAfterDef(damage, def);
  }
  const ignoreDef = getIgnoreDef(hero, options);
  console.log(ignoreDef, "%", "ignoreDef");
  return getDamageAfterDef(damage, def - getPercent(def, ignoreDef));
}

function getIgnoreDef(hero: ICharacter, options?: attackOptions) {
  let ignoreDef = options?.ignoreDef || 0;
  ignoreDef += hero.getters.getIgnoreDef();
  if (hero.buffs.nextAttack.ignoreDef) {
    ignoreDef += hero.buffs.nextAttack.ignoreDef;
    hero.buffs.nextAttack.ignoreDef = 0;
  }
  return ignoreDef;
}

export function getPhysicalDamage(
  initiator: ICharacter,
  target: ICharacter,
  value: number,
  options?: attackOptions
) {
  let damage = getDamageWithDef(initiator, value, target.getters.getDef(), options);
  if (target.buffs.getBuffDef() > 1) {
    return getDamageWithReduction(target, value);
  }
  return damage;
}

export function getMagicalDamage(target: ICharacter, value: number) {
  let damage = getDamageWithMagicDef(value, target.getters.getMagicDef());
  if (target.buffs.getBuffDef() > 1) {
    return getDamageWithReduction(target, value);
  }
  return damage;
}
export function getPureDamage(target: ICharacter, value: number) {
  if (target.buffs.getBuffDef() > 1) {
    return getDamageWithReduction(target, value);
  }
  return value;
}

export function getEnergy(hero: ICharacter, value?: number) {
  const energy = value || hero.energy.incValue;
  hero.energy.value += energy;
  if (hero.energy.value > hero.energy.max) {
    hero.energy.value = hero.energy.max;
  }
}

export function getBarrier(this: ICharacter, value: number) {
  const barrierValue = Math.min(value, this.getters.getMaxHp() - this.barrier);
  this.barrier += barrierValue;
  console.log("getBarrier", barrierValue);

  if (this.barrier < 0) {
    this.barrier = 0;
  }
  this.update();
}

export function getHeal(this: ICharacter, value: number) {
  let healValue = value;
  if (!this.status.death) {
    healValue = Math.min(this.getters.getMaxHp() - this.HP, value);
    if (this.status.darkСurse.stack > 0) {
      healValue = reducingHeal(healValue, this.status.darkСurse.stack);
    }
    this.HP += healValue;
    this.update();
  }
  return healValue;
}

function reducingHeal(healValue: number, stack: number) {
  const reducedHeal = getPercent(healValue, Math.max(100 - 20 * stack, 0));
  return reducedHeal;
}
