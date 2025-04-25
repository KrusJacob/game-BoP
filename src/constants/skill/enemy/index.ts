import { enemySkills } from "@/types/enemy.types";
import { TypeSkillTrigger, heroSkills } from "@/types/hero.types";

export const skillEnemyTrigger: TypeSkillTrigger = {
  active: [],
  inBeginFight: [],
  beforeInitiatorAttack: [],
  afterInitiatorAttack: [],
  beforeTargetAttack: [],
  afterTargetAttack: [],
  afterInitiatorMiss: [],
  afterTargetMiss: [],
  afterInitiatorCrit: [],
  afterTargetCrit: [],
  inEndFight: [],
};

export function clearEnemySkills() {
  Object.keys(skillEnemyTrigger).map((item) => (skillEnemyTrigger[item as keyof TypeSkillTrigger] = []));
}

export function registerEnemySkill(fn: Function, trigger: keyof TypeSkillTrigger) {
  skillEnemyTrigger[trigger].push(fn);
}

export function registerAllEnemySkills(skillsArr: enemySkills[]) {
  skillsArr.filter((item) => item.trigger).map((skill) => registerEnemySkill(skill.fn!, skill.trigger!));
}
