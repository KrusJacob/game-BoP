import { IHero, attackOptions, IAttackInfo, ICharacter } from "@/types/hero.types";
import { battleText } from "../text/battleText";
import { getReward } from "./reward";
import { checkForCrit, checkForDeath, checkForEvade, checkForStun } from "./checks";
import { goEvade, goSkillTrigger } from "./effects";
import {
  getCriticalDamage,
  getDamageWithBuffs,
  getDamageWithOptions,
  getEnergy,
  getMagicalDamage,
  getPhysicalDamage,
  getPureDamage,
} from "./getters";
import { physicalDamageAction } from "./damageAction";

export function fight(hero: IHero, enemy: ICharacter) {
  // console.log(skillHeroTrigger);
  goSkillTrigger("inBeginFight", hero, enemy);
  goSkillTrigger("inBeginFight", enemy, hero);
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

        if (!checkForDeath(hero)) {
          const attackInfo = hero.attack(enemy);

          attackInfo.isCritical && goSkillTrigger("afterInitiatorCrit", hero, enemy);

          if (checkForDeath(enemy)) {
            getReward(hero, enemy);
            goSkillTrigger("inEndFight", hero, enemy);
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
      if (checkForDeath(hero)) {
        console.log(enemy.name, "win!");
        return;
      } else {
        goSkillTrigger("beforeInitiatorAttack", enemy, hero);
        if (!checkForDeath(enemy)) {
          const attackInfo = enemy.attack(hero);

          if (attackInfo.isCritical) {
            goSkillTrigger("afterTargetCrit", hero, enemy);
            goSkillTrigger("afterInitiatorCrit", enemy, hero);
          }

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

export function goAttack(this: ICharacter, target: ICharacter, options?: attackOptions): IAttackInfo {
  const attackInfo = {
    initiatorType: this.type,
    damage: physicalDamageAction(0),
    isMiss: false,
    isCritical: false,
    isStunned: false,
  } as IAttackInfo;

  if (checkForDeath(this)) {
    return attackInfo;
  }

  if (checkForStun(this)) {
    attackInfo.isStunned = true;
    return attackInfo;
  }

  if (checkForEvade(target.skills[3].data.chanceEvade) && !options?.isIgnoreAvade) {
    console.log(`${this.name} промахнулся`);
    return goEvade(attackInfo);
  }

  attackInfo.damage.value = getDamageWithBuffs(this);
  attackInfo.damage.value = getDamageWithOptions(attackInfo.damage.value, options);
  if (checkForCrit(this.skills[3].data.chanceCritDamage)) {
    attackInfo.isCritical = true;
    attackInfo.damage.value = getCriticalDamage(attackInfo.damage.value);
  }

  attackInfo.damage.value = goDamage(this, target, attackInfo.damage, options);
  getEnergy(this);

  console.log(`Удар по ${target.name} на ${attackInfo.damage.value} урона, осталось ${target.HP} HP`);

  if (!attackInfo.isStunned) {
    battleText.pushTextBattle(attackInfo);
  }
  return attackInfo;
}

export function goDamage(
  initiator: ICharacter,
  target: ICharacter,
  damageInfo: IAttackInfo["damage"],
  options?: attackOptions
) {
  let damageValue = 0;

  switch (damageInfo.type) {
    case "physical":
      damageValue = getPhysicalDamage(initiator, target, damageInfo.value, options);
      break;
    case "magical":
      damageValue = getMagicalDamage(target, damageInfo.value);
      break;
    case "pure":
      damageValue = getPureDamage(target, damageInfo.value);
      break;
    case "sacrifice":
      damageValue = damageInfo.value;
      break;
    default:
      damageValue = 0;
  }

  if (target.barrier && damageInfo.type !== "sacrifice") {
    damageToBarrier(target, damageValue);
  } else {
    damageToHP(target, damageValue);
  }
  target.update();
  return damageValue;
}

export function damageToBarrier(target: ICharacter, dmg: number) {
  if (target.barrier - dmg <= 0) {
    target.barrier = 0;
  } else {
    target.barrier -= dmg;
  }
}

export function damageToHP(target: ICharacter, dmg: number) {
  if (target.HP - dmg <= 0) {
    target.HP = 0;
    target.status.death = true;
  } else {
    target.HP -= dmg;
  }
}
