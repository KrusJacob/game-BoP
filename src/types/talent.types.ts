import { IHero, TypeSkillTrigger } from "./hero.types";
import { typeDescr } from "./skill.types";

export interface talentType {
  name: string;
  img: string;
  level: number;
  data: Record<string, any>;
  descr: () => typeDescr;
  fn: (hero: IHero) => void;
  trigger?: keyof TypeSkillTrigger;
}
