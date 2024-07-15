import { enemyBaseStats } from "@/types/enemy.types";

export const ALL_ENEMIES = ["rogue", "rogue_2", "rogue_3", "rogue_4"] as const;

export const STATS_ROGUE: enemyBaseStats = {
  img: "/src/assets/enemy/rogue.png",
  name: "Разбойник",
  power: 25,
  agility: 65,
  intellect: 20,
  attack: 70,
  def: 5,
  maxHp: 800,
  attackSpeed: 1.2,
};
export const STATS_ROGUE_2: enemyBaseStats = {
  img: "/src/assets/enemy/rogue_2.png",
  name: "Разбойник",
  power: 30,
  agility: 75,
  intellect: 30,
  attack: 80,
  def: 9,
  maxHp: 1100,
  attackSpeed: 1.3,
};
export const STATS_ROGUE_3: enemyBaseStats = {
  img: "/src/assets/enemy/rogue_3.png",
  name: "Разбойник",
  power: 40,
  agility: 90,
  intellect: 40,
  attack: 110,
  def: 12,
  maxHp: 1250,
  attackSpeed: 1.2,
};
export const STATS_ROGUE_4: enemyBaseStats = {
  img: "/src/assets/enemy/rogue_4.png",
  name: "Разбойник",
  power: 60,
  agility: 125,
  intellect: 70,
  attack: 130,
  def: 15,
  maxHp: 1400,
  attackSpeed: 1.5,
};
