import { enemiesToLocation, enemiesToTomb, enemyInfo, enemyName } from "@/types/enemy.types";
import { locationItem } from "@/types/location.types";
import { getRandom } from "@/utils/getRandom";
import { getEnemiesLocations } from "./location";
import { COMLEXITY_LOCATIONS, CHANCE_TO_LEGEND_ENEMY, incСomplexityLocation } from "./setup";

export const ALL_ENEMIES = [
  "golden-pig",
  "gnome-trader",
  "seaMonster",
  "beast",
  "beast_2",
  "beast_3",
  "beast_4",
  "beast_5",
  "rogue",
  "rogue_2",
  "rogue_3",
  "rogue_4",
  "rogue_5",
  "gnome",
  "gnome_2",
  "gnome_3",
  "gnome_4",
  "gnome_5",
  "goblin",
  "goblin_2",
  "goblin_3",
  "goblin_4",
  "goblin_5",
  "naga",
  "naga_2",
  "naga_3",
  "naga_4",
  "naga_5",
] as const;

// export const ENEMIES_TO_DARK_FOREST = ["beast", "rogue", "beast_2", "rogue_2", "beast_3", "rogue_3"];
// export const ENEMIES_TO_HIDDEN_CAVE = ["gnome", "gnome_2", "gnome_3"];
// export const ENEMIES_TO_AZURE_COAST = ["gnome", "rogue", "gnome_2"];
// export const ENEMIES_TO_SNOW_MOUNTAINS = ["gnome", "rogue", "gnome_2"];
// export const ENEMIES_TO_DARK_FOREST: enemiesToLocation[] = [

export const ENEMIES_TO_TOBM: enemiesToTomb[] = [
  {
    name: "beast_5",
    resource: {
      label: "Клык зверя",
      type: "fangsBeast",
      value: [30],
    },
  },
  {
    name: "rogue_5",
    resource: {
      label: "Кольцо убийцы",
      type: "rogueItem",
      value: [30],
    },
  },
  {
    name: "goblin_5",
    resource: {
      label: "Эмблема гоблина",
      type: "goblinItem",
      value: [30],
    },
  },
  {
    name: "gnome_5",
    resource: {
      label: "Монета гнома",
      type: "gnomeItem",
      value: [30],
    },
  },
  {
    name: "naga_5",
    resource: {
      label: "Подводное сокровище",
      type: "gillsNaga",
      value: [30],
    },
  },
];
//

export const ENEMIES_TO_DARK_FOREST: enemiesToLocation = {
  enemies: [
    [{ name: "beast" }, { name: "beast_2" }],
    [{ name: "beast" }, { name: "beast_2" }, { name: "beast_3" }],
    [{ name: "beast_2" }, { name: "beast_3" }],
    [{ name: "beast_2" }, { name: "beast_3" }, { name: "beast_4" }],
    [{ name: "beast_3" }, { name: "beast_4" }],
    [{ name: "beast_3" }, { name: "beast_4" }, { name: "rogue" }],
    [{ name: "beast_4" }, { name: "rogue" }],
    [{ name: "rogue" }, { name: "rogue_2" }],
    [{ name: "rogue" }, { name: "rogue_2" }, { name: "rogue_3" }],
    [{ name: "rogue_2" }, { name: "rogue_3" }],
    [{ name: "rogue_2" }, { name: "rogue_3" }, { name: "rogue_4" }],
    [{ name: "rogue_3" }, { name: "rogue_4" }],
  ],
  legendEnemies: [{ name: "golden-pig", unique: true }],
};
export const ENEMIES_TO_HIDDEN_CAVE: enemiesToLocation = {
  enemies: [
    [{ name: "goblin" }, { name: "goblin_2" }],
    [{ name: "goblin" }, { name: "goblin_2" }, { name: "goblin_3" }],
    [{ name: "goblin_2" }, { name: "goblin_3" }],
    [{ name: "goblin_2" }, { name: "goblin_3" }, { name: "goblin_4" }],
    [{ name: "goblin_3" }, { name: "goblin_4" }],
    [{ name: "goblin_3" }, { name: "goblin_4" }, { name: "gnome" }],
    [{ name: "goblin_4" }, { name: "gnome" }],
    [{ name: "gnome" }, { name: "gnome_2" }],
    [{ name: "gnome" }, { name: "gnome_2" }, { name: "gnome_3" }],
    [{ name: "gnome_2" }, { name: "gnome_3" }],
    [{ name: "gnome_2" }, { name: "gnome_3" }, { name: "gnome_4" }],
    [{ name: "gnome_3" }, { name: "gnome_4" }],
  ],
  legendEnemies: [{ name: "gnome-trader", unique: true }],
};
export const ENEMIES_TO_AZURE_COAST: enemiesToLocation = {
  enemies: [
    [{ name: "naga" }, { name: "naga_2" }],
    [{ name: "naga" }, { name: "naga_2" }, { name: "naga_3" }],
    [{ name: "naga_2" }, { name: "naga_3" }],
    [{ name: "naga_2" }, { name: "naga_3" }, { name: "naga_4" }],
    [{ name: "naga_3" }, { name: "naga_4" }],
  ],
  legendEnemies: [{ name: "seaMonster", unique: true }],
};
// Hidden Cave
// azure coast
// snow mountains
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
