import { IHero, TypeSkillTrigger } from "@/types/hero.types";
import { talentType } from "@/types/talent.types";
import { registerSkill } from "../skill/heroes";
import { getRandom } from "@/utils/getRandom";
import { ALL_TALENTS } from "./talentItems";

export function registerTalent(talent: talentType, fn: Function, trigger: keyof TypeSkillTrigger) {
  registerSkill(fn.bind(talent), trigger);
}

export function getText(this: talentType, value: string) {
  if (this.level === 0) {
    return {
      current: "",
      next: this.data[value][this.level],
    };
  }
  return {
    current: this.data[value][this.level - 1],
    next: this.data[value][this.level],
  };
}
export function getValue(talent: talentType, field = "value") {
  if (talent.level === 1) {
    return talent.data[field][talent.level - 1];
  }
  return talent.data[field][talent.level - 1] - talent.data[field][talent.level - 2];
}

export function getTalent(hero: IHero): talentType {
  const arrTalents = ALL_TALENTS.filter((item) => item.level !== 5);
  const indexRandomTalent = getRandom(0, arrTalents.length - 1);
  const nameTalent = arrTalents[indexRandomTalent].name;
  const findedTalent = ALL_TALENTS.find((item) => item.name === nameTalent);
  if (findedTalent) {
    findedTalent.level += 1;
    findedTalent.fn(hero);
  }

  return findedTalent as talentType;
}
