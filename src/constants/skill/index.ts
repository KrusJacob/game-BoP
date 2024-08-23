import { TypeSkillTrigger, heroSkills } from "@/types/hero.types";

export const skillTrigger: TypeSkillTrigger = {
  active: [],
  inBeginFight: [],
  beforeHeroAttack: [],
  afterHeroAttack: [],
  beforeEnemyAttack: [],
  afterEnemyAttack: [],
  afterHeroAwade: [],
  afterEnemyAwade: [],
  afterHeroCrit: [],
  afterEnemyCrit: [],
};

export function registerSkill(fn: Function, trigger: keyof TypeSkillTrigger) {
  skillTrigger[trigger].push(fn);
}

export function registerAllSkills(skillsArr: heroSkills[]) {
  skillsArr.filter((item) => item.trigger).map((skill) => registerSkill(skill.fn!, skill.trigger!));
}
