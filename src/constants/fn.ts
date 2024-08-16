import { IEnemy, enemyInfo, enemyName } from "@/types/enemy.types";
import { IHero, TypeSkillTrigger, attackInfo, attackOptions, heroSkills } from "../types/hero.types";
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
import { ALL_TEXT } from "./text";

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
export function incHeroAttackSpeed(this: IHero["buffs"], value: number, duration?: number) {
  if (!duration) {
    this._attackSpeed += value;
  } else {
    this._attackSpeed += value;
    setTimeout(() => {
      this._attackSpeed -= value;
    }, duration * 1000);
  }
}
export function getBuffDamage(this: IHero["buffs"]) {
  return this._damage / 100 + 1;
}
export function getBuffDef(this: IHero["buffs"]) {
  return (100 - this._def) / 100;
}
export function getBuffAttackSpeed(this: IHero["buffs"]) {
  return this._attackSpeed / 100 + 1;
}

function createTimeoutFreeze() {
  let timeoutId: any;

  return function startTimeout(hero: IHero | IEnemy, target: IHero | IEnemy, value: number, duration: number) {
    if (!target.status.isFreeze) {
      target.status.isFreeze = true;
      target.buffs.incAttackSpeed(-value);
    }
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      target.status.isFreeze = false;
      target.buffs.incAttackSpeed(value);
      console.log("мороз закончился");
    }, duration * 1000);
  };
}

function createTimeoutDot() {
  let timeoutId: any;
  let intervalId: any;

  return function startTimeout(hero: IHero | IEnemy, target: IHero | IEnemy, value: number, duration: number) {
    if (!target.status.isPoisoned) {
      target.status.isPoisoned = true;
    }
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    if (intervalId) {
      clearInterval(intervalId);
    }

    intervalId = setInterval(() => {
      if (target.status.death || hero.status.death) {
        target.status.isPoisoned = false;
        clearInterval(intervalId);
      } else {
        goDamage(target, value);
        console.log("dot damage", value);
      }
    }, 1000);

    timeoutId = setTimeout(() => {
      clearInterval(intervalId);
      target.status.isPoisoned = false;
      console.log("яд закончился");
    }, duration * 1000);
  };
}

export const goFreeze = createTimeoutFreeze();
export const goDotDmg = createTimeoutDot();

export function goStun(target: IHero | IEnemy, duration: number) {
  target.status.isStun = true;
  setTimeout(() => {
    target.status.isStun = false;
  }, duration * 1000);
}

export function goAttack(this: IHero | IEnemy, target: IHero | IEnemy, options?: attackOptions): attackInfo {
  const attackInfo = {
    type: this.type,
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
    console.log(`${this.name} оглушен`);
    return attackInfo;
  }

  if (checkForEvade(this.skills[3].data.chanceEvade) && !options?.isIgnoreAvade) {
    attackInfo.isEvade = true;
    console.log(`${this.name} промахнулся`);
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

  goDamage(target, attackInfo.damage);

  console.log(`Удар по ${target.name} на ${attackInfo.damage} урона, осталось ${target.HP} HP`);
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
    return getDamageAfterDef(damage, def);
  }
  let ignoreDef = options?.ignoreDef || 0;
  ignoreDef += hero.getters.getIgnoreDef();
  if (hero.buffs.nextAttack.ignoreDef) {
    ignoreDef += hero.buffs.nextAttack.ignoreDef;
    hero.buffs.nextAttack.ignoreDef = 0;
  }
  // console.log(ignoreDef, "%", "ignoreDef");
  return getDamageAfterDef(damage, def - getPercent(def, ignoreDef));
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

function clearText(mode: "full" | "one") {
  if (mode === "full") {
    ALL_TEXT.length = 0;
  } else {
    ALL_TEXT.length >= 10 && ALL_TEXT.shift();
  }
}

export function fight(hero: IHero, enemy: IHero | IEnemy) {
  clearText("full");
  // console.log(skillTrigger);
  skillTrigger.inBeginFight.map((fn) => fn.call(hero.skills, hero, enemy));
  attackHero();
  attackEnemy();
  function attackHero() {
    // clearText("one");

    setTimeout(() => {
      if (enemy.status.death) {
        console.log(hero.name, "win!");
        getReward(hero, enemy);
        return;
      } else {
        skillTrigger.beforeHeroAttack.map((fn) => fn.call(hero.skills, hero, enemy));

        if (!hero.status.death) {
          const attackInfo = hero.attack(enemy);
          if (!attackInfo.isStunned) {
            ALL_TEXT.push(attackInfo);
          }

          if (enemy.status.death) {
            console.log(hero.name, "win!");

            getReward(hero, enemy);
            return;
          }
          attackHero();
        }
        skillTrigger.afterHeroAttack.map((fn) => fn.call(hero.skills, hero, enemy));
      }
    }, 1000 / hero.getters.getAttackSpeed());
  }

  function attackEnemy() {
    // clearText("one");

    setTimeout(() => {
      if (hero.status.death) {
        console.log(enemy.name, "win!");
      } else {
        if (!enemy.status.death) {
          const attackInfo = enemy.attack(hero);
          if (!attackInfo.isStunned) {
            ALL_TEXT.push(attackInfo);
          }
          attackInfo.isEvade && skillTrigger.afterHeroAwade.map((fn) => fn.call(hero.skills, hero, enemy));

          attackEnemy();
        }

        skillTrigger.afterEnemyAttack.map((fn) => fn.call(hero.skills, hero, enemy));
      }
    }, 1000 / enemy.getters.getAttackSpeed());
  }
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
  const res: enemyName[] = [];
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

function pushEnemy(res: enemyName[], enemiesArr: enemyInfo[]) {
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
    this.update();
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
  return hero.status.isStun;
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
