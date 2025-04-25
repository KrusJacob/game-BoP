export type LOCATION = "darkForest" | "hiddenCave" | "azureCoast" | "snowMountains";
export interface locationItem {
  name: LOCATION;
  label: string;
  minLevel: number;
  maxLevel: number;
  img: string;
}
