import { IHero } from "@/types/hero.types";
import { HP_REST, HP_REST_PERCENT, PARAMETER_POINT_LEVEL } from "../setup";
import { getTalent } from "../talent";
import { IEnemy } from "@/types/enemy.types";
import { getRandom } from "@/utils/getRandom";
import { EnemyClass } from "../class";
import { HERO_REWARD } from "../resources";
import { addItemToBag } from "../shop";
import { DROP_ENEMIES } from "../drop";

export function getReward(hero: IHero, enemy: IEnemy | IHero) {
  if (enemy instanceof EnemyClass) {
    let goldReward = enemy.resources.gold;
    let skillPointsReward = enemy.resources.skillPoints;
    if (hero.boost.gold) {
      goldReward += Math.floor((goldReward * hero.boost.gold) / 100);
    }
    hero.resources.gold += goldReward;
    const expReward = hero.setters.incExp.call(hero, enemy.resources.exp);
    hero.resources.skillPoints += skillPointsReward;

    //
    if (enemy.resources.drop) {
      let dropReward = getRandom(enemy.resources.drop.value[0], enemy.resources.drop.value[1]);
      hero.resources.drop[enemy.resources.drop.type] += dropReward;
      HERO_REWARD.drop = {
        label: enemy.resources.drop.label,
        type: enemy.resources.drop.type,
        value: dropReward,
      };
      let dropItem = DROP_ENEMIES[enemy.resources.drop?.type];
      dropItem = { ...dropItem, name: enemy.resources.drop.label, quantity: dropReward };
      const isSuccess = addItemToBag(hero.resources, dropItem, "end");
      console.log(hero.resources.bag);
      console.log(isSuccess, "isSuccess");
    } else {
      delete HERO_REWARD.drop;
    }
    HERO_REWARD.exp = expReward;
    HERO_REWARD.gold = goldReward;
    HERO_REWARD.skillPoints = skillPointsReward;

    restHero(hero);
  }
}

function restHero(hero: IHero) {
  const healValue = Math.round(hero.getters.getMaxHp() * (HP_REST_PERCENT / 100) + HP_REST);

  hero.getHeal(healValue);
}

export function incExp(this: IHero, exp = 0) {
  const totalExp = Math.floor(exp * (this.boost.exp / 100 + 1));
  if (this.level.exp + totalExp >= this.level.expToNextLevel) {
    incLevel.call(this);
    const remains = totalExp - this.level.expToNextLevel;
    this.level.expToNextLevel = setMaxLevelExp(this.level.expToNextLevel);
    this.level.incExp.call(this, remains);
  } else {
    this.level.exp += totalExp;
  }
  return totalExp;
}

function incLevel(this: IHero) {
  this.level.value += 1;
  this.resources.parameterPoints += PARAMETER_POINT_LEVEL;
  getTalent(this);
}

export function setMaxLevelExp(exp: number) {
  return Math.round(exp * 1.1 + 20);
}
