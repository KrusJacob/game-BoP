import {
  IEnemy,
  enemyType,
  enemyBaseStats,
  enemyBuffs,
  enemyGoAttack,
  enemySkills,
  enemyResources,
} from "@/types/enemy.types";
import { IHero, heroType, heroBaseStats, heroBuffs, heroGoAttack, heroSkills } from "@/types/hero.types";
import { incHeroDamage, incHeroDef, getBuffDamage, getBuffDef, goAttack, incExp } from "./fn";
import {
  getStatsToEnemy,
  getSkillsToEnemy,
  getResourcesToEnemy,
  getStatsToHero,
  getSkillsToHero,
} from "./initStats";

export class EnemyClass implements IEnemy {
  constructor(type: enemyType, level = 1) {
    this.type = type;
    this.level = {
      value: level,
    };
    this.baseStats = getStatsToEnemy(type);
    this.HP = this.baseStats.maxHp;
    this.buffs = {
      damage: 0,
      def: 0,
      incDamage: incHeroDamage,
      incDef: incHeroDef,
      getBuffDamage: getBuffDamage,
      getBuffDef: getBuffDef,
    };
    this.attack = goAttack;
    this.skills = getSkillsToEnemy(type);
    this.resources = getResourcesToEnemy(type);
  }
  readonly type: enemyType;
  level: {
    value: number;
  };
  HP: number;
  barrier = 0;
  baseStats: enemyBaseStats;
  buffs: enemyBuffs;
  attack: enemyGoAttack;
  skills: enemySkills;
  resources: enemyResources;
}

export class HeroClass implements IHero {
  constructor(type: heroType) {
    this.type = type;
    this.baseStats = getStatsToHero(type);
    this.HP = this.baseStats.maxHp;
    this.buffs = {
      damage: 0,
      def: 0,
      incDamage: incHeroDamage,
      incDef: incHeroDef,
      getBuffDamage: getBuffDamage,
      getBuffDef: getBuffDef,
    };
    this.attack = goAttack;
    this.skills = getSkillsToHero(type);
  }
  level = {
    value: 1,
    exp: 0,
    incExp: incExp,
    expToNextLevel: 100,
  };
  HP: number;
  barrier = 0;
  readonly type: heroType;
  baseStats: heroBaseStats;
  buffs: heroBuffs;
  attack: heroGoAttack;
  skills: heroSkills;
  resources = {
    gold: 0,
    skillPoints: 0,
  };
}
