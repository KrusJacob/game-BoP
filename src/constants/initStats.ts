import { enemyType, enemyBaseStats } from "@/types/enemy.types";
import { heroType, heroBaseStats, heroIncStats } from "@/types/hero.types";

import { STATS_BOXER, STATS_PROGRAMMER, STATS_COOK, STATS_HAIRDRESSER } from "./hero";
import {
  SKILLS_ROGUE,
  SKILLS_GNOME,
  SKILLS_BEAST,
  SKILLS_GOBLIN,
  SKILLS_GOLDEN_PIG,
  SKILLS_GNOME_TRADER,
} from "./skill/enemySkills";
import { SKILLS_BOXER, SKILLS_PROGRAMMER, SKILLS_COOK, SKILLS_HAIRDRESSER } from "./skill/heroSkills";
import { statsBeast, statsGnome, statsGoblin, statsLegend, statsRogue } from "./enemy";
import { enemiesResources } from "./resources";

export function getStatsToEnemy(type: enemyType): enemyBaseStats {
  switch (type) {
    case "golden-pig":
      return statsLegend.goldenPig;
    case "beast":
      return statsBeast.beast;
    case "beast_2":
      return statsBeast.beast_2;
    case "beast_3":
      return statsBeast.beast_3;
    case "beast_4":
      return statsBeast.beast_4;
    case "beast_5":
      return statsBeast.beast_5;
    case "rogue":
      return statsRogue.rogue;
    case "rogue_2":
      return statsRogue.rogue_2;
    case "rogue_3":
      return statsRogue.rogue_3;
    case "rogue_4":
      return statsRogue.rogue_4;
    case "rogue_5":
      return statsRogue.rogue_5;
    case "goblin":
      return statsGoblin.goblin;
    case "goblin_2":
      return statsGoblin.goblin_2;
    case "goblin_3":
      return statsGoblin.goblin_3;
    case "goblin_4":
      return statsGoblin.goblin_4;
    case "goblin_5":
      return statsGoblin.goblin_5;
    case "gnome-trader":
      return statsLegend.gnomeTrader;
    case "gnome":
      return statsGnome.gnome;
    case "gnome_2":
      return statsGnome.gnome_2;
    case "gnome_3":
      return statsGnome.gnome_3;
    case "gnome_4":
      return statsGnome.gnome_4;
    case "gnome_5":
      return statsGnome.gnome_5;
    default:
      return statsRogue.rogue;
  }
}

export function getStatsToHero(type: heroType): heroBaseStats {
  switch (type) {
    case "boxer":
      return STATS_BOXER;
    case "programmer":
      return STATS_PROGRAMMER;
    case "cook":
      return STATS_COOK;
    case "hairdresser":
      return STATS_HAIRDRESSER;
    default:
      return STATS_BOXER;
  }
}

export function getSkillsToEnemy(type: enemyType) {
  switch (type) {
    case "golden-pig":
      return SKILLS_GOLDEN_PIG;
    case "gnome-trader":
      return SKILLS_GNOME_TRADER;
    case "beast":
    case "beast_2":
    case "beast_3":
    case "beast_4":
    case "beast_5":
      return SKILLS_BEAST;
    case "rogue":
    case "rogue_2":
    case "rogue_3":
    case "rogue_4":
    case "rogue_5":
      return SKILLS_ROGUE;
    case "gnome":
    case "gnome_2":
    case "gnome_3":
    case "gnome_4":
    case "gnome_5":
      return SKILLS_GNOME;
    case "goblin":
    case "goblin_2":
    case "goblin_3":
    case "goblin_4":
    case "goblin_5":
      return SKILLS_GOBLIN;
    default:
      return SKILLS_ROGUE;
  }
}

export function getResourcesToEnemy(type: enemyType) {
  switch (type) {
    case "golden-pig":
      return enemiesResources.goldenPig;
    case "gnome-trader":
      return enemiesResources.gnomeTrader;
    case "beast":
      return enemiesResources.beast;
    case "beast_2":
      return enemiesResources.beast_2;
    case "beast_3":
      return enemiesResources.beast_3;
    case "beast_4":
      return enemiesResources.beast_4;
    case "beast_5":
      return enemiesResources.beast_5;
    case "rogue":
      return enemiesResources.rogue;
    case "rogue_2":
      return enemiesResources.rogue_2;
    case "rogue_3":
      return enemiesResources.rogue_3;
    case "rogue_4":
      return enemiesResources.rogue_4;
    case "rogue_5":
      return enemiesResources.rogue_5;
    case "goblin":
      return enemiesResources.goblin;
    case "goblin_2":
      return enemiesResources.goblin_2;
    case "goblin_3":
      return enemiesResources.goblin_3;
    case "goblin_4":
      return enemiesResources.goblin_4;
    case "goblin_5":
      return enemiesResources.goblin_4;
    case "gnome":
      return enemiesResources.gnome;
    case "gnome_2":
      return enemiesResources.gnome_2;
    case "gnome_3":
      return enemiesResources.gnome_3;
    case "gnome_4":
      return enemiesResources.gnome_4;
    case "gnome_5":
      return enemiesResources.gnome_5;
    default:
      return enemiesResources.beast;
  }
}

export function getSkillsToHero(type: heroType) {
  switch (type) {
    case "boxer":
      return SKILLS_BOXER;
    case "programmer":
      return SKILLS_PROGRAMMER;
    case "cook":
      return SKILLS_COOK;
    case "hairdresser":
      return SKILLS_HAIRDRESSER;
    default:
      return SKILLS_BOXER;
  }
}

export function getIncStatsToHero(): heroIncStats {
  return {
    agility: 0,
    attack: 0,
    attackSpeed: 0,
    def: 0,
    intellect: 0,
    maxHp: 0,
    power: 0,
    powerSkill: 0,
    maxHpFromPower: 0,
    attackSpeedFromAgility: 0,
    powerSkillFromIntellect: 0,
    ignoreDef: 0,
  };
}
