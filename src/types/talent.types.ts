import { IHero } from "./hero.types";

export interface talentType {
  name: string;
  img: string;
  level: number;
  data: Record<string, any>;
  descr: () => string;
  fn: (hero: IHero) => void;
}
