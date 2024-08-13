import { ALL_HEROES } from "../constants/hero";
import { IEnemy } from "./enemy.types";
import { bagItemType } from "./shop.types";

export interface IHero {
  type: heroType;
  level: heroLevel;
  baseStats: heroBaseStats;
  incStats: heroIncStats;
  HP: number;
  barrier: number;
  buffs: heroBuffs;
  attack: heroGoAttack;
  skills: heroSkills[];
  resources: heroResources;
  status: heroStatus;
  getBarrier: (this: IHero | IEnemy, value: number) => void;
  getHeal: (this: IHero | IEnemy, value: number) => void;
  update: Function;
  getters: heroGetters;
  setters: heroSetters;
}

export interface heroStatus {
  death: boolean;
  stun: number;
}

export interface heroLevel {
  value: number;
  exp: number;
  expToNextLevel: number;
  incExp: (exp: number) => void;
}

export type heroType = (typeof ALL_HEROES)[number];
// export type heroType = "warrior" | "mage" | "rogue";

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
  bag: Array<bagItemType>;
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
  incExp: (value: number) => void;
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
  incDamage: (value: number, duration?: number) => void;
  incDef: (value: number, duration?: number) => void;
  getBuffDamage: () => number;
  getBuffDef: () => number;
}
export interface attackInfo {
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
