import { IEnemy } from "@/types/enemy.types";
import { IHero, attackOptions, IAttackInfo } from "@/types/hero.types";
import { battleText } from "../text";
import { getPercent } from "@/utils/getPercent";
import { getRandom } from "@/utils/getRandom";
import { MULTIPLIER_CRITICAL_DAMAGE, STUN_COOLDOWN_SEC } from "../setup";
import { getReward } from "./reward";
import { goSkillTrigger } from "../skill";
import { skillEnemyTrigger } from "../skill/enemy";
import { skillHeroTrigger } from "../skill/heroes";

export function fight(hero: IHero, enemy: IHero | IEnemy) {
  // clearText();
  console.log(skillHeroTrigger);
  goSkillTrigger("inBeginFight", hero, enemy);
  attackHero();
  attackEnemy();

  function attackHero() {
    setTimeout(() => {
      if (enemy.status.death) {
        console.log(hero.name, "win!");
        getReward(hero, enemy);
        return;
      } else {
        goSkillTrigger("beforeInitiatorAttack", hero, enemy);

        if (!hero.status.death) {
          const attackInfo = hero.attack(enemy);

          attackInfo.isCritical && goSkillTrigger("afterInitiatorCrit", hero, enemy);

          if (enemy.status.death) {
            console.log(hero.name, "win!");

            getReward(hero, enemy);
            return;
          }
          attackHero();
          if (!attackInfo.isStunned && !attackInfo.isMiss) {
            goSkillTrigger("afterInitiatorAttack", hero, enemy);
          }
        }
      }
    }, 1000 / hero.getters.getAttackSpeed());
  }

  function attackEnemy() {
    setTimeout(() => {
      if (hero.status.death) {
        console.log(enemy.name, "win!");
      } else {
        goSkillTrigger("beforeInitiatorAttack", enemy, hero);
        if (!enemy.status.death) {
          const attackInfo = enemy.attack(hero);

          attackInfo.isCritical && goSkillTrigger("afterTargetCrit", hero, enemy);
          attackInfo.isMiss && goSkillTrigger("afterTargetMiss", hero, enemy);
          attackEnemy();
          if (!attackInfo.isStunned && !attackInfo.isMiss) {
            goSkillTrigger("afterInitiatorAttack", enemy, hero);
            goSkillTrigger("afterTargetAttack", hero, enemy);
          }
        }
      }
    }, 1000 / enemy.getters.getAttackSpeed());
  }
}

function getEnergy(hero: IHero | IEnemy) {
  hero.energy.value += hero.energy.incValue;
  if (hero.energy.value > hero.energy.max) {
    hero.energy.value = hero.energy.max;
  }
}

export function goAttack(this: IHero | IEnemy, target: IHero | IEnemy, options?: attackOptions): IAttackInfo {
  const attackInfo = {
    initiatorType: this.type,
    damage: physicalDamageAction(0),
    isMiss: false,
    isCritical: false,
    isStunned: false,
  } as IAttackInfo;

  if (this.status.death) {
    return attackInfo;
  }

  if (checkForStun(this)) {
    attackInfo.isStunned = true;
    return attackInfo;
  }

  if (checkForEvade(target.skills[3].data.chanceEvade) && !options?.isIgnoreAvade) {
    attackInfo.isMiss = true;
    console.log(`${this.name} промахнулся`);

    battleText.pushTextBattle(attackInfo);

    return attackInfo;
  }

  attackInfo.damage.value = getDamageWithBuffs(this);
  attackInfo.damage.value = getDamageWithOptions(attackInfo.damage.value, options);
  if (checkForCrit(this.skills[3].data.chanceCritDamage)) {
    attackInfo.isCritical = true;
    attackInfo.damage.value = goCriticalDamage(attackInfo.damage.value);
  }

  attackInfo.damage.value = goDamage(this, target, attackInfo.damage, options);
  getEnergy(this);

  console.log(`Удар по ${target.name} на ${attackInfo.damage.value} урона, осталось ${target.HP} HP`);

  if (!attackInfo.isStunned) {
    battleText.pushTextBattle(attackInfo);
  }
  return attackInfo;
}

function getDamageWithReduction(target: IHero | IEnemy, value: number) {
  return Math.floor(value * target.buffs.getBuffDef());
}

export function physicalDamageAction(value: number): IAttackInfo["damage"] {
  return {
    type: "physical",
    value,
  };
}
export function magicalDamageAction(value: number): IAttackInfo["damage"] {
  return {
    type: "magical",
    value,
  };
}
export function pureDamageAction(value: number): IAttackInfo["damage"] {
  return {
    type: "pure",
    value,
  };
}

export function goDamage(
  initiator: IHero | IEnemy,
  target: IHero | IEnemy,
  damageInfo: IAttackInfo["damage"],
  options?: attackOptions
) {
  let damageValue = 0;

  switch (damageInfo.type) {
    case "physical":
      damageValue = getPhysicalDamage(initiator, target, damageInfo.value, options);
      damageValue = getDamageWithReduction(target, damageValue);
      break;
    case "magical":
      damageValue = getMagicalDamage(target, damageInfo.value);
      damageValue = getDamageWithReduction(target, damageValue);
      break;
    case "pure":
      damageValue = getPureDamage(target, damageInfo.value);
      break;
    default:
      damageValue = 0;
  }

  if (target.barrier) {
    damageToBarrier(target, damageValue);
  } else {
    damageToHP(target, damageValue);
  }
  target.update();
  return damageValue;
}

function getPhysicalDamage(
  initiator: IHero | IEnemy,
  target: IHero | IEnemy,
  value: number,
  options?: attackOptions
) {
  const damage = getDamageWithDef(initiator, value, target.getters.getDef(), options);
  return damage;
}

function getMagicalDamage(target: IHero | IEnemy, value: number) {
  const damage = getDamageWithMagicDef(value, target.getters.getMagicDef());
  return damage;
}
function getPureDamage(target: IHero | IEnemy, value: number) {
  return value;
}

function getDamageWithOptions(damage: number, options?: attackOptions) {
  if (!options) {
    return damage;
  }
  return Math.floor(damage * (options.modifier ? options.modifier : 1));
}

function getDamageWithBuffs(attacker: IHero | IEnemy) {
  return attacker.getters.getAttack() * attacker.buffs.getBuffDamage();
}

function getDamageWithMagicDef(damage: number, magicDef: number, hero?: IHero | IEnemy, options?: attackOptions) {
  return getPercent(damage, 100 - magicDef);
}

function getDamageWithDef(hero: IHero | IEnemy, damage: number, def: number, options?: attackOptions) {
  if (!options?.ignoreDef && !hero.buffs.nextAttack.ignoreDef && hero.getters.getIgnoreDef() === 0) {
    return getDamageAfterDef(damage, def);
  }
  let ignoreDef = options?.ignoreDef || 0;
  ignoreDef += hero.getters.getIgnoreDef();
  if (hero.buffs.nextAttack.ignoreDef) {
    ignoreDef += hero.buffs.nextAttack.ignoreDef;
    hero.buffs.nextAttack.ignoreDef = 0;
  }
  console.log(ignoreDef, "%", "ignoreDef");
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
        const posionValue = goDamage(hero, target, magicalDamageAction(value));
        console.log("dot damage", posionValue);
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
  if (!checkForStun(target)) {
    goStunCooldown(target);
    goStunEffect(target, duration);

    battleText.pushTextBattle({
      damage: {
        type: "physical",
        value: 0,
      },
      isStunned: true,
      initiatorType: target.type,
    });
  }
}

function goStunEffect(target: IHero | IEnemy, duration: number) {
  target.status.stun.isStun = true;
  setTimeout(() => {
    target.status.stun.isStun = false;
  }, duration * 1000);
}

function goStunCooldown(target: IHero | IEnemy) {
  target.status.stun.isCooldown = true;
  setTimeout(() => {
    target.status.stun.isCooldown = false;
  }, STUN_COOLDOWN_SEC * 1000);
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
  return hero.status.stun.isStun;
}
