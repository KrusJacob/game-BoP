import { IHero, TypeSkillTrigger, heroSkills } from "@/types/hero.types";
import { AllLevels, TypeMainStat, UpSkill, UpgradeSkills, typeDescr } from "@/types/skill.types";

export const skillHeroTrigger: TypeSkillTrigger = {
  active: [],
  inBeginFight: [],
  inEndFight: [],
  beforeInitiatorAttack: [],
  afterInitiatorAttack: [],
  beforeTargetAttack: [],
  afterTargetAttack: [],
  afterInitiatorMiss: [],
  afterTargetMiss: [],
  afterInitiatorCrit: [],
  afterTargetCrit: [],
};

export function registerSkill(fn: Function, trigger: keyof TypeSkillTrigger) {
  skillHeroTrigger[trigger].push(fn);
}

export function registerAllSkills(skillsArr: heroSkills[]) {
  skillsArr.filter((item) => item.trigger).map((skill) => registerSkill(skill.fn!, skill.trigger!));
}

export function incPoint(this: UpSkill, upgradeSkills: UpgradeSkills) {
  if (this.currentPoint < this.maxPoints) {
    this.currentPoint += 1;
    upgradeSkills[this.branch].totalPoint += 1;
    if (upgradeSkills[this.branch].totalPoint === 5) {
      unlockSkills(upgradeSkills, this.branch, "level_2");
    }
    if (upgradeSkills[this.branch].totalPoint === 10) {
      unlockSkills(upgradeSkills, this.branch, "level_3");
    }
    if (upgradeSkills[this.branch].totalPoint === 15) {
      unlockSkills(upgradeSkills, this.branch, "level_4");
    }
    // if (upgradeSkills[this.branch].totalPoint === 12) {
    //   unlockSkills(upgradeSkills, this.branch, "level_5");
    // }
  }
}

export function unlockSkills(upgradeSkills: UpgradeSkills, branch: TypeMainStat, level: AllLevels) {
  upgradeSkills[branch].openLevels.push(level);
  upgradeSkills[branch][level].forEach((element) => {
    element.open = true;
  });
}

export function getText(this: UpSkill, value: string): typeDescr {
  if (this.currentPoint === 0) {
    return {
      current: "",
      next: this.data[value][this.currentPoint],
    };
  }
  return {
    current: this.data[value][this.currentPoint - 1],
    next: this.data[value][this.currentPoint],
  };
}

export function getValue(skill: UpSkill, field = "value", lastOnly?: boolean) {
  if (skill.currentPoint === 1 || lastOnly) {
    return skill.data[field][skill.currentPoint - 1];
  }
  return skill.data[field][skill.currentPoint - 1] - skill.data[field][skill.currentPoint - 2];
}
