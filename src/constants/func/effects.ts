import { IAttackInfo, ICharacter, TypeSkillTrigger } from "@/types/hero.types";
import { getPercent } from "@/utils/getPercent";
import { goDamage } from "./fight";
import { STUN_COOLDOWN_SEC } from "../setup";
import { checkForStun } from "./checks";
import { battleText } from "../text/battleText";
import { magicalDamageAction } from "./damageAction";
import { skillHeroTrigger } from "../skill/heroes";
import { skillEnemyTrigger } from "../skill/enemy";

function createTimeoutHeal() {
  return function startTimeout(
    hero: ICharacter,
    target: ICharacter,
    healValue: number,
    healPercent: number,
    tick = 1,
    duration = 999
  ) {
    let intervalId = setInterval(() => {
      if (target.status.death || hero.status.death) {
        clearInterval(intervalId);
      } else {
        const heal = healValue + getPercent(hero.getters.getMaxHp(), healPercent);
        console.log("heal-tick", hero.getHeal(heal));
      }
    }, tick * 1000);

    setTimeout(() => {
      clearInterval(intervalId);
      console.log("heal-tick закончился");
    }, duration * 1000);
  };
}

function createTimeoutFreeze() {
  let timeoutId: any;

  return function startTimeout(target: ICharacter, value: number, duration: number) {
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
function createTimeoutDarkCurse() {
  return function startTimeout(target: ICharacter, stack = 1, duration: number) {
    target.status.darkСurse.stack += stack;

    setTimeout(() => {
      target.status.darkСurse.stack -= stack;
      console.log("Темное проклятие закончились");
    }, duration * 1000);
  };
}

function createTimeoutDot(type: "posion" | "bleed") {
  const statusType = type === "posion" ? "isPoisoned" : "isBleeded";
  let timeoutId: any;
  let intervalId: any;

  return function startTimeout(hero: ICharacter, target: ICharacter, value: number, duration: number) {
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
      console.log("дот закончился");
    }, duration * 1000);
  };
}

export function goStunEffect(target: ICharacter, duration: number) {
  target.status.stun.isStun = true;
  setTimeout(() => {
    target.status.stun.isStun = false;
  }, duration * 1000);
}

export function goStunCooldown(target: ICharacter) {
  target.status.stun.isCooldown = true;
  setTimeout(() => {
    target.status.stun.isCooldown = false;
  }, STUN_COOLDOWN_SEC * 1000);
}

export function goEvade(attackInfo: IAttackInfo) {
  attackInfo.isMiss = true;
  battleText.pushTextBattle(attackInfo);
  return attackInfo;
}

export function goStun(target: ICharacter, duration: number) {
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

export function goSkillTrigger(trigger: keyof TypeSkillTrigger, initiator: ICharacter, target: ICharacter) {
  if (initiator.type === "hero") {
    skillHeroTrigger[trigger].map((fn) => fn.call(initiator.skills, initiator, target));
  } else {
    skillEnemyTrigger[trigger].map((fn) => fn.call(initiator.skills, initiator, target));
  }
}

export const goFreeze = createTimeoutFreeze();
export const goDarkCurse = createTimeoutDarkCurse();
export const goPosionDmg = createTimeoutDot("posion");
export const goBleedDmg = createTimeoutDot("bleed");
export const goHealTick = createTimeoutHeal();
