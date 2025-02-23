import { enemiesToLocation, enemyToTomb, enemyInfo, enemyName } from "@/types/enemy.types";
import { locationItem } from "@/types/location.types";
import { getRandom } from "@/utils/getRandom";
import { getEnemiesLocations } from "./location";
import { COMLEXITY_LOCATIONS, CHANCE_TO_LEGEND_ENEMY, incСomplexityLocation } from "./setup";

export const ALL_ENEMIES = [
  "goldenPig_L",
  "swampMonster_L",
  "gnomeTrader_L",
  "caveHorror_L",
  "seaMonster_L",
  "treasureBox_L",
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
  "skeleton",
  "skeleton_2",
  "skeleton_3",
  "skeleton_4",
  "skeleton_5",
] as const;

// export const ENEMIES_TO_DARK_FOREST = ["beast", "rogue", "beast_2", "rogue_2", "beast_3", "rogue_3"];
// export const ENEMIES_TO_HIDDEN_CAVE = ["gnome", "gnome_2", "gnome_3"];
// export const ENEMIES_TO_AZURE_COAST = ["gnome", "rogue", "gnome_2"];
// export const ENEMIES_TO_SNOW_MOUNTAINS = ["gnome", "rogue", "gnome_2"];
// export const ENEMIES_TO_DARK_FOREST: enemiesToLocation[] = [

export const ENEMIES_TO_TOBM: enemyToTomb[] = [
  {
    name: "beast_5",
    value: 100,
    defeated: false,
  },
  {
    name: "rogue_5",
    value: 100,
    defeated: false,
  },
  {
    name: "goblin_5",
    value: 100,
    defeated: false,
  },
  {
    name: "gnome_5",
    value: 100,
    defeated: false,
  },
  {
    name: "naga_5",
    value: 100,
    defeated: false,
  },
  {
    name: "skeleton_5",
    value: 100,
    defeated: false,
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
    [{ name: "rogue" }, { name: "rogue_2" }, { name: "beast_4" }],
    [{ name: "rogue" }, { name: "rogue_2" }, { name: "rogue_3" }, { name: "beast_4" }],
    [{ name: "rogue_2" }, { name: "rogue_3" }, { name: "beast_4" }],
    [{ name: "rogue_2" }, { name: "rogue_3" }, { name: "rogue_4" }],
    [{ name: "rogue_3" }, { name: "rogue_4" }],
  ],
  legendEnemies: [
    { name: "goldenPig_L", unique: true },
    { name: "swampMonster_L", unique: true },
  ],
};
export const ENEMIES_TO_HIDDEN_CAVE: enemiesToLocation = {
  enemies: [
    [{ name: "goblin" }, { name: "goblin_2" }],
    [{ name: "goblin" }, { name: "goblin_2" }, { name: "goblin_3" }],
    [{ name: "goblin_2" }, { name: "goblin_3" }],
    [{ name: "goblin_2" }, { name: "goblin_3" }, { name: "goblin_4" }],
    [{ name: "goblin_3" }, { name: "goblin_4" }],
    [{ name: "goblin_3" }, { name: "goblin_4" }, { name: "gnome" }],
    [{ name: "goblin_4" }, { name: "gnome" }], //
    [{ name: "gnome" }, { name: "gnome_2" }, { name: "goblin_4" }],
    [{ name: "gnome" }, { name: "gnome_2" }, { name: "gnome_3" }, { name: "goblin_4" }],
    [{ name: "gnome_2" }, { name: "gnome_3" }, { name: "goblin_4" }],
    [{ name: "gnome_2" }, { name: "gnome_3" }, { name: "gnome_4" }],
    [{ name: "gnome_3" }, { name: "gnome_4" }],
  ],
  legendEnemies: [
    { name: "gnomeTrader_L", unique: true },
    { name: "caveHorror_L", unique: true },
  ],
};
export const ENEMIES_TO_AZURE_COAST: enemiesToLocation = {
  enemies: [
    [{ name: "naga" }, { name: "naga_2" }],
    [{ name: "naga" }, { name: "naga_2" }, { name: "naga_3" }],
    [{ name: "naga_2" }, { name: "naga_3" }],
    [{ name: "naga_2" }, { name: "naga_3" }, { name: "naga_4" }],
    [{ name: "naga_3" }, { name: "naga_4" }],
    [{ name: "naga_3" }, { name: "naga_4" }, { name: "skeleton" }],
    [{ name: "naga_4" }, { name: "skeleton" }],
    [{ name: "skeleton" }, { name: "skeleton_2" }, { name: "naga_4" }],
    [{ name: "skeleton" }, { name: "skeleton_2" }, { name: "skeleton_3" }, { name: "naga_4" }],
    [{ name: "skeleton_2" }, { name: "skeleton_3" }, { name: "naga_4" }],
    [{ name: "skeleton_2" }, { name: "skeleton_3" }, { name: "skeleton_4" }],
    [{ name: "skeleton_3" }, { name: "skeleton_4" }],
  ],
  legendEnemies: [
    { name: "seaMonster_L", unique: true },
    { name: "treasureBox_L", unique: true },
  ],
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
