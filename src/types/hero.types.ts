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
  skills: heroSkills;
  resources: heroResources;
  status: heroStatus;
}

export interface heroStatus {
  death: boolean;
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
  data: {
    label: string;
    img: string;
  }[];
}

export interface heroBuffs {
  damage: number;
  def: number;
  incDamage: (value: number, duration?: number) => void;
  incDef: (value: number, duration?: number) => void;
  getBuffDamage: () => number;
  getBuffDef: () => number;
}
export type heroGoAttack = (target: IEnemy | IHero, fn: (target: IHero | IEnemy) => void) => void;
