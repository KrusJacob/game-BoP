import { IAttackInfo } from "./hero.types";

export interface IBattleText {
  pushTextBattle: (info: IAttackInfo) => void;
}

export interface ISkillText {
  pushSkillText: (text: string) => void;
}
