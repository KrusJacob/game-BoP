export function applyPowerSkill(value: number, powerSkill: number) {
  return Math.round(value * (powerSkill / 100 + 1));
}
