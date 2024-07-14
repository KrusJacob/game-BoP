import { IHero, heroBaseStats, heroBuffs, heroGoAttack, heroType } from "../types/hero.types";
import { STATS_PROGRAMMER, STATS_COOK, STATS_BOXER, STATS_HAIRDRESSER } from "./hero";

export class HeroClass implements IHero {
  constructor(type: heroType) {
    this.type = type;
    this.baseStats = getStatsToHero(type);
    this.HP = this.baseStats.maxHp;
    this.barrier = 0;
    this.buffs = {
      damage: 0,
      def: 0,
      incDamage: incHeroDamage,
      incDef: incHeroDef,
      getBuffDamage: getBuffDamage,
      getBuffDef: getBuffDef,
    };
    this.attack = goAttack;
  }
  HP: number;
  barrier: number;
  readonly type: heroType;
  baseStats: heroBaseStats;
  buffs: heroBuffs;
  attack: heroGoAttack;
}

function getStatsToHero(type: heroType): heroBaseStats {
  switch (type) {
    case "boxer":
      return STATS_BOXER;
    case "programmer":
      return STATS_PROGRAMMER;
    case "cook":
      return STATS_COOK;
    case "hairdresser":
      return STATS_HAIRDRESSER;
    default:
      return STATS_BOXER;
  }
}

function incHeroDamage(this: IHero["buffs"], value: number, duration?: number) {
  if (!duration) {
    this.damage += value;
  } else {
    this.damage += value;
    setTimeout(() => {
      this.damage -= value;
    }, duration);
  }
}
function incHeroDef(this: IHero["buffs"], value: number, duration?: number) {
  if (!duration) {
    this.def += value;
  } else {
    this.def += value;
    setTimeout(() => {
      this.def -= value;
    }, duration);
  }
}
function getBuffDamage(this: IHero["buffs"]) {
  return this.damage / 100 + 1;
}
function getBuffDef(this: IHero["buffs"]) {
  return (100 - this.def) / 100;
}

function goAttack(this: IHero, target: IHero) {
  const calcAttack = this.baseStats.attack * this.buffs.getBuffDamage();
  const potentialAttack = calcAttack * target.buffs.getBuffDef();
  const result = (potentialAttack - target.baseStats.def) * target.buffs.getBuffDef();
  target.HP -= result;
  // console.log(target.type, `урон: ${result}, осталось: ${target.HP}`);
  console.log(`Удар по ${target.type} на ${result} урона, осталось ${target.HP} HP`);
}

export function fight(hero: IHero, enemy: IHero) {
  const tickHero = setInterval(() => {
    hero.attack(enemy);
    if (enemy.HP <= 0) {
      clearInterval(tickHero);
      clearInterval(tickEnemy);
      console.log(hero.type, "win!");
    }
  }, 1000 / hero.baseStats.attackSpeed);
  const tickEnemy = setInterval(() => {
    enemy.attack(hero);
    if (hero.HP <= 0) {
      clearInterval(tickHero);
      clearInterval(tickEnemy);
      console.log(enemy.type, "win!");
    }
  }, 1000 / enemy.baseStats.attackSpeed);
}
