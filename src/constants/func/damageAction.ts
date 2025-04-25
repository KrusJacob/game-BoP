import { IAttackInfo } from "@/types/hero.types";

export function physicalDamageAction(value: number): IAttackInfo["damage"] {
  return {
    type: "physical",
    value,
  };
}
export function magicalDamageAction(value: number): IAttackInfo["damage"] {
  return {
    type: "magical",
    value,
  };
}
export function pureDamageAction(value: number): IAttackInfo["damage"] {
  return {
    type: "pure",
    value,
  };
}
