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
  heroEnergy,
} from "@/types/hero.types";

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
import { ACTIVE_BAG_PANEL, ALL_BAG_ITEMS } from "../bag/bag";
import {
  ATTACK_SPD_FROM_1_AGILITY,
  MAX_ENERGY_VALUE,
  MAX_HP_FROM_1_POWER,
  POWER_SKILL_FROM_1_INTELLECT,
  START_GOLD_HERO,
  START_HERO_LEVEL,
  START_PARAMETERPOINT,
  START_SKILLPOINT,
} from "../setup";
import { goAttack } from "../func/fight";
import { incExp } from "../func/reward";
import { getBarrier, getHeal } from "../func/getters";
import { getters, setters, updateMainStats } from "./actions";

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
