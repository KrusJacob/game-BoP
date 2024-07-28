import { enemyType, enemyBaseStats } from "@/types/enemy.types";
import { heroType, heroBaseStats, heroSkills } from "@/types/hero.types";
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
} from "./enemy";
import { STATS_BOXER, STATS_PROGRAMMER, STATS_COOK, STATS_HAIRDRESSER } from "./hero";
import { SKILLS_ROGUE, SKILLS_GNOME } from "./skill/enemySkills";
import { SKILLS_BOXER, SKILLS_PROGRAMMER, SKILLS_COOK, SKILLS_HAIRDRESSER } from "./skill/heroSkills";
import { registerSkill } from "./fn";

export function getStatsToEnemy(type: enemyType): enemyBaseStats {
  switch (type) {
    case "rogue":
      return STATS_ROGUE;
    case "rogue_2":
      return STATS_ROGUE_2;
    case "rogue_3":
      return STATS_ROGUE_3;
    case "rogue_4":
      return STATS_ROGUE_4;
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
    case "rogue":
      return SKILLS_ROGUE;
    case "gnome":
      return SKILLS_GNOME;
    default:
      return SKILLS_ROGUE;
  }
}

export function getResourcesToEnemy(type: enemyType) {
  switch (type) {
    case "rogue":
      return RESOURCES_ROGUE;
    case "rogue_2":
      return RESOURCES_ROGUE_2;
    case "rogue_3":
      return RESOURCES_ROGUE_3;
    case "rogue_4":
      return RESOURCES_ROGUE_4;
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
