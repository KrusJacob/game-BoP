import { ICharacter, heroGetters, heroSetters } from "@/types/hero.types";
import { ATTACK_SPD_FROM_1_AGILITY, MAX_HP_FROM_1_POWER, POWER_SKILL_FROM_1_INTELLECT } from "../setup";
import { incExp } from "../func/reward";

export function getters(this: ICharacter): heroGetters {
  const hero = this;
  return {
    getMaxHp: function () {
      return hero.baseStats.maxHp + hero.incStats.maxHp + hero.incStats.maxHpFromPower;
    },
    getPower: function () {
      return hero.baseStats.power + hero.incStats.power;
    },
    getAgility: function () {
      return hero.baseStats.agility + hero.incStats.agility;
    },
    getIntellect: function () {
      return hero.baseStats.intellect + hero.incStats.intellect;
    },
    getAttack: function () {
      return hero.baseStats.attack + hero.incStats.attack;
    },
    getDef: function () {
      return hero.baseStats.def + hero.incStats.def;
    },
    getMagicDef: function () {
      return hero.baseStats.magicDef + hero.incStats.magicDef;
    },
    getAttackSpeed: function () {
      return +(
        (hero.baseStats.attackSpeed + hero.incStats.attackSpeed + hero.incStats.attackSpeedFromAgility) *
        hero.buffs.getBuffAttackSpeed()
      ).toFixed(2);
    },
    getPowerSkill: function () {
      return hero.baseStats.powerSkill + hero.incStats.powerSkill + hero.incStats.powerSkillFromIntellect;
    },
    getIgnoreDef: function () {
      return hero.incStats.ignoreDef;
    },
  };
}

export function setters(this: ICharacter): heroSetters {
  const hero = this;
  return {
    incMaxHp: function (value: number) {
      hero.incStats.maxHp += value;
      hero.getHeal(value);
    },
    incPower: function (value: number) {
      hero.incStats.power += value;
      updateMainStats(hero, "power");
    },
    incAgility: function (value: number) {
      hero.incStats.agility += value;
      updateMainStats(hero, "agility");
    },
    incIntellect: function (value: number) {
      hero.incStats.intellect += value;
      updateMainStats(hero, "intellect");
    },
    incAttack: function (value: number) {
      hero.incStats.attack += value;
    },
    incDef: function (value: number) {
      hero.incStats.def += value;
    },
    incMagicDef: function (value: number) {
      hero.incStats.magicDef += value;
    },
    incAttackSpeed: function (value: number) {
      hero.incStats.attackSpeed += value;
    },
    incPowerSkill: function (value: number) {
      hero.incStats.powerSkill += value;
    },
    incChanceEvade: function (value: number) {
      hero.skills[3].data.chanceEvade += value;
    },
    incChanceCritDamage: function (value: number) {
      hero.skills[3].data.chanceCritDamage += value;
    },
    incIgnoreDef: function (value: number) {
      hero.incStats.ignoreDef += value;
    },
    incExp: incExp,
  };
}

export function updateMainStats(hero: ICharacter, stat: "power" | "agility" | "intellect" | "all") {
  switch (stat) {
    case "all": {
      updatePower(hero);
      updateAgility(hero);
      updateIntellect(hero);
      return;
    }
    case "power": {
      updatePower(hero);
      return;
    }
    case "agility": {
      updateAgility(hero);
      return;
    }
    case "intellect": {
      updateIntellect(hero);
      return;
    }
  }
}

function updatePower(hero: ICharacter) {
  const maxHpFromPower = Math.round(hero.getters.getPower() * MAX_HP_FROM_1_POWER);
  hero.incStats.maxHpFromPower = maxHpFromPower;
}
function updateAgility(hero: ICharacter) {
  const attackSpeedFromAgility = +(hero.getters.getAgility() * ATTACK_SPD_FROM_1_AGILITY).toFixed(2);
  hero.incStats.attackSpeedFromAgility = attackSpeedFromAgility;
}
function updateIntellect(hero: ICharacter) {
  const powerSkillFromIntellect = Math.round(hero.getters.getIntellect() * POWER_SKILL_FROM_1_INTELLECT);
  hero.incStats.powerSkillFromIntellect = powerSkillFromIntellect;
}
