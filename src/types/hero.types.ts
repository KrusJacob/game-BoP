import { ALL_HEROES } from "@/constants/hero/index";
import { IEnemy, enemyName, enemyType } from "./enemy.types";
import { bagItemType } from "./shop.types";
import { talentType } from "./talent.types";

export type ICharacter = IHero | IEnemy;
export interface IHero {
  type: heroType;
  name: heroName;
  level: heroLevel;
  baseStats: heroBaseStats;
  incStats: heroIncStats;
  HP: number;
  energy: heroEnergy;
  barrier: number;
  buffs: heroBuffs;
  attack: heroGoAttack;
  skills: heroSkills[];
  resources: heroResources;
  status: heroStatus;
  getBarrier: (this: IHero | IEnemy, value: number) => void;
  getHeal: (this: IHero | IEnemy, value: number) => number;
  update: Function;
  pushSkillText: Function;
  getters: heroGetters;
  setters: heroSetters;
  boost: heroBoost;
  statistics: heroStatistics;
}

export interface heroStatistics {
  kills: killStatistics;
  tombProgress: tombProgress;
}

export type tombProgress = Record<enemyType, number>;

export type killStatistics = Partial<Record<enemyName, number>>;

export interface heroEnergy {
  value: number;
  max: number;
  incValue: number;
}

export interface heroBoost {
  exp: number;
  gold: number;
}

export type heroStatus = defaultStatuses & uniqueStatuses;

interface defaultStatuses {
  death: boolean;
  stun: {
    isStun: boolean;
    isCooldown: boolean;
  };
  isFreeze: boolean;
  isPoisoned: boolean;
  isBleeded: boolean;
  virus: {
    isVirus: boolean;
    stack: number;
  };
  darkСurse: {
    isDarkСurse: boolean;
    stack: number;
    readonly value: number;
  };
}

interface uniqueStatuses {
  justiceMark: {
    isJusticeMark: boolean;
    stack: number;
  };
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
  readonly magicDef: number;
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
  magicDef: number;
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
  bagActivePanel: Array<bagItemType>;
}

export interface heroGetters {
  getMaxHp: () => number;
  getPower: () => number;
  getAgility: () => number;
  getIntellect: () => number;
  getAttack: () => number;
  getDef: () => number;
  getMagicDef: () => number;
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
  incMagicDef: (value: number) => void;
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
  incAttackSpeed: (value: number, durationSec?: number) => void;
  incDef: (value: number, duration?: number) => void;
  getBuffDamage: () => number;
  getBuffAttackSpeed: () => number;
  getBuffDef: () => number;
}
export interface IAttackInfo {
  initiatorType: heroType;
  damage: {
    type: ITypeDamage;
    value: number;
  };
  isMiss?: boolean;
  isCritical?: boolean;
  isStunned?: boolean;
}

export type ITypeDamage = "physical" | "magical" | "pure" | "sacrifice";

export type heroGoAttack = (target: IEnemy | IHero, options?: attackOptions) => IAttackInfo;

export interface TypeSkillTrigger {
  active: Function[];
  inBeginFight: Function[];
  inEndFight: Function[];
  beforeInitiatorAttack: Function[];
  beforeTargetAttack: Function[];
  afterInitiatorAttack: Function[];
  afterTargetAttack: Function[];
  afterInitiatorMiss: Function[];
  afterTargetMiss: Function[];
  afterInitiatorCrit: Function[];
  afterTargetCrit: Function[];
}

export interface attackOptions {
  modifier?: number;
  bonusDamage?: number;
  ignoreDef?: number;
  isIgnoreAvade?: boolean;
}

export interface heroReward {
  exp: number;
  gold: number;
  parameterPoints?: number;
  skillPoints?: number;
  talent: talentType | null;
}
