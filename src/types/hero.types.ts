import { ALL_HEROES } from "../constants/hero";
import { IEnemy, enemyDrop, enemyTypeDrop } from "./enemy.types";
import { bagItemType } from "./shop.types";

export interface IHero {
  type: heroType;
  name: heroName;
  level: heroLevel;
  baseStats: heroBaseStats;
  incStats: heroIncStats;
  HP: number;
  barrier: number;
  buffs: heroBuffs;
  debuffStack: heroDebuffStack;
  attack: heroGoAttack;
  skills: heroSkills[];
  resources: heroResources;
  status: heroStatus;
  getBarrier: (this: IHero | IEnemy, value: number) => void;
  getHeal: (this: IHero | IEnemy, value: number) => void;
  update: Function;
  getters: heroGetters;
  setters: heroSetters;
  boost: heroBoost;
}

export interface heroBoost {
  exp: number;
  gold: number;
}

export interface heroStatus {
  death: boolean;
  isStun: boolean;
  isFreeze: boolean;
  isPoisoned: boolean;
}

export interface heroDebuffStack {
  posion: number;
}

export interface heroLevel {
  value: number;
  exp: number;
  expToNextLevel: number;
  incExp: (exp: number) => void;
}

export type heroName = (typeof ALL_HEROES)[number];
export type heroType = "hero" | "enemy";

export interface heroBaseStats {
  img: string;
  readonly name: string;
  readonly power: number;
  readonly agility: number;
  readonly intellect: number;
  readonly attack: number;
  readonly def: number;
  readonly maxHp: number;
  readonly attackSpeed: number;
  readonly powerSkill: number;
}
export interface heroIncStats {
  power: number;
  agility: number;
  intellect: number;
  attack: number;
  def: number;
  maxHp: number;
  attackSpeed: number;
  powerSkill: number;
  maxHpFromPower: number;
  attackSpeedFromAgility: number;
  powerSkillFromIntellect: number;
  ignoreDef: number;
}

export interface heroResources {
  gold: number;
  skillPoints: number;
  parameterPoints: number;
  drop: Record<enemyTypeDrop, number>;
  bag: Array<bagItemType>;
  bagActivePanel: Array<bagItemType>;
}

export interface heroGetters {
  getMaxHp: () => number;
  getPower: () => number;
  getAgility: () => number;
  getIntellect: () => number;
  getAttack: () => number;
  getDef: () => number;
  getAttackSpeed: () => number;
  getPowerSkill: () => number;
  getIgnoreDef: () => number;
}

export interface heroSetters {
  incMaxHp: (value: number) => void;
  incPower: (value: number) => void;
  incAgility: (value: number) => void;
  incIntellect: (value: number) => void;
  incAttack: (value: number) => void;
  incDef: (value: number) => void;
  incAttackSpeed: (value: number) => void;
  incPowerSkill: (value: number) => void;
  incExp: (value: number) => number;
  incChanceEvade: (value: number) => void;
  incChanceCritDamage: (value: number) => void;
  incIgnoreDef: (value: number) => void;
}

export interface heroSkills {
  label: string;
  descr: () => string;
  img: string;
  data: Record<string, any>;
  trigger?: keyof TypeSkillTrigger;
  fn?: Function;
}

export interface heroBuffs {
  nextAttack: {
    ignoreDef: number;
  };
  _damage: number;
  _def: number;
  _attackSpeed: number;
  incDamage: (value: number, duration?: number) => void;
  incAttackSpeed: (value: number, duration?: number) => void;
  incDef: (value: number, duration?: number) => void;
  getBuffDamage: () => number;
  getBuffAttackSpeed: () => number;
  getBuffDef: () => number;
}
export interface attackInfo {
  type: heroType;
  damage: number;
  isEvade: boolean;
  isCritical: boolean;
  isStunned: boolean;
}
export type heroGoAttack = (target: IEnemy | IHero, options?: attackOptions) => attackInfo;

export interface TypeSkillTrigger {
  active: Function[];
  inBeginFight: Function[];
  beforeHeroAttack: Function[];
  afterHeroAttack: Function[];
  beforeEnemyAttack: Function[];
  afterEnemyAttack: Function[];
  afterHeroAwade: Function[];
  afterEnemyAwade: Function[];
  afterHeroCrit: Function[];
  afterEnemyCrit: Function[];
}

export interface attackOptions {
  modifier?: number;
  ignoreDef?: number;
  isIgnoreAvade?: boolean;
}

export interface heroReward {
  exp: number;
  gold: number;
  skillPoints: number;
  drop?: {
    label: string;
    type: enemyTypeDrop;
    value: number;
  };
}
