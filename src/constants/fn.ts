import { IEnemy, enemyType } from "@/types/enemy.types";
import { IHero, heroLevel } from "../types/hero.types";
import { getRandom } from "@/utils/getRandom";
import { EnemyClass } from "./class";
import { ENEMIES_TO_WAY } from "./enemy";

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
  const calcAttack = this.baseStats.attack * this.buffs.getBuffDamage();
  const potentialAttack = calcAttack * target.buffs.getBuffDef();
  const result = (potentialAttack - target.baseStats.def) * target.buffs.getBuffDef();

  if (target.barrier) {
    damageToBarrier(target, result);
  } else {
    damageToHP(target, result);
  }
  fn(target);

  console.log(`Удар по ${target.type} на ${result} урона, осталось ${target.HP} HP`);
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
    if (enemy.HP <= 0) {
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
    if (hero.HP <= 0) {
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
    hero.HP += 200;
  }
}

let minEnemy = 1;
let maxEnemy = 2;

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

function incСomplexity() {
  minEnemy += 0.7;
  maxEnemy += 0.8;
}
