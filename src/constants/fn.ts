import { IEnemy, enemyInfo, enemyType } from "@/types/enemy.types";
import { IHero, TypeSkillTrigger, attackInfo, attackOptions, heroLevel, heroSkills } from "../types/hero.types";
import { getRandom } from "@/utils/getRandom";
import { EnemyClass } from "./class";
import {
  incСomplexityLocation,
  HP_REST,
  HP_REST_PERCENT,
  MULTIPLIER_CRITICAL_DAMAGE,
  CHANCE_TO_LEGEND_ENEMY,
  COMLEXITY_LOCATIONS,
  PARAMETER_POINT_LEVEL,
} from "./setup";
import { getPercent } from "@/utils/getPercent";
import { locationItem } from "@/types/location.types";
import { getEnemiesLocations } from "./location";
import { getTalent } from "./talent";

export function incExp(this: IHero, exp = 0) {
  if (this.level.exp + exp >= this.level.expToNextLevel) {
    incLevel.call(this);
    const remains = exp - this.level.expToNextLevel;
    this.level.expToNextLevel = setMaxLevelExp(this.level.expToNextLevel);
    this.level.incExp.call(this, remains);
  } else {
    this.level.exp += exp;
  }
}

function incLevel(this: IHero) {
  this.level.value += 1;
  this.resources.parameterPoints += PARAMETER_POINT_LEVEL;
  getTalent(this);
}

export function setMaxLevelExp(exp: number) {
  return Math.round(exp * 1.1 + 20);
}

export function incHeroDamage(this: IHero["buffs"], value: number, duration?: number) {
  if (!duration) {
    this._damage += value;
  } else {
    this._damage += value;
    setTimeout(() => {
      this._damage -= value;
    }, duration * 1000);
  }
}
export function incHeroDef(this: IHero["buffs"], value: number, duration?: number) {
  if (!duration) {
    this._def += value;
  } else {
    this._def += value;
    setTimeout(() => {
      this._def -= value;
    }, duration * 1000);
  }
}
export function getBuffDamage(this: IHero["buffs"]) {
  return this._damage / 100 + 1;
}
export function getBuffDef(this: IHero["buffs"]) {
  return (100 - this._def) / 100;
}

export function goDotDmg(target: IHero | IEnemy, value: number, duration: number) {
  setTimeout(() => {
    setTimeout(() => {
      clearInterval(dotDmg);
    }, duration * 1000);
    const dotDmg = setInterval(() => {
      if (target.status.death) {
        clearInterval(dotDmg);
      } else {
        goDamage(target, value);
        console.log("dot damage", value);
      }
    }, 1000);
  }, 300);
}

export function goAttack(this: IHero | IEnemy, target: IHero | IEnemy, options?: attackOptions): attackInfo {
  const attackInfo = {
    damage: 0,
    isEvade: false,
    isCritical: false,
    isStunned: false,
  };

  if (this.status.death) {
    return attackInfo;
  }

  if (checkForStun(this)) {
    attackInfo.isStunned = true;
    this.status.stun -= 1;
    return attackInfo;
  }

  if (checkForEvade(this.skills[3].data.chanceEvade) && !options?.isIgnoreAvade) {
    attackInfo.isEvade = true;
    console.log(`${this.type} промахнулся`);
    return attackInfo;
  }

  attackInfo.damage = getDamageWithBuffs(this);
  attackInfo.damage = calcDamageWithOptions(attackInfo.damage, options);
  if (checkForCrit(this.skills[3].data.chanceCritDamage)) {
    attackInfo.isCritical = true;
    attackInfo.damage = goCriticalDamage(attackInfo.damage);
  }
  attackInfo.damage = calcDamageWithDef(attackInfo.damage, target.getters.getDef(), this, options);
  attackInfo.damage = attackInfo.damage * target.buffs.getBuffDef();

  // if (target.barrier) {
  //   damageToBarrier(target, attackInfo.damage);
  // } else {
  //   damageToHP(target, attackInfo.damage);
  // }
  // target.update();
  goDamage(target, attackInfo.damage);

  console.log(`Удар по ${target.type} на ${attackInfo.damage} урона, осталось ${target.HP} HP`);
  return attackInfo;
}

function goDamage(target: IHero | IEnemy, value: number) {
  if (target.barrier) {
    damageToBarrier(target, value);
  } else {
    damageToHP(target, value);
  }
  target.update();
}

function calcDamageWithOptions(damage: number, options?: attackOptions) {
  if (!options) {
    return damage;
  }
  return Math.floor(damage * (options.modifier ? options.modifier : 1));
}

function getDamageWithBuffs(attacker: IHero | IEnemy) {
  return attacker.getters.getAttack() * attacker.buffs.getBuffDamage();
}

function calcDamageWithDef(damage: number, def: number, hero: IHero | IEnemy, options?: attackOptions) {
  if (!options?.ignoreDef && !hero.buffs.nextAttack.ignoreDef && hero.getters.getIgnoreDef() === 0) {
    return Math.floor(damage - def);
  }
  let ignoreDef = options?.ignoreDef || 0;
  ignoreDef += hero.getters.getIgnoreDef();
  if (hero.buffs.nextAttack.ignoreDef) {
    ignoreDef += hero.buffs.nextAttack.ignoreDef;
    hero.buffs.nextAttack.ignoreDef = 0;
  }
  console.log(ignoreDef, "%", "ignoreDef");
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

      if (!hero.status.death) {
        const attackInfo = hero.attack(enemy);
      }

      skillTrigger.afterHeroAttack.map((fn) => fn.call(hero.skills, hero, enemy));
    }
  }, 1000 / hero.getters.getAttackSpeed());
  const tickEnemy = setInterval(() => {
    if (hero.status.death) {
      clearInterval(tickHero);
      clearInterval(tickEnemy);
      console.log(enemy.type, "win!");
    } else {
      if (!enemy.status.death) {
        const attackInfo = enemy.attack(hero);
        attackInfo.isEvade && skillTrigger.afterHeroAwade.map((fn) => fn.call(hero.skills, hero, enemy));
      }

      skillTrigger.afterEnemyAttack.map((fn) => fn.call(hero.skills, hero, enemy));
    }
  }, 1000 / enemy.getters.getAttackSpeed());
}

export function getReward(hero: IHero, enemy: IEnemy | IHero) {
  if (enemy instanceof EnemyClass) {
    hero.resources.gold += enemy.resources.gold;
    hero.setters.incExp.call(hero, enemy.resources.exp);
    hero.resources.skillPoints += enemy.resources.skillPoints;
    restHero(hero);
  }
}

function getComlexityEnemies(location: locationItem["name"]) {
  return Math.floor(COMLEXITY_LOCATIONS[location].comlexity);
}

export function searchEnemy(location: locationItem["name"]) {
  // const res: enemyType[] = [];
  // const arrEnemies = getEnemiesLocations(location);
  // const comlexity = getMinMaxEnemies(location);
  // const chanceToLegend = getRandom(0, 100);
  // let enemiesInComlexity = arrEnemies[comlexity].enemies;
  // if (chanceToLegend <= CHANCE_TO_LEGEND_ENEMY && arrEnemies[comlexity].legendEnemies.length) {
  //   pushEnemy(res, arrEnemies[comlexity].legendEnemies);
  //   pushEnemy(res, enemiesInComlexity);
  // } else {
  //   pushEnemy(res, enemiesInComlexity);
  //   pushEnemy(res, enemiesInComlexity);
  // }
  // incСomplexityLocation(location);
  // return res;
  const res: enemyType[] = [];
  const arrEnemies = getEnemiesLocations(location);
  const comlexity = getComlexityEnemies(location);
  const chanceToLegend = getRandom(0, 100);
  let enemiesInComlexity = arrEnemies.enemies[comlexity];
  if (chanceToLegend <= CHANCE_TO_LEGEND_ENEMY && arrEnemies.legendEnemies.length) {
    pushEnemy(res, arrEnemies.legendEnemies);
    pushEnemy(res, enemiesInComlexity);
  } else {
    pushEnemy(res, enemiesInComlexity);
    pushEnemy(res, enemiesInComlexity);
  }
  incСomplexityLocation(location);
  return res;
}

function pushEnemy(res: enemyType[], enemiesArr: enemyInfo[]) {
  const enemyId = getRandom(0, enemiesArr.length - 1);
  if (res[0] === enemiesArr[enemyId].name) {
    res.push(enemiesArr[Math.abs(enemyId - 1)].name);
  } else {
    res.push(enemiesArr[enemyId].name);
  }

  if (enemiesArr[enemyId].unique) {
    enemiesArr.splice(enemyId, 1);
  }
}

export function getBarrier(this: IHero | IEnemy, value: number) {
  console.log("getBarrier");
  const barrierValue = Math.min(value, this.getters.getMaxHp() - this.barrier);
  this.barrier += barrierValue;

  if (this.barrier < 0) {
    this.barrier = 0;
  }
}

function restHero(hero: IHero) {
  const healValue = Math.round(hero.getters.getMaxHp() * (HP_REST_PERCENT / 100) + HP_REST);

  hero.getHeal(healValue);
}

export function getHeal(this: IHero | IEnemy, value: number) {
  if (!this.status.death) {
    this.HP += Math.min(this.getters.getMaxHp() - this.HP, value);
  }
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
