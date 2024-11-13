import { enemyName, enemyBaseStats } from "@/types/enemy.types";
import { heroName, heroBaseStats, heroIncStats, heroBuffs } from "@/types/hero.types";

import { STATS_BOXER, STATS_PROGRAMMER, STATS_COOK, STATS_HAIRDRESSER } from "./hero";
import {
  SKILLS_ROGUE,
  SKILLS_GNOME,
  SKILLS_GOBLIN,
  SKILLS_GOLDEN_PIG,
  SKILLS_GNOME_TRADER,
  SKILLS_NAGA,
  SKILLS_SEA_MONSTER,
  SKILLS_SKELETON,
  SKILLS_BEAST,
  SKILLS_BEAST_BOSS,
} from "./skill/enemySkills";
import { SKILLS_BOXER, SKILLS_PROGRAMMER, SKILLS_COOK, SKILLS_HAIRDRESSER } from "./skill/heroSkills";
import { statsBeast, statsGnome, statsGoblin, statsLegend, statsNaga, statsRogue, statsSkeleton } from "./enemy";
import { enemiesResources } from "./resources";
import {
  getBuffAttackSpeed,
  getBuffDamage,
  getBuffDef,
  incHeroAttackSpeed,
  incHeroDamage,
  incHeroDef,
} from "./fn";

export function getStatsToEnemy(type: enemyName): enemyBaseStats {
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
    case "naga":
      return statsNaga.naga;
    case "naga_2":
      return statsNaga.naga_2;
    case "naga_3":
      return statsNaga.naga_3;
    case "naga_4":
      return statsNaga.naga_4;
    case "naga_5":
      return statsNaga.naga_5;
    case "seaMonster":
      return statsLegend.seaMonster;
    case "skeleton":
      return statsSkeleton.skeleton;
    case "skeleton_2":
      return statsSkeleton.skeleton_2;
    case "skeleton_3":
      return statsSkeleton.skeleton_3;
    case "skeleton_4":
      return statsSkeleton.skeleton_4;
    case "skeleton_5":
      return statsSkeleton.skeleton_5;
    case "treasureBox":
      return statsLegend.treasureBox;

    default:
      return statsRogue.rogue;
  }
}

export function getStatsToHero(type: heroName): heroBaseStats {
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

export function getSkillsToEnemy(type: enemyName) {
  switch (type) {
    case "golden-pig":
      return SKILLS_GOLDEN_PIG;
    case "gnome-trader":
      return SKILLS_GNOME_TRADER;
    case "seaMonster":
      return SKILLS_SEA_MONSTER;
    case "beast":
    case "beast_2":
    case "beast_3":
    case "beast_4":
      return SKILLS_BEAST;
    case "beast_5":
      return SKILLS_BEAST_BOSS;
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
    case "naga":
    case "naga_2":
    case "naga_3":
    case "naga_4":
    case "naga_5":
      return SKILLS_NAGA;
    case "skeleton":
    case "skeleton_2":
    case "skeleton_3":
    case "skeleton_4":
    case "skeleton_5":
      return SKILLS_SKELETON;
    default:
      return SKILLS_ROGUE;
  }
}

export function getResourcesToEnemy(type: enemyName) {
  switch (type) {
    case "golden-pig":
      return enemiesResources.goldenPig;
    case "gnome-trader":
      return enemiesResources.gnomeTrader;
    case "seaMonster":
      return enemiesResources.seaMonster;
    case "treasureBox":
      return enemiesResources.treasureBox;
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
    case "naga":
      return enemiesResources.naga;
    case "naga_2":
      return enemiesResources.naga_2;
    case "naga_3":
      return enemiesResources.naga_3;
    case "naga_4":
      return enemiesResources.naga_4;
    case "naga_5":
      return enemiesResources.naga_5;
    case "skeleton":
      return enemiesResources.skeleton;
    case "skeleton_2":
      return enemiesResources.skeleton_2;
    case "skeleton_3":
      return enemiesResources.skeleton_3;
    case "skeleton_4":
      return enemiesResources.skeleton_4;
    case "skeleton_5":
      return enemiesResources.skeleton_5;
    default:
      return enemiesResources.beast;
  }
}

export function getSkillsToHero(type: heroName) {
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

export function getBuffsToHero(): heroBuffs {
  return {
    nextAttack: {
      ignoreDef: 0,
    },
    _attackSpeed: 0,
    _damage: 0,
    _def: 0,
    incDamage: incHeroDamage,
    incDef: incHeroDef,
    incAttackSpeed: incHeroAttackSpeed,
    getBuffDamage: getBuffDamage,
    getBuffDef: getBuffDef,
    getBuffAttackSpeed: getBuffAttackSpeed,
  };
}

export function getIncStatsToHero(): heroIncStats {
  return {
    agility: 0,
    attack: 0,
    attackSpeed: 0,
    def: 0,
    magicDef: 0,
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
