import { ALL_ENEMIES } from "@/constants/enemy";
import {
  IHero,
  attackOptions,
  heroBaseStats,
  heroBuffs,
  heroResources,
  heroSkills,
  heroStatus,
} from "./hero.types";

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
  skills: enemySkills[];
  resources: enemyResources;
  status: enemyStatus;
  getBarrier: (this: IHero | IEnemy, value: number) => void;
  update: Function;
}

export interface enemyResources {
  gold: number;
  skillPoints: number;
  exp: number;
}

interface enemyStatus extends heroStatus {}
export interface enemyResources extends heroResources {}
export interface enemyBuffs extends heroBuffs {}
export interface enemySkills extends heroSkills {}
export interface enemyBaseStats extends heroBaseStats {}
export type enemyGoAttack = (target: IHero | IEnemy, options?: attackOptions) => void;

export type enemyType = (typeof ALL_ENEMIES)[number];
