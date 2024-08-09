import {
  IEnemy,
  enemyType,
  enemyBaseStats,
  enemyBuffs,
  enemySkills,
  enemyResources,
  enemyGetters,
  enemySetters,
} from "@/types/enemy.types";
import {
  IHero,
  heroType,
  heroBaseStats,
  heroBuffs,
  heroSkills,
  heroIncStats,
  heroGetters,
  heroSetters,
} from "@/types/hero.types";
import {
  incHeroDamage,
  incHeroDef,
  getBuffDamage,
  getBuffDef,
  goAttack,
  getBarrier,
  getHeal,
  setMaxLevelExp,
  incExp,
} from "./fn";
import {
  getStatsToEnemy,
  getSkillsToEnemy,
  getResourcesToEnemy,
  getStatsToHero,
  getSkillsToHero,
  getIncStatsToHero,
} from "./initStats";
import { updateMainStats } from "./attributes";

export class EnemyClass implements IEnemy {
  constructor(type: enemyType, level = 1) {
    this.type = type;
    this.level = {
      value: level,
    };
    this.baseStats = getStatsToEnemy(type);
    this.incStats = getIncStatsToHero();
    this.buffs = {
      nextAttack: {
        ignoreDef: 0,
      },
      _damage: 0,
      _def: 0,
      incDamage: incHeroDamage,
      incDef: incHeroDef,
      getBuffDamage: getBuffDamage,
      getBuffDef: getBuffDef,
    };
    // this.attack = goAttack;
    this.skills = getSkillsToEnemy(type);
    this.resources = getResourcesToEnemy(type);
    this.getters = getters.call(this);
    this.setters = setters.call(this);
    updateMainStats(this, "all");
    this.HP = this.getters.getMaxHp();
  }
  readonly type: enemyType;
  level: {
    value: number;
  };
  incStats: heroIncStats;
  HP: number;
  barrier = 0;
  baseStats: enemyBaseStats;
  buffs: enemyBuffs;
  attack = goAttack;
  getBarrier = getBarrier;
  getHeal = getHeal;
  skills: enemySkills[];
  resources: enemyResources;
  status = {
    death: false,
    stun: 0,
  };
  update = () => {};
  getters: enemyGetters;
  setters: enemySetters;
}

export class HeroClass implements IHero {
  constructor(type: heroType) {
    this.type = type;
    this.baseStats = getStatsToHero(type);
    this.incStats = getIncStatsToHero();

    this.buffs = {
      nextAttack: {
        ignoreDef: 0,
      },
      _damage: 0,
      _def: 0,
      incDamage: incHeroDamage,
      incDef: incHeroDef,
      getBuffDamage: getBuffDamage,
      getBuffDef: getBuffDef,
    };
    this.skills = getSkillsToHero(type);
    this.getters = getters.call(this);
    this.setters = setters.call(this);
    updateMainStats(this, "all");
    this.HP = this.getters.getMaxHp();
    // registerSkill(this.skills.data[2].fn!, "afterHeroAttack");
  }
  level = {
    value: 1,
    exp: 0,
    incExp: incExp,
    expToNextLevel: 100,
  };
  incStats: heroIncStats;
  HP: number;
  barrier = 0;
  readonly type: heroType;
  baseStats: heroBaseStats;
  buffs: heroBuffs;
  attack = goAttack;
  getBarrier = getBarrier;
  getHeal = getHeal;
  skills: heroSkills[];
  resources = {
    gold: 0,
    skillPoints: 0,
    parameterPoints: 0,
  };
  status = {
    death: false,
    stun: 0,
  };
  update = () => {};
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
    getAttackSpeed: function () {
      return +(
        hero.baseStats.attackSpeed +
        hero.incStats.attackSpeed +
        hero.incStats.attackSpeedFromAgility
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
    incAttackSpeed: function (value: number) {
      hero.incStats.attackSpeed += value;
    },
    incPowerSkill: function (value: number) {
      hero.incStats.powerSkill += value;
    },
    incChanceEvade: function (value: number) {
      hero.skills[3].value.chanceEvade += value;
    },
    incChanceCritDamage: function (value: number) {
      hero.skills[3].value.chanceCritDamage += value;
    },
    incIgnoreDef: function (value: number) {
      hero.incStats.ignoreDef += value;
    },
    incExp: incExp,
  };
}
