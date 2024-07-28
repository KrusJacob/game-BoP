export const HP_REST = 50;
export const HP_REST_PERCENT = 10;

export const MULTIPLIER_CRITICAL_DAMAGE = 2;
export const CHANCE_CRITICAL_DAMAGE = 8;
export const CHANCE_EVADE = 8;
export const MULTIPLIER_COUNTER_ATTACK_DAMAGE = 0.5;

export let minEnemy = 1;
export let maxEnemy = 2;

export function incСomplexity() {
  minEnemy += 0.6;
  maxEnemy += 0.7;
}
