import { IEnemy, enemyType } from "@/types/enemy.types";
import { IHero, TypeSkillTrigger, attackInfo, attackOptions, heroLevel, heroSkills } from "../types/hero.types";
import { getRandom } from "@/utils/getRandom";
import { EnemyClass } from "./class";
import { maxEnemy, minEnemy, incСomplexity, HP_REST, HP_REST_PERCENT, MULTIPLIER_CRITICAL_DAMAGE } from "./setup";
import { getPercent } from "@/utils/getPercent";
import { locationItem } from "@/types/location.types";
import { getEnemiesLocations } from "./location";

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

export function goAttack(this: IHero | IEnemy, target: IHero | IEnemy, options?: attackOptions): attackInfo {
  const attackInfo = {
    damage: 0,
    isEvade: false,
    isCritical: false,
    isStunned: false,
  };

  if (checkForStun(this)) {
    attackInfo.isStunned = true;
    this.status.stun -= 1;
    return attackInfo;
  }

  if (checkForEvade(this.skills[3].value.chanceEvade) && !options?.isIgnoreAvade) {
    attackInfo.isEvade = true;
    console.log(`${this.type} промахнулся`);
    return attackInfo;
  }

  attackInfo.damage = getDamageWithBuffs(this);
  attackInfo.damage = calcDamageWithOptions(attackInfo.damage, options);
  if (checkForCrit(this.skills[3].value.chanceCritDamage)) {
    attackInfo.isCritical = true;
    attackInfo.damage = goCriticalDamage(attackInfo.damage);
  }
  attackInfo.damage = calcDamageWithDef(attackInfo.damage, target.baseStats.def, this, options);
  attackInfo.damage = attackInfo.damage * target.buffs.getBuffDef();

  if (target.barrier) {
    damageToBarrier(target, attackInfo.damage);
  } else {
    damageToHP(target, attackInfo.damage);
  }
  target.update();

  console.log(`Удар по ${target.type} на ${attackInfo.damage} урона, осталось ${target.HP} HP`);
  return attackInfo;
}

function calcDamageWithOptions(damage: number, options?: attackOptions) {
  if (!options) {
    return damage;
  }
  return Math.floor(damage * (options.modifier ? options.modifier : 1));
}

function getDamageWithBuffs(attacker: IHero | IEnemy) {
  return attacker.baseStats.attack * attacker.buffs.getBuffDamage();
}

function calcDamageWithDef(damage: number, def: number, hero: IHero | IEnemy, options?: attackOptions) {
  if (!options?.ignoreDef && !hero.buffs.nextAttack.ignoreDef) {
    return Math.floor(damage - def);
  }
  let ignoreDef = options?.ignoreDef || 0;
  if (hero.buffs.nextAttack.ignoreDef) {
    ignoreDef += hero.buffs.nextAttack.ignoreDef;
    hero.buffs.nextAttack.ignoreDef = 0;
  }
  console.log(ignoreDef, "ignoreDef");
  return Math.floor(damage - (def - getPercent(def, ignoreDef)));
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

export function fight(hero: IHero, enemy: IHero | IEnemy) {
  console.log(skillTrigger);
  skillTrigger.inBeginFight.map((fn) => fn.call(hero.skills, hero, enemy));
  const tickHero = setInterval(() => {
    if (enemy.status.death) {
      clearInterval(tickHero);
      clearInterval(tickEnemy);
      console.log(hero.type, "win!");
      getReward(hero, enemy);
      hero.update();
    } else {
      skillTrigger.beforeHeroAttack.map((fn) => fn.call(hero.skills, hero, enemy));

      !hero.status.death && hero.attack(enemy);

      skillTrigger.afterHeroAttack.map((fn) => fn.call(hero.skills, hero, enemy));
    }
  }, 1000 / hero.baseStats.attackSpeed);
  const tickEnemy = setInterval(() => {
    if (hero.status.death) {
      clearInterval(tickHero);
      clearInterval(tickEnemy);
      console.log(enemy.type, "win!");
    } else {
      !enemy.status.death && enemy.attack(hero);

      skillTrigger.afterEnemyAttack.map((fn) => fn.call(hero.skills, hero, enemy));
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

export function searchEnemy(location: locationItem["name"]) {
  const arrEnemies = getEnemiesLocations(location);
  console.log(arrEnemies);
  // const arrEnemies = [...arr];
  const res: enemyType[] = [];

  for (let i = 1; i <= 2; i++) {
    const enemyId = getRandom(Math.min(minEnemy, arrEnemies.length - 1), Math.min(maxEnemy, arrEnemies.length));
    res.push(arrEnemies.splice(enemyId - 1, 1).join("") as enemyType);
  }
  console.log(res);
  incСomplexity();
  return res;
}

export function getBarrier(this: IHero | IEnemy, value: number) {
  this.barrier += Math.min(value, this.baseStats.maxHp);
}

function restHero(hero: IHero) {
  const healValue = Math.round(hero.baseStats.maxHp * (HP_REST_PERCENT / 100) + HP_REST);
  hero.getHeal(healValue);
}

export function getHeal(this: IHero | IEnemy, value: number) {
  this.HP += Math.min(this.baseStats.maxHp - this.HP, value);
}

// skills

function goCriticalDamage(value: number) {
  return value * MULTIPLIER_CRITICAL_DAMAGE;
}

function checkForCrit(chance: number) {
  return chance >= getRandom(1, 100);
}

function checkForEvade(chance: number) {
  return chance >= getRandom(1, 100);
}

function checkForStun(hero: IHero | IEnemy) {
  return Boolean(hero.status.stun);
}

export const skillTrigger: TypeSkillTrigger = {
  active: [],
  inBeginFight: [],
  beforeHeroAttack: [],
  afterHeroAttack: [],
  beforeEnemyAttack: [],
  afterEnemyAttack: [],
  afterHeroAwade: [],
  afterEnemyAwade: [],
  afterHeroCrit: [],
  afterEnemyCrit: [],
};

export function registerSkill(fn: Function, trigger: keyof TypeSkillTrigger) {
  skillTrigger[trigger].push(fn);
}

export function registerAllSkills(skillsArr: heroSkills[]) {
  skillsArr.filter((item) => item.trigger).map((skill) => registerSkill(skill.fn!, skill.trigger!));
}
