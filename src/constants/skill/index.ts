import { IEnemy } from "@/types/enemy.types";
import { IHero, TypeSkillTrigger } from "@/types/hero.types";
import { skillEnemyTrigger } from "./enemy";
import { skillHeroTrigger } from "./heroes";

export function goSkillTrigger(
  trigger: keyof TypeSkillTrigger,
  initiator: IHero | IEnemy,
  target: IHero | IEnemy
) {
  if (initiator.type === "hero") {
    skillHeroTrigger[trigger].map((fn) => fn.call(initiator.skills, initiator, target));
  } else {
    skillEnemyTrigger[trigger].map((fn) => fn.call(initiator.skills, initiator, target));
  }
}
