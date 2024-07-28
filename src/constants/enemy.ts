import { enemyBaseStats, enemyResources } from "@/types/enemy.types";

export const ALL_ENEMIES = [
  "gnome",
  "gnome_2",
  "gnome_3",
  "gnome_4",
  "rogue",
  "rogue_2",
  "rogue_3",
  "rogue_4",
] as const;

export const ENEMIES_TO_DARK_FOREST = ["rogue", "rogue_2", "rogue_3"];
export const ENEMIES_TO_HIDDEN_CAVE = ["gnome", "gnome_2", "gnome_3"];
export const ENEMIES_TO_AZURE_COAST = ["gnome", "rogue", "gnome_2"];
export const ENEMIES_TO_SNOW_MOUNTAINS = ["gnome", "rogue", "gnome_2"];
// Hidden Cave
// azure coast
// snow mountains

export const STATS_GNOME: enemyBaseStats = {
  img: "/src/assets/enemy/gnome.png",
  name: "Гном-маг",
  power: 15,
  agility: 25,
  intellect: 60,
  attack: 90,
  def: 7,
  maxHp: 650,
  attackSpeed: 0.6,
};
export const RESOURCES_GNOME: enemyResources = {
  exp: 60,
  gold: 120,
  skillPoints: 1,
};
export const STATS_GNOME_2: enemyBaseStats = {
  img: "/src/assets/enemy/gnome_2.png",
  name: "Гном-воитель",
  power: 40,
  agility: 55,
  intellect: 40,
  attack: 75,
  def: 14,
  maxHp: 800,
  attackSpeed: 0.9,
};
export const RESOURCES_GNOME_2: enemyResources = {
  exp: 80,
  gold: 140,
  skillPoints: 1,
};

export const STATS_GNOME_3: enemyBaseStats = {
  img: "/src/assets/enemy/gnome_3.png",
  name: "Гном-страж",
  power: 80,
  agility: 25,
  intellect: 40,
  attack: 110,
  def: 30,
  maxHp: 1200,
  attackSpeed: 0.6,
};
export const RESOURCES_GNOME_3: enemyResources = {
  exp: 100,
  gold: 170,
  skillPoints: 2,
};
export const STATS_GNOME_4: enemyBaseStats = {
  img: "/src/assets/enemy/gnome_4.png",
  name: "Король гномов",
  power: 50,
  agility: 50,
  intellect: 90,
  attack: 150,
  def: 18,
  maxHp: 1000,
  attackSpeed: 0.8,
};
export const RESOURCES_GNOME_4: enemyResources = {
  exp: 250,
  gold: 350,
  skillPoints: 5,
};

export const STATS_ROGUE: enemyBaseStats = {
  img: "/src/assets/enemy/rogue.png",
  name: "Грабитель",
  power: 25,
  agility: 65,
  intellect: 20,
  attack: 70,
  def: 9,
  maxHp: 750,
  attackSpeed: 1.1,
};
export const RESOURCES_ROGUE: enemyResources = {
  exp: 60,
  gold: 120,
  skillPoints: 1,
};
export const STATS_ROGUE_2: enemyBaseStats = {
  img: "/src/assets/enemy/rogue_2.png",
  name: "Разбойник",
  power: 30,
  agility: 75,
  intellect: 30,
  attack: 75,
  def: 16,
  maxHp: 1300,
  attackSpeed: 1.2,
};
export const RESOURCES_ROGUE_2: enemyResources = {
  exp: 100,
  gold: 120,
  skillPoints: 2,
};
export const STATS_ROGUE_3: enemyBaseStats = {
  img: "/src/assets/enemy/rogue_3.png",
  name: "Злодей 007",
  power: 40,
  agility: 90,
  intellect: 40,
  attack: 110,
  def: 19,
  maxHp: 1400,
  attackSpeed: 1.1,
};
export const RESOURCES_ROGUE_3: enemyResources = {
  exp: 150,
  gold: 120,
  skillPoints: 3,
};
export const STATS_ROGUE_4: enemyBaseStats = {
  img: "/src/assets/enemy/rogue_4.png",
  name: "Воплощение обмана",
  power: 60,
  agility: 130,
  intellect: 70,
  attack: 145,
  def: 24,
  maxHp: 1700,
  attackSpeed: 1.5,
};
export const RESOURCES_ROGUE_4: enemyResources = {
  exp: 300,
  gold: 500,
  skillPoints: 5,
};
