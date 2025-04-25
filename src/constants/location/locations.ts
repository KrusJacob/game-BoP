import { locationItem } from "@/types/location.types";
import { enemiesToLocation } from "@/types/enemy.types";
import { ENEMIES_TO_AZURE_COAST, ENEMIES_TO_DARK_FOREST, ENEMIES_TO_HIDDEN_CAVE } from "./enemies";

export const COMLEXITY_LOCATIONS = {
  darkForest: {
    comlexity: 0,
  },
  hiddenCave: {
    comlexity: 0,
  },
  azureCoast: {
    comlexity: 0,
  },
  snowMountains: {
    comlexity: 0,
  },
};

export const LOCATIONS: locationItem[] = [
  {
    name: "darkForest",
    label: "Темный Лес",
    minLevel: 1,
    maxLevel: 15,
    img: "/assets/location/dark_forest.png",
  },
  {
    name: "hiddenCave",
    label: "Скрытая Пещера",
    minLevel: 12,
    maxLevel: 27,
    img: "/assets/location/hidden_cave.png",
  },
  {
    name: "azureCoast",
    label: "Лазурное Прибережье",
    minLevel: 24,
    maxLevel: 39,
    img: "/assets/location/azure_coast.png",
  },
  {
    name: "snowMountains",
    label: "Заснеженные Горы (в разработке)",
    minLevel: 999,
    maxLevel: 999,
    img: "/assets/location/snow_mountains.png",
  },
];

export function getEnemiesLocations(location: locationItem["name"]): enemiesToLocation {
  switch (location) {
    case "darkForest":
      return ENEMIES_TO_DARK_FOREST;
    case "hiddenCave":
      return ENEMIES_TO_HIDDEN_CAVE;
    case "azureCoast":
      return ENEMIES_TO_AZURE_COAST;
    default:
      return ENEMIES_TO_DARK_FOREST;
    // case "snowMountains":
    //   return ENEMIES_TO_SNOW_MOUNTAINS;
  }
}
