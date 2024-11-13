import { ALL_ENEMIES } from "@/constants/enemies";
import {
  IHero,
  IAttackInfo,
  attackOptions,
  heroBaseStats,
  heroBuffs,
  heroEnergy,
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
  energy: heroEnergy;
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
  tombProgress?: number;
}
export interface enemyDrop {
  label: enemyTypeLabelDrop;
  type: enemyTypeDrop;
  value: number[];
}
export type enemyType = "beast" | "rogue" | "goblin" | "gnome" | "naga";
export type enemyTombName = Extract<
  enemyName,
  "beast_5" | "rogue_5" | "goblin_5" | "gnome_5" | "naga_5" | "skeleton_5"
>;
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
export interface enemySkills extends heroSkills {}
export interface enemyBaseStats extends heroBaseStats {}
export interface enemyIncStats extends heroIncStats {}
export interface enemyGetters extends heroGetters {}
export interface enemySetters extends heroSetters {}
export type enemyGoAttack = (target: IHero | IEnemy, options?: attackOptions) => IAttackInfo;

export type enemyName = (typeof ALL_ENEMIES)[number];

export interface enemiesToLocation {
  enemies: enemyInfo[][];
  legendEnemies: enemyInfo[];
}
export interface enemyInfo {
  name: enemyName;
  unique?: boolean;
}
export interface enemyToTomb {
  name: enemyTombName;
  value: number;
  defeated: boolean;
}
