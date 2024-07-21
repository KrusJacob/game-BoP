import { IEnemy, enemyType } from "@/types/enemy.types";
import { IHero, heroLevel } from "../types/hero.types";
import { getRandom } from "@/utils/getRandom";
import { EnemyClass } from "./class";
import { ENEMIES_TO_WAY } from "./enemy";
import {
  maxEnemy,
  minEnemy,
  incСomplexity,
  HP_REST,
  HP_REST_PERCENT,
  MULTIPLIER_CRITICAL_DAMAGE,
  MULTIPLIER_COUNTER_ATTACK_DAMAGE,
} from "./setup";

export function incExp(this: heroLevel, exp = 0) {
  if (this.exp + exp >= this.expToNextLevel) {
    this.value += 1;
    const remains = exp - this.expToNextLevel;
    this.expToNextLevel = setMaxLevelExp(this.expToNextLevel);
    this.incExp(remains);
  } else {
    this.exp += exp;
  }
}

export function setMaxLevelExp(exp: number) {
  return Math.round(exp * 1.2);
}

export function incHeroDamage(this: IHero["buffs"], value: number, duration?: number) {
  if (!duration) {
    this.damage += value;
  } else {
    this.damage += value;
    setTimeout(() => {
      this.damage -= value;
    }, duration);
  }
}
export function incHeroDef(this: IHero["buffs"], value: number, duration?: number) {
  if (!duration) {
    this.def += value;
  } else {
    this.def += value;
    setTimeout(() => {
      this.def -= value;
    }, duration);
  }
}
export function getBuffDamage(this: IHero["buffs"]) {
  return this.damage / 100 + 1;
}
export function getBuffDef(this: IHero["buffs"]) {
  return (100 - this.def) / 100;
}

export function goAttack(this: IHero | IEnemy, target: IHero | IEnemy, fn: (target: IHero | IEnemy) => void) {
  const damage = calcDamage(this, target);

  if (target.barrier) {
    damageToBarrier(target, damage);
  } else {
    damageToHP(target, damage);
  }
  fn(target);

  console.log(`Удар по ${target.type} на ${damage} урона, осталось ${target.HP} HP`);
}

function calcDamage(attacker: IHero | IEnemy, target: IHero | IEnemy) {
  let result;
  if (CheckForEvade(8)) {
    result = 0;
  } else {
    let calcAttack = attacker.baseStats.attack * attacker.buffs.getBuffDamage();
    calcAttack = CheckForCrit(8) ? goCriticalDamage(calcAttack) : calcAttack;
    // let potentialAttack = calcAttack * target.buffs.getBuffDef();
    result = (calcAttack - target.baseStats.def) * target.buffs.getBuffDef();
  }
  return result;
}

export function damageToBarrier(target: IHero | IEnemy, dmg: number) {
  if (target.barrier - dmg <= 0) {
    target.barrier = 0;
  } else {
    target.barrier -= dmg;
  }
}

export function damageToHP(target: IHero | IEnemy, dmg: number) {
  if (target.HP - dmg <= 0) {
    target.HP = 0;
    target.status.death = true;
  } else {
    target.HP -= dmg;
  }
}

export function fight(
  hero: IHero,
  enemy: IHero | IEnemy,
  fn: (target: IHero) => void,
  fn2: (target: IEnemy) => void
) {
  const tickHero = setInterval(() => {
    // @ts-ignore
    hero.attack(enemy, fn2);
    if (enemy.status.death) {
      clearInterval(tickHero);
      clearInterval(tickEnemy);
      console.log(hero.type, "win!");
      getReward(hero, enemy);
      fn(hero);
    }
  }, 1000 / hero.baseStats.attackSpeed);
  const tickEnemy = setInterval(() => {
    //  @ts-ignore
    enemy.attack(hero, fn);
    if (hero.status.death) {
      clearInterval(tickHero);
      clearInterval(tickEnemy);
      console.log(enemy.type, "win!");
    }
  }, 1000 / enemy.baseStats.attackSpeed);
}

export function getReward(hero: IHero, enemy: IEnemy | IHero) {
  if (enemy instanceof EnemyClass) {
    hero.resources.gold += enemy.resources.gold;
    hero.level.incExp(enemy.resources.exp);
    hero.resources.skillPoints += enemy.resources.skillPoints;
    restHero(hero);
  }
}

export function searchEnemy(arr: typeof ENEMIES_TO_WAY) {
  const arrEnemies = [...arr];
  const res: enemyType[] = [];

  for (let i = 1; i <= 2; i++) {
    const enemyId = getRandom(Math.min(minEnemy, arrEnemies.length - 1), Math.min(maxEnemy, arrEnemies.length));
    res.push(arrEnemies.splice(enemyId - 1, 1).join("") as enemyType);
  }
  incСomplexity();
  return res;
}

function restHero(hero: IHero) {
  const healValue = Math.round(hero.baseStats.maxHp * (HP_REST_PERCENT / 100) + HP_REST);
  getHeal(hero, healValue);
}

function getHeal(hero: IHero | IEnemy, value: number) {
  hero.HP += Math.min(hero.baseStats.maxHp - hero.HP, value);
}

// skills

function goCriticalDamage(value: number) {
  return value * MULTIPLIER_CRITICAL_DAMAGE;
}

function CheckForCrit(chance: number) {
  return chance >= getRandom(1, 100);
}

function CheckForEvade(chance: number) {
  return chance >= getRandom(1, 100);
}

function goCounterAttack(value: number) {
  return value * MULTIPLIER_COUNTER_ATTACK_DAMAGE;
}
function goEvadeDamage() {
  return 0;
}
