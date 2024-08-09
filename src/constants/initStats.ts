import { enemyType, enemyBaseStats } from "@/types/enemy.types";
import { heroType, heroBaseStats, heroSkills, heroIncStats } from "@/types/hero.types";
import {
  STATS_ROGUE,
  STATS_ROGUE_2,
  STATS_ROGUE_3,
  STATS_ROGUE_4,
  STATS_GNOME,
  STATS_GNOME_2,
  STATS_GNOME_3,
  STATS_GNOME_4,
  RESOURCES_ROGUE,
  RESOURCES_ROGUE_2,
  RESOURCES_ROGUE_3,
  RESOURCES_ROGUE_4,
  RESOURCES_GNOME,
  RESOURCES_GNOME_2,
  RESOURCES_GNOME_3,
  RESOURCES_GNOME_4,
  RESOURCES_BEAST,
  RESOURCES_BEAST_2,
  RESOURCES_BEAST_3,
  RESOURCES_BEAST_4,
  STATS_BEAST,
  STATS_BEAST_2,
  STATS_BEAST_3,
  STATS_BEAST_4,
  STATS_GOBLIN,
  STATS_GOBLIN_2,
  STATS_GOBLIN_3,
  STATS_GOBLIN_4,
  RESOURCES_GOBLIN,
  RESOURCES_GOBLIN_2,
  RESOURCES_GOBLIN_3,
  RESOURCES_GOBLIN_4,
} from "./enemy";
import { STATS_BOXER, STATS_PROGRAMMER, STATS_COOK, STATS_HAIRDRESSER } from "./hero";
import { SKILLS_ROGUE, SKILLS_GNOME, SKILLS_BEAST, SKILLS_GOBLIN } from "./skill/enemySkills";
import { SKILLS_BOXER, SKILLS_PROGRAMMER, SKILLS_COOK, SKILLS_HAIRDRESSER } from "./skill/heroSkills";

export function getStatsToEnemy(type: enemyType): enemyBaseStats {
  switch (type) {
    case "beast":
      return STATS_BEAST;
    case "beast_2":
      return STATS_BEAST_2;
    case "beast_3":
      return STATS_BEAST_3;
    case "beast_4":
      return STATS_BEAST_4;
    case "rogue":
      return STATS_ROGUE;
    case "rogue_2":
      return STATS_ROGUE_2;
    case "rogue_3":
      return STATS_ROGUE_3;
    case "rogue_4":
      return STATS_ROGUE_4;
    case "goblin":
      return STATS_GOBLIN;
    case "goblin_2":
      return STATS_GOBLIN_2;
    case "goblin_3":
      return STATS_GOBLIN_3;
    case "goblin_4":
      return STATS_GOBLIN_4;
    case "gnome":
      return STATS_GNOME;
    case "gnome_2":
      return STATS_GNOME_2;
    case "gnome_3":
      return STATS_GNOME_3;
    case "gnome_4":
      return STATS_GNOME_4;
    default:
      return STATS_ROGUE;
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
    case "beast":
      return SKILLS_BEAST;
    case "rogue":
      return SKILLS_ROGUE;
    case "gnome":
      return SKILLS_GNOME;
    case "goblin":
      return SKILLS_GOBLIN;
    default:
      return SKILLS_ROGUE;
  }
}

export function getResourcesToEnemy(type: enemyType) {
  switch (type) {
    case "beast":
      return RESOURCES_BEAST;
    case "beast_2":
      return RESOURCES_BEAST_2;
    case "beast_3":
      return RESOURCES_BEAST_3;
    case "beast_4":
      return RESOURCES_BEAST_4;
    case "rogue":
      return RESOURCES_ROGUE;
    case "rogue_2":
      return RESOURCES_ROGUE_2;
    case "rogue_3":
      return RESOURCES_ROGUE_3;
    case "rogue_4":
      return RESOURCES_ROGUE_4;
    case "goblin":
      return RESOURCES_GOBLIN;
    case "goblin_2":
      return RESOURCES_GOBLIN_2;
    case "goblin_3":
      return RESOURCES_GOBLIN_3;
    case "goblin_4":
      return RESOURCES_GOBLIN_4;
    case "gnome":
      return RESOURCES_GNOME;
    case "gnome_2":
      return RESOURCES_GNOME_2;
    case "gnome_3":
      return RESOURCES_GNOME_3;
    case "gnome_4":
      return RESOURCES_GNOME_4;
    default:
      return RESOURCES_ROGUE;
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
