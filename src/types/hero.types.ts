import { ALL_HEROES } from "../constants/hero";

export interface IHero {
  type: heroType;
  baseStats: heroBaseStats;
  HP: number;
  barrier: number;
  buffs: heroBuffs;
  attack: heroGoAttack;
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
export interface heroBuffs {
  damage: number;
  def: number;
  incDamage: (value: number, duration?: number) => void;
  incDef: (value: number, duration?: number) => void;
  getBuffDamage: () => number;
  getBuffDef: () => number;
}
export type heroGoAttack = (target: IHero, fn: (tarher: IHero) => void) => void;
