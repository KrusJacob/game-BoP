import { locationItem } from "@/types/location.types";
import {
  ENEMIES_TO_AZURE_COAST,
  // ENEMIES_TO_AZURE_COAST,
  ENEMIES_TO_DARK_FOREST,
  ENEMIES_TO_HIDDEN_CAVE,
  // ENEMIES_TO_HIDDEN_CAVE,
  // ENEMIES_TO_SNOW_MOUNTAINS,
} from "./enemies";
import { enemiesToLocation } from "@/types/enemy.types";

export const LOCATIONS: locationItem[] = [
  {
    name: "darkForest",
    label: "Темный Лес",
    reqLevel: 1,
    img: "/src/assets/location/dark_forest.png",
  },
  {
    name: "hiddenCave",
    label: "Скрытая Пещера",
    reqLevel: 8,
    img: "/src/assets/location/hidden_cave.png",
  },
  {
    name: "azureCoast",
    label: "Лазурное Прибережье",
    reqLevel: 16,
    img: "/src/assets/location/azure_coast.png",
  },
  {
    name: "snowMountains",
    label: "Заснеженные Горы",
    reqLevel: 24,
    img: "/src/assets/location/snow_mountains.png",
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
