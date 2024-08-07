import { LOCATION } from "@/types/location.types";

// REST HP
export const HP_REST = 100;
export const HP_REST_PERCENT = 10;

// HERO MAIN STATS
export const MAX_HP_FROM_1_POWER = 10;
export const ATTACK_SPD_FROM_1_AGILITY = 0.01;
export const POWER_SKILL_FROM_1_INTELLECT = 0.7;

// HERO CHANCE
export const MULTIPLIER_CRITICAL_DAMAGE = 2;
export const CHANCE_CRITICAL_DAMAGE = 8;
export const CHANCE_EVADE = 8;
export const MULTIPLIER_COUNTER_ATTACK_DAMAGE = 0.5;

export const CHANCE_TO_LEGEND_ENEMY = 3;

export const COMLEXITY_LOCATIONS = {
  darkForest: {
    comlexity: 0,
  },
  hiddenCave: {
    comlexity: 0,
  },
  azureCoast: {
    comlexity: 0,
  },
  snowMountains: {
    comlexity: 0,
  },
};

export function incСomplexityLocation(location: LOCATION) {
  COMLEXITY_LOCATIONS[location].comlexity += 0.5;
}
