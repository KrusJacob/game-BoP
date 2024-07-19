import { ALL_ENEMIES } from "@/constants/enemy";
import { IHero, heroBaseStats, heroBuffs, heroResources, heroSkills } from "./hero.types";

export interface IEnemy {
  type: enemyType;
  level: {
    value: number;
  };
  baseStats: enemyBaseStats;
  HP: number;
  barrier: number;
  buffs: enemyBuffs;
  attack: enemyGoAttack;
  skills: enemySkills;
  resources: enemyResources;
}

export interface enemyResources {
  gold: number;
  skillPoints: number;
  exp: number;
}

export interface enemyResources extends heroResources {}
export interface enemyBuffs extends heroBuffs {}
export interface enemySkills extends heroSkills {}
export interface enemyBaseStats extends heroBaseStats {}
export type enemyGoAttack = (target: IHero | IEnemy, fn: (target: IHero | IEnemy) => void) => void;

export type enemyType = (typeof ALL_ENEMIES)[number];
