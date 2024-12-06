export type LOCATION = "darkForest" | "hiddenCave" | "azureCoast" | "snowMountains";
export interface locationItem {
  name: LOCATION;
  label: string;
  reqLevel: number;
  img: string;
}
