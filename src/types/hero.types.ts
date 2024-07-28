import { ALL_HEROES } from "../constants/hero";
import { IEnemy } from "./enemy.types";

export interface IHero {
  type: heroType;
  level: heroLevel;
  baseStats: heroBaseStats;
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
}

export interface heroResources {
  gold: number;
  skillPoints: number;
}

export interface heroSkills {
  label: () => string;
  img: string;
  value: Record<string, number>;
  trigger?: keyof TypeSkillTrigger;
  fn?: Function;
}

export interface heroBuffs {
  nextAttack: {
    ignoreDef: number;
  };
  damage: number;
  def: number;
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
