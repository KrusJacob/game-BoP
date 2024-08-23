import { ALL_ENEMIES } from "@/constants/enemies";
import {
  IHero,
  attackInfo,
  attackOptions,
  heroBaseStats,
  heroBuffs,
  heroDebuffStack,
  heroGetters,
  heroIncStats,
  heroSetters,
  heroSkills,
  heroStatus,
  heroType,
} from "./hero.types";
import { bagItemType } from "./shop.types";

export interface IEnemy {
  type: heroType;
  name: enemyName;
  level: {
    value: number;
  };
  baseStats: enemyBaseStats;
  incStats: enemyIncStats;
  HP: number;
  barrier: number;
  buffs: enemyBuffs;
  debuffStack: enemyDebuffStack;
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
  drop?: enemyDrop;
}
export interface enemyDrop {
  label: enemyTypeLabelDrop;
  type: enemyTypeDrop;
  value: number[];
}
export type enemyTypeDrop = "fangsBeast" | "rogueItem" | "goblinItem" | "gnomeItem" | "gillsNaga";
export type enemyTypeLabelDrop =
  | "Клык зверя"
  | "Кольцо убийцы"
  | "Эмблема гоблина"
  | "Монета гнома"
  | "Подводное сокровище";
export type enemyTypeBagDrop = Record<enemyTypeDrop, bagItemType>;

interface enemyStatus extends heroStatus {}

export interface enemyBuffs extends heroBuffs {}
export interface enemyDebuffStack extends heroDebuffStack {}
export interface enemySkills extends heroSkills {}
export interface enemyBaseStats extends heroBaseStats {}
export interface enemyIncStats extends heroIncStats {}
export interface enemyGetters extends heroGetters {}
export interface enemySetters extends heroSetters {}
export type enemyGoAttack = (target: IHero | IEnemy, options?: attackOptions) => attackInfo;

export type enemyName = (typeof ALL_ENEMIES)[number];

export interface enemiesToLocation {
  enemies: enemyInfo[][];
  legendEnemies: enemyInfo[];
}
export interface enemyInfo {
  name: enemyName;
  unique?: boolean;
}
export interface enemiesToTomb {
  name: enemyName;
  resource: enemyDrop;
}
