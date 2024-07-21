export const HP_REST = 50;
export const HP_REST_PERCENT = 10;

export const MULTIPLIER_CRITICAL_DAMAGE = 2;
export const MULTIPLIER_COUNTER_ATTACK_DAMAGE = 0.5;

export let minEnemy = 1;
export let maxEnemy = 2;

export function incСomplexity() {
  minEnemy += 0.7;
  maxEnemy += 0.8;
}
