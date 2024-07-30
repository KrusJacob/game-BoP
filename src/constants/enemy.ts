import { enemiesToLocation, enemyBaseStats, enemyResources } from "@/types/enemy.types";

export const ALL_ENEMIES = [
  "beast",
  "beast_2",
  "beast_3",
  "beast_4",
  "rogue",
  "rogue_2",
  "rogue_3",
  "rogue_4",
  "gnome",
  "gnome_2",
  "gnome_3",
  "gnome_4",
  "goblin",
  "goblin_2",
  "goblin_3",
  "goblin_4",
] as const;

// export const ENEMIES_TO_DARK_FOREST = ["beast", "rogue", "beast_2", "rogue_2", "beast_3", "rogue_3"];
// export const ENEMIES_TO_HIDDEN_CAVE = ["gnome", "gnome_2", "gnome_3"];
// export const ENEMIES_TO_AZURE_COAST = ["gnome", "rogue", "gnome_2"];
// export const ENEMIES_TO_SNOW_MOUNTAINS = ["gnome", "rogue", "gnome_2"];
export const ENEMIES_TO_DARK_FOREST: enemiesToLocation[] = [
  {
    enemies: [{ name: "beast" }, { name: "rogue" }],
    legendEnemies: [{ name: "gnome_4", unique: true }],
  },
  {
    enemies: [{ name: "beast" }, { name: "rogue" }, { name: "beast_2" }, { name: "rogue_2" }],
    legendEnemies: [],
  },
  {
    enemies: [{ name: "beast_2" }, { name: "rogue_2" }],
    legendEnemies: [],
  },
  {
    enemies: [{ name: "beast_2" }, { name: "rogue_2" }, { name: "beast_3" }, { name: "rogue_3" }],
    legendEnemies: [],
  },
  {
    enemies: [{ name: "beast_3" }, { name: "rogue_3" }],
    legendEnemies: [],
  },
];
export const ENEMIES_TO_HIDDEN_CAVE: enemiesToLocation[] = [
  {
    enemies: [{ name: "gnome" }, { name: "goblin" }],
    legendEnemies: [],
  },
  {
    enemies: [{ name: "gnome" }, { name: "goblin" }, { name: "gnome_2" }, { name: "goblin_2" }],
    legendEnemies: [],
  },
  {
    enemies: [{ name: "gnome_2" }, { name: "goblin_2" }],
    legendEnemies: [],
  },
  {
    enemies: [{ name: "gnome_2" }, { name: "goblin_2" }, { name: "gnome_3" }, { name: "goblin_3" }],
    legendEnemies: [],
  },
  {
    enemies: [{ name: "gnome_3" }, { name: "gnome_3" }],
    legendEnemies: [],
  },
];
// Hidden Cave
// azure coast
// snow mountains

export const STATS_BEAST: enemyBaseStats = {
  img: "/src/assets/enemy/beast.png",
  name: "Вепрь",
  power: 50,
  agility: 20,
  intellect: 10,
  attack: 80,
  def: 14,
  maxHp: 800,
  attackSpeed: 0.7,
};
export const RESOURCES_BEAST: enemyResources = {
  exp: 70,
  gold: 80,
  skillPoints: 0,
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
  skillPoints: 0,
};
export const STATS_BEAST_2: enemyBaseStats = {
  img: "/src/assets/enemy/beast_2.png",
  name: "Волк",
  power: 40,
  agility: 65,
  intellect: 20,
  attack: 85,
  def: 18,
  maxHp: 1200,
  attackSpeed: 1,
};
export const RESOURCES_BEAST_2: enemyResources = {
  exp: 120,
  gold: 100,
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
  gold: 150,
  skillPoints: 1,
};
export const STATS_BEAST_3: enemyBaseStats = {
  img: "/src/assets/enemy/beast_3.png",
  name: "Медведь",
  power: 80,
  agility: 20,
  intellect: 30,
  attack: 160,
  def: 28,
  maxHp: 1600,
  attackSpeed: 0.5,
};
export const RESOURCES_BEAST_3: enemyResources = {
  exp: 180,
  gold: 120,
  skillPoints: 1,
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
  gold: 200,
  skillPoints: 1,
};
export const STATS_BEAST_4: enemyBaseStats = {
  img: "/src/assets/enemy/beast_4.png",
  name: "Оборотень",
  power: 70,
  agility: 90,
  intellect: 45,
  attack: 180,
  def: 30,
  maxHp: 1800,
  attackSpeed: 1.1,
};
export const RESOURCES_BEAST_4: enemyResources = {
  exp: 400,
  gold: 420,
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
  maxHp: 1800,
  attackSpeed: 1.5,
};
export const RESOURCES_ROGUE_4: enemyResources = {
  exp: 320,
  gold: 500,
  skillPoints: 3,
};

//

export const STATS_GOBLIN: enemyBaseStats = {
  img: "/src/assets/enemy/goblin.png",
  name: "Гоблин-разведчик",
  power: 35,
  agility: 95,
  intellect: 40,
  attack: 150,
  def: 15,
  maxHp: 1350,
  attackSpeed: 1.3,
};
export const RESOURCES_GOBLIN: enemyResources = {
  exp: 180,
  gold: 220,
  skillPoints: 1,
};
export const STATS_GNOME: enemyBaseStats = {
  img: "/src/assets/enemy/gnome.png",
  name: "Гном-охранник",
  power: 40,
  agility: 55,
  intellect: 60,
  attack: 135,
  def: 20,
  maxHp: 1600,
  attackSpeed: 1.1,
};
export const RESOURCES_GNOME: enemyResources = {
  exp: 180,
  gold: 250,
  skillPoints: 1,
};

export const STATS_GOBLIN_2: enemyBaseStats = {
  img: "/src/assets/enemy/goblin_2.png",
  name: "Гоблин-убийца",
  power: 50,
  agility: 100,
  intellect: 40,
  attack: 140,
  def: 24,
  maxHp: 1300,
  attackSpeed: 1.4,
};
export const RESOURCES_GOBLIN_2: enemyResources = {
  exp: 280,
  gold: 230,
  skillPoints: 1,
};
export const STATS_GNOME_2: enemyBaseStats = {
  img: "/src/assets/enemy/gnome_2.png",
  name: "Гном-воитель",
  power: 70,
  agility: 65,
  intellect: 50,
  attack: 125,
  def: 17,
  maxHp: 1700,
  attackSpeed: 1.3,
};
export const RESOURCES_GNOME_2: enemyResources = {
  exp: 240,
  gold: 260,
  skillPoints: 1,
};

export const STATS_GOBLIN_3: enemyBaseStats = {
  img: "/src/assets/enemy/goblin_3.png",
  name: "Гоблин-ветеран",
  power: 100,
  agility: 60,
  intellect: 40,
  attack: 170,
  def: 25,
  maxHp: 1900,
  attackSpeed: 0.8,
};
export const RESOURCES_GOBLIN_3: enemyResources = {
  exp: 320,
  gold: 270,
  skillPoints: 2,
};
export const STATS_GNOME_3: enemyBaseStats = {
  img: "/src/assets/enemy/gnome_3.png",
  name: "Гном-убийца",
  power: 80,
  agility: 70,
  intellect: 50,
  attack: 140,
  def: 35,
  maxHp: 1800,
  attackSpeed: 1,
};
export const RESOURCES_GNOME_3: enemyResources = {
  exp: 290,
  gold: 300,
  skillPoints: 2,
};
export const STATS_GOBLIN_4: enemyBaseStats = {
  img: "/src/assets/enemy/goblin_4.png",
  name: "Невидимый устранитель",
  power: 50,
  agility: 140,
  intellect: 70,
  attack: 150,
  def: 28,
  maxHp: 2500,
  attackSpeed: 1.6,
};
export const RESOURCES_GOBLIN_4: enemyResources = {
  exp: 600,
  gold: 600,
  skillPoints: 4,
};
export const STATS_GNOME_4: enemyBaseStats = {
  img: "/src/assets/enemy/gnome_4.png",
  name: "Пещерный ужас",
  power: 40,
  agility: 40,
  intellect: 190,
  attack: 190,
  def: 24,
  maxHp: 2900,
  attackSpeed: 0.8,
};
export const RESOURCES_GNOME_4: enemyResources = {
  exp: 500,
  gold: 650,
  skillPoints: 4,
};
