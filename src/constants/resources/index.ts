import { enemyResources } from "@/types/enemy.types";
import { heroReward } from "@/types/hero.types";

const RESOURCES_BEAST: enemyResources = {
  exp: 75,
  gold: 80,
  skillPoints: 0,
  tombProgress: 5,
};
const RESOURCES_BEAST_2: enemyResources = {
  exp: 95,
  gold: 95,
  skillPoints: 0,
  tombProgress: 6,
};
const RESOURCES_BEAST_3: enemyResources = {
  exp: 120,
  gold: 110,
  skillPoints: 0,
  tombProgress: 8,
};
const RESOURCES_BEAST_4: enemyResources = {
  exp: 150,
  gold: 125,
  skillPoints: 0,
  tombProgress: 10,
};
const RESOURCES_BEAST_5: enemyResources = {
  exp: 500,
  gold: 350,
  skillPoints: 1,
};

const RESOURCES_ROGUE: enemyResources = {
  exp: 170,
  gold: 140,
  skillPoints: 0,
  tombProgress: 5,
};
const RESOURCES_ROGUE_2: enemyResources = {
  exp: 195,
  gold: 155,
  skillPoints: 0,
  tombProgress: 6,
};
const RESOURCES_ROGUE_3: enemyResources = {
  exp: 220,
  gold: 170,
  skillPoints: 0,
  tombProgress: 8,
};
const RESOURCES_ROGUE_4: enemyResources = {
  exp: 245,
  gold: 185,
  skillPoints: 0,
  tombProgress: 10,
};
const RESOURCES_ROGUE_5: enemyResources = {
  exp: 700,
  gold: 500,
  skillPoints: 1,
};

//

const RESOURCES_GOBLIN: enemyResources = {
  exp: 280,
  gold: 200,
  skillPoints: 0,
  tombProgress: 5,
};
const RESOURCES_GOBLIN_2: enemyResources = {
  exp: 310,
  gold: 215,
  skillPoints: 0,
  tombProgress: 6,
};
const RESOURCES_GOBLIN_3: enemyResources = {
  exp: 345,
  gold: 230,
  skillPoints: 0,
  tombProgress: 8,
};
const RESOURCES_GOBLIN_4: enemyResources = {
  exp: 380,
  gold: 245,
  skillPoints: 0,
  tombProgress: 10,
};
const RESOURCES_GOBLIN_5: enemyResources = {
  exp: 900,
  gold: 700,
  skillPoints: 1,
};
const RESOURCES_GNOME: enemyResources = {
  exp: 405,
  gold: 260,
  skillPoints: 0,
  tombProgress: 5,
};

const RESOURCES_GNOME_2: enemyResources = {
  exp: 430,
  gold: 275,
  skillPoints: 0,
  tombProgress: 6,
};

const RESOURCES_GNOME_3: enemyResources = {
  exp: 455,
  gold: 290,
  skillPoints: 0,
  tombProgress: 8,
};

const RESOURCES_GNOME_4: enemyResources = {
  exp: 480,
  gold: 305,
  skillPoints: 0,
  tombProgress: 10,
};

const RESOURCES_GNOME_5: enemyResources = {
  exp: 1000,
  gold: 1000,
  skillPoints: 1,
};

const RESOURCES_NAGA: enemyResources = {
  exp: 520,
  gold: 320,
  skillPoints: 0,
  tombProgress: 5,
};
const RESOURCES_NAGA_2: enemyResources = {
  exp: 560,
  gold: 340,
  skillPoints: 0,
  tombProgress: 6,
};
const RESOURCES_NAGA_3: enemyResources = {
  exp: 600,
  gold: 360,
  skillPoints: 0,
  tombProgress: 8,
};
const RESOURCES_NAGA_4: enemyResources = {
  exp: 640,
  gold: 380,
  skillPoints: 0,
  tombProgress: 10,
};
const RESOURCES_NAGA_5: enemyResources = {
  exp: 1200,
  gold: 1200,
  skillPoints: 1,
};
const RESOURCES_SKELETON: enemyResources = {
  exp: 680,
  gold: 400,
  skillPoints: 0,
  tombProgress: 5,
};

const RESOURCES_SKELETON_2: enemyResources = {
  exp: 720,
  gold: 420,
  skillPoints: 0,
  tombProgress: 6,
};

const RESOURCES_SKELETON_3: enemyResources = {
  exp: 765,
  gold: 440,
  skillPoints: 0,
  tombProgress: 8,
};

const RESOURCES_SKELETON_4: enemyResources = {
  exp: 920,
  gold: 460,
  skillPoints: 0,
  tombProgress: 10,
};

const RESOURCES_SKELETON_5: enemyResources = {
  exp: 1500,
  gold: 1500,
  skillPoints: 1,
};

// legends

const RESOURCES_GODLEN_PIG: enemyResources = {
  exp: 50,
  gold: 750,
  skillPoints: 0,
};
const RESOURCES_GNOME_TRADER: enemyResources = {
  exp: 50,
  gold: 1000,
  skillPoints: 1,
};
const RESOURCES_SEA_MONSTER: enemyResources = {
  exp: 1500,
  gold: 300,
  skillPoints: 1,
};
const RESOURCES_TREASURE_BOX: enemyResources = {
  exp: 50,
  gold: 1500,
  skillPoints: 0,
};

export const enemiesResources = {
  goldenPig: RESOURCES_GODLEN_PIG,
  gnomeTrader: RESOURCES_GNOME_TRADER,
  seaMonster: RESOURCES_SEA_MONSTER,
  treasureBox: RESOURCES_TREASURE_BOX,
  beast: RESOURCES_BEAST,
  beast_2: RESOURCES_BEAST_2,
  beast_3: RESOURCES_BEAST_3,
  beast_4: RESOURCES_BEAST_4,
  beast_5: RESOURCES_BEAST_5,
  rogue: RESOURCES_ROGUE,
  rogue_2: RESOURCES_ROGUE_2,
  rogue_3: RESOURCES_ROGUE_3,
  rogue_4: RESOURCES_ROGUE_4,
  rogue_5: RESOURCES_ROGUE_5,
  goblin: RESOURCES_GOBLIN,
  goblin_2: RESOURCES_GOBLIN_2,
  goblin_3: RESOURCES_GOBLIN_3,
  goblin_4: RESOURCES_GOBLIN_4,
  goblin_5: RESOURCES_GOBLIN_5,
  gnome: RESOURCES_GNOME,
  gnome_2: RESOURCES_GNOME_2,
  gnome_3: RESOURCES_GNOME_3,
  gnome_4: RESOURCES_GNOME_4,
  gnome_5: RESOURCES_GNOME_5,
  naga: RESOURCES_NAGA,
  naga_2: RESOURCES_NAGA_2,
  naga_3: RESOURCES_NAGA_3,
  naga_4: RESOURCES_NAGA_4,
  naga_5: RESOURCES_NAGA_5,
  skeleton: RESOURCES_SKELETON,
  skeleton_2: RESOURCES_SKELETON_2,
  skeleton_3: RESOURCES_SKELETON_3,
  skeleton_4: RESOURCES_SKELETON_4,
  skeleton_5: RESOURCES_SKELETON_5,
};

export const HERO_REWARD: heroReward = {
  exp: 0,
  gold: 0,
  skillPoints: 0,
  talent: null,
};
