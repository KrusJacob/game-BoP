import { IHero } from "./hero.types";

export type TypeMainStat = "power" | "agility" | "intellect";

export interface UpSkill {
  name: string;
  img: string;
  maxPoints: number;
  currentPoint: number;
  inc: Function;
  open: boolean;
  branch: TypeMainStat;
  data: Record<string, any>;
  fn: (hero: IHero) => void;
  descr?: () => typeDescr;
}

export interface typeDescr {
  current: string;
  next: string;
}

export interface LevelsSkill {
  totalPoint: number;
  openLevels: string[];
  level_1: UpSkill[];
  level_2: UpSkill[];
  level_3: UpSkill[];
  level_4: UpSkill[];
  level_5: UpSkill[];
}
export type UpgradeSkills = Record<TypeMainStat, LevelsSkill>;
export type AllSkillLevels = "level_1" | "level_2" | "level_3" | "level_4" | "level_5";
