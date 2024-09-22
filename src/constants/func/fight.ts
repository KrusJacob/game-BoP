import { IEnemy } from "@/types/enemy.types";
import { IHero, attackOptions, attackInfo } from "@/types/hero.types";

import { ALL_TEXT } from "../text";
import { getPercent } from "@/utils/getPercent";
import { getRandom } from "@/utils/getRandom";
import { MULTIPLIER_CRITICAL_DAMAGE } from "../setup";
import { getReward } from "./reward";
import { skillTrigger } from "../skill";

export function fight(hero: IHero, enemy: IHero | IEnemy) {
  clearText("full");
  console.log(skillTrigger);
  skillTrigger.inBeginFight.map((fn) => fn.call(hero.skills, hero, enemy));
  attackHero();
  attackEnemy();
  function attackHero() {
    setTimeout(() => {
      if (enemy.status.death) {
        console.log(hero.name, "win!");
        getReward(hero, enemy);
        return;
      } else {
        skillTrigger.beforeHeroAttack.map((fn) => fn.call(hero.skills, hero, enemy));

        if (!hero.status.death) {
          const attackInfo = hero.attack(enemy);
          attackInfo.isCritical && skillTrigger.afterHeroCrit.map((fn) => fn.call(hero.skills, hero, enemy));
          // if (!attackInfo.isStunned) {
          //   ALL_TEXT.push(attackInfo);
          // }

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
    setTimeout(() => {
      if (hero.status.death) {
        console.log(enemy.name, "win!");
      } else {
        if (!enemy.status.death) {
          const attackInfo = enemy.attack(hero);
          // if (!attackInfo.isStunned) {
          //   ALL_TEXT.push(attackInfo);
          // }
          attackInfo.isCritical && skillTrigger.afterEnemyCrit.map((fn) => fn.call(hero.skills, hero, enemy));
          attackInfo.isEvade && skillTrigger.afterHeroAwade.map((fn) => fn.call(hero.skills, hero, enemy));

          attackEnemy();
        }

        skillTrigger.afterEnemyAttack.map((fn) => fn.call(hero.skills, hero, enemy));
      }
    }, 1000 / enemy.getters.getAttackSpeed());
  }
}

function clearText(mode: "full" | "one") {
  if (mode === "full") {
    ALL_TEXT.length = 0;
  } else {
    ALL_TEXT.length >= 10 && ALL_TEXT.shift();
  }
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
    return attackInfo;
  }

  if (checkForEvade(this.skills[3].data.chanceEvade) && !options?.isIgnoreAvade) {
    attackInfo.isEvade = true;
    console.log(`${this.name} промахнулся`);
    ALL_TEXT.push(attackInfo);
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

  if (!attackInfo.isStunned) {
    ALL_TEXT.push(attackInfo);
  }
  return attackInfo;
}

export function goDamage(target: IHero | IEnemy, value: number) {
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

function createTimeoutFreeze() {
  let timeoutId: any;

  return function startTimeout(target: IHero | IEnemy, value: number, duration: number) {
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

function createTimeoutDot(type: "posion" | "bleed") {
  const statusType = type === "posion" ? "isPoisoned" : "isBleeded";
  let timeoutId: any;
  let intervalId: any;

  return function startTimeout(hero: IHero | IEnemy, target: IHero | IEnemy, value: number, duration: number) {
    if (!target.status[statusType]) {
      target.status[statusType] = true;
    }
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    if (intervalId) {
      clearInterval(intervalId);
    }

    intervalId = setInterval(() => {
      if (target.status.death || hero.status.death) {
        target.status[statusType] = false;
        clearInterval(intervalId);
      } else {
        goDamage(target, value);
        console.log("dot damage", value);
      }
    }, 1000);

    timeoutId = setTimeout(() => {
      clearInterval(intervalId);
      target.status[statusType] = false;
      // target.update();
      console.log("дот закончился");
    }, duration * 1000);
  };
}

export const goFreeze = createTimeoutFreeze();
export const goPosionDmg = createTimeoutDot("posion");
export const goBleedDmg = createTimeoutDot("bleed");

export function goStun(target: IHero | IEnemy, duration: number) {
  target.status.isStun = true;
  ALL_TEXT.push({
    damage: 0,
    isCritical: false,
    isEvade: false,
    isStunned: true,
    type: target.type,
  });
  setTimeout(() => {
    target.status.isStun = false;
  }, duration * 1000);
}

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
