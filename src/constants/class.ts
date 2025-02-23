import {
  IEnemy,
  enemyName,
  enemyBaseStats,
  enemyBuffs,
  enemySkills,
  enemyResources,
  enemyGetters,
  enemySetters,
} from "@/types/enemy.types";
import {
  IHero,
  heroName,
  heroBaseStats,
  heroBuffs,
  heroSkills,
  heroIncStats,
  heroGetters,
  heroSetters,
  heroType,
  heroBoost,
  heroEnergy,
} from "@/types/hero.types";
import { getBarrier, getHeal } from "./fn";
import {
  getStatsToEnemy,
  getSkillsToEnemy,
  getResourcesToEnemy,
  getStatsToHero,
  getSkillsToHero,
  getIncStatsToHero,
  getBuffsToHero,
  getStatusToHero,
  getStatisticsToHero,
} from "./initStats";
import { updateMainStats } from "./attributes";
import { ACTIVE_BAG_PANEL, ALL_BAG_ITEMS } from "./bag";
import {
  MAX_ENERGY_VALUE,
  START_GOLD_HERO,
  START_HERO_LEVEL,
  START_PARAMETERPOINT,
  START_SKILLPOINT,
} from "./setup";
import { goAttack } from "./func/fight";
import { incExp } from "./func/reward";

export class EnemyClass implements IEnemy {
  constructor(name: enemyName, level = 1) {
    this.type = "enemy";
    this.name = name;
    this.level = {
      value: level,
    };
    this.baseStats = getStatsToEnemy(name);
    this.incStats = getIncStatsToHero();
    this.buffs = getBuffsToHero();
    // this.attack = goAttack;
    this.skills = getSkillsToEnemy(name);
    this.resources = getResourcesToEnemy(name);
    this.getters = getters.call(this);
    this.setters = setters.call(this);
    updateMainStats(this, "all");
    this.HP = this.getters.getMaxHp();
    this.energy = {
      incValue: 5,
      max: MAX_ENERGY_VALUE,
      value: 0,
    };
  }
  type: heroType;
  readonly name: enemyName;
  level: {
    value: number;
  };
  incStats: heroIncStats;
  HP: number;
  energy: heroEnergy;
  barrier = 0;
  baseStats: enemyBaseStats;
  buffs: enemyBuffs;
  attack = goAttack;
  getBarrier = getBarrier;
  getHeal = getHeal;
  skills: enemySkills[];
  resources: enemyResources;
  status = getStatusToHero();
  update = () => {};
  pushSkillText = () => {};
  getters: enemyGetters;
  setters: enemySetters;
}

export class HeroClass implements IHero {
  constructor(name: heroName) {
    this.type = "hero";
    this.name = name;
    this.baseStats = getStatsToHero(name);
    this.incStats = getIncStatsToHero();
    this.buffs = getBuffsToHero();
    this.skills = getSkillsToHero(name);
    this.getters = getters.call(this);
    this.setters = setters.call(this);
    updateMainStats(this, "all");
    this.HP = this.getters.getMaxHp();
    this.energy = {
      incValue: 5,
      max: MAX_ENERGY_VALUE,
      value: 0,
    };
  }

  type: heroType;
  level = {
    value: START_HERO_LEVEL,
    exp: 0,
    incExp: incExp,
    expToNextLevel: 100,
  };
  incStats: heroIncStats;
  HP: number;
  energy: heroEnergy;
  barrier = 0;
  readonly name: heroName;
  baseStats: heroBaseStats;
  buffs: heroBuffs;
  attack = goAttack;
  getBarrier = getBarrier;
  getHeal = getHeal;
  skills: heroSkills[];
  statistics = getStatisticsToHero();
  resources = {
    gold: START_GOLD_HERO,
    skillPoints: START_SKILLPOINT,
    parameterPoints: START_PARAMETERPOINT,
    bag: ALL_BAG_ITEMS,
    bagActivePanel: ACTIVE_BAG_PANEL,
  };
  boost = {
    exp: 0,
    gold: 0,
  };
  status = getStatusToHero();
  update = () => {};
  pushSkillText = () => {};

  getters: heroGetters;
  setters: heroSetters;
}

function getters(this: IHero | IEnemy): heroGetters {
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

function setters(this: IHero | IEnemy): heroSetters {
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
