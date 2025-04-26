import { LOCATION, locationItem } from "@/types/location.types";
import { CHANCE_TO_LEGEND_ENEMY } from "../setup";
import { enemyInfo, enemyName } from "@/types/enemy.types";
import { COMLEXITY_LOCATIONS, getEnemiesLocations } from "./locations";
import { getRandom } from "@/utils/getRandom";

function getComlexityEnemies(location: locationItem["name"]) {
  return Math.floor(COMLEXITY_LOCATIONS[location].comlexity);
}

export function searchEnemy(location: locationItem["name"]) {
  const res: enemyName[] = [];
  const arrEnemies = getEnemiesLocations(location);
  const comlexity = getComlexityEnemies(location);
  const chanceToLegend = getRandom(0, 100);
  let enemiesInComlexity = arrEnemies.enemies[comlexity];

  if (chanceToLegend <= CHANCE_TO_LEGEND_ENEMY && arrEnemies.legendEnemies.length) {
    pushEnemy(res, arrEnemies.legendEnemies);
    pushEnemy(res, enemiesInComlexity);
  } else {
    pushEnemy(res, enemiesInComlexity);
    pushEnemy(res, enemiesInComlexity);
  }
  incСomplexityLocation(location, arrEnemies.enemies.length - 1);
  return res;
}

export function incСomplexityLocation(location: LOCATION, max: number) {
  if (COMLEXITY_LOCATIONS[location].comlexity < max) {
    COMLEXITY_LOCATIONS[location].comlexity += 0.5;
  }
}

function pushEnemy(res: enemyName[], enemiesArr: enemyInfo[]) {
  const enemyId = getRandom(0, enemiesArr.length - 1);
  if (res[0] === enemiesArr[enemyId].name) {
    res.push(enemiesArr[Math.abs(enemyId - 1)].name);
  } else {
    res.push(enemiesArr[enemyId].name);
  }

  if (enemiesArr[enemyId].unique) {
    enemiesArr.splice(enemyId, 1);
  }
}
