import { ALL_ENEMIES } from "@/constants/enemies";
import {
  IHero,
  attackInfo,
  attackOptions,
  heroBaseStats,
  heroBuffs,
  heroGetters,
  heroIncStats,
  heroSetters,
  heroSkills,
  heroStatus,
} from "./hero.types";

export interface IEnemy {
  type: enemyType;
  level: {
    value: number;
  };
  baseStats: enemyBaseStats;
  incStats: enemyIncStats;
  HP: number;
  barrier: number;
  buffs: enemyBuffs;
  attack: enemyGoAttack;
  skills: enemySkills[];
  resources: enemyResources;
  status: enemyStatus;
  getBarrier: (this: IHero | IEnemy, value: number) => void;
  getHeal: (this: IHero | IEnemy, value: number) => void;
  update: Function;
  getters: enemyGetters;
  setters: enemySetters;
}

export interface enemyResources {
  gold: number;
  skillPoints: number;
  exp: number;
}

interface enemyStatus extends heroStatus {}

export interface enemyBuffs extends heroBuffs {}
export interface enemySkills extends heroSkills {}
export interface enemyBaseStats extends heroBaseStats {}
export interface enemyIncStats extends heroIncStats {}
export interface enemyGetters extends heroGetters {}
export interface enemySetters extends heroSetters {}
export type enemyGoAttack = (target: IHero | IEnemy, options?: attackOptions) => attackInfo;

export type enemyType = (typeof ALL_ENEMIES)[number];

export interface enemiesToLocation {
  enemies: enemyInfo[][];
  legendEnemies: enemyInfo[];
}
export interface enemyInfo {
  name: enemyType;
  unique?: boolean;
}
