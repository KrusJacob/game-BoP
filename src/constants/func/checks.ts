import { IEnemy } from "@/types/enemy.types";
import { ICharacter, IHero } from "@/types/hero.types";
import { getRandom } from "@/utils/getRandom";

export function checkForCrit(chance: number) {
  return chance >= getRandom(1, 100);
}

export function checkForEvade(chance: number) {
  return chance >= getRandom(1, 100);
}

export function checkForStun(hero: ICharacter) {
  return hero.status.stun.isStun;
}

export function checkForDeath(hero: ICharacter) {
  return hero.status.death;
}
