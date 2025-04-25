import { IHero } from "@/types/hero.types";
import { HP_REST, HP_REST_PERCENT, PARAMETER_POINT_LEVEL } from "../setup";
import { IEnemy, enemyType } from "@/types/enemy.types";
import { EnemyClass } from "../inital/class";
import { HERO_REWARD } from "../enemy/enemyResources";
import { getTalent } from "../talent/actions";

function getGold(hero: IHero, goldValue: number) {
  if (hero.boost.gold) {
    goldValue += Math.floor((goldValue * hero.boost.gold) / 100);
  }
  hero.resources.gold += goldValue;
  return goldValue;
}

function getSkillPoint(hero: IHero, skillPointValue = 0) {
  hero.resources.skillPoints += skillPointValue;
  return skillPointValue;
}
function getParameterPoint(hero: IHero, parameterPoints = 0) {
  hero.resources.parameterPoints += parameterPoints;
  return parameterPoints;
}

export function getReward(hero: IHero, enemy: IEnemy | IHero) {
  if (enemy instanceof EnemyClass) {
    const goldReward = getGold(hero, enemy.resources.gold);
    const skillPointReward = getSkillPoint(hero, enemy.resources.skillPoints);
    const parameterPointReward = getParameterPoint(hero, enemy.resources.skillPoints);

    const expReward = hero.setters.incExp.call(hero, enemy.resources.exp);

    changeKillStatistic(hero.statistics.kills, enemy.name);
    changeTombProgressStatistic(hero.statistics.tombProgress, enemy);

    HERO_REWARD.exp = expReward;
    HERO_REWARD.gold = goldReward;
    HERO_REWARD.skillPoints = skillPointReward;
    HERO_REWARD.parameterPoints = parameterPointReward;

    restHero(hero);
  }
}

function changeKillStatistic(stats: IHero["statistics"]["kills"], enemyName: IEnemy["name"]) {
  if (stats[enemyName]) {
    // @ts-ignore
    stats[enemyName] += 1;
  } else {
    stats[enemyName] = 1;
  }
}

function changeTombProgressStatistic(stats: IHero["statistics"]["tombProgress"], enemy: IEnemy) {
  const enemytype = enemy.name.replace(/_\d/gm, "") as enemyType;
  switch (enemytype) {
    case "beast":
      stats[enemytype] += enemy.resources.tombProgress || 0;
      break;
    case "rogue":
      stats[enemytype] += enemy.resources.tombProgress || 0;
      break;
    case "goblin":
      stats[enemytype] += enemy.resources.tombProgress || 0;
      break;
    case "gnome":
      stats[enemytype] += enemy.resources.tombProgress || 0;
      break;
    case "naga":
      stats[enemytype] += enemy.resources.tombProgress || 0;
      break;
    default:
      return;
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

  HERO_REWARD.talent = getTalent(this);

  getSkillPoint(this, 1);
}

export function setMaxLevelExp(exp: number) {
  return Math.round(exp * 1.1 + 20);
}
