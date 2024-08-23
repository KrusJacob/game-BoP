import { IEnemy } from "@/types/enemy.types";
import { IHero } from "../types/hero.types";

export function incHeroDamage(this: IHero["buffs"], value: number, duration?: number) {
  if (!duration) {
    this._damage += value;
  } else {
    this._damage += value;
    setTimeout(() => {
      this._damage -= value;
    }, duration * 1000);
  }
}
export function incHeroDef(this: IHero["buffs"], value: number, duration?: number) {
  if (!duration) {
    this._def += value;
  } else {
    this._def += value;
    setTimeout(() => {
      this._def -= value;
    }, duration * 1000);
  }
}
export function incHeroAttackSpeed(this: IHero["buffs"], value: number, duration?: number) {
  if (!duration) {
    this._attackSpeed += value;
  } else {
    this._attackSpeed += value;
    setTimeout(() => {
      this._attackSpeed -= value;
    }, duration * 1000);
  }
}
export function getBuffDamage(this: IHero["buffs"]) {
  return this._damage / 100 + 1;
}
export function getBuffDef(this: IHero["buffs"]) {
  return (100 - this._def) / 100;
}
export function getBuffAttackSpeed(this: IHero["buffs"]) {
  return this._attackSpeed / 100 + 1;
}

export function getBarrier(this: IHero | IEnemy, value: number) {
  console.log("getBarrier");
  const barrierValue = Math.min(value, this.getters.getMaxHp() - this.barrier);
  this.barrier += barrierValue;

  if (this.barrier < 0) {
    this.barrier = 0;
  }
}

export function getHeal(this: IHero | IEnemy, value: number) {
  if (!this.status.death) {
    this.HP += Math.min(this.getters.getMaxHp() - this.HP, value);
    this.update();
  }
}
