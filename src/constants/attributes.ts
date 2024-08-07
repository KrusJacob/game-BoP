import { IEnemy } from "@/types/enemy.types";
import { IHero } from "@/types/hero.types";
import { ATTACK_SPD_FROM_1_AGILITY, MAX_HP_FROM_1_POWER, POWER_SKILL_FROM_1_INTELLECT } from "./setup";

// Сила
// + макс HP
// 1 сила = 10 HP
// 100 сила = 1000 HP

// Ловкость
// + скорость атаки
// 1 ловкость = 0.01 ск.атаки
// 100 ловкость = 1 ск.атаки

// Интеллект
// + сила умений
// 1 интеллект = 0.75 сила умений
// 100 интеллект = 75 сила умений

export function updateMainStats(hero: IHero | IEnemy, stat: "power" | "agility" | "intellect" | "all") {
  switch (stat) {
    case "all": {
      updatePower(hero);
      updateAgility(hero);
      updateIntellect(hero);
      return;
    }
    case "power": {
      updatePower(hero);
      return;
    }
    case "agility": {
      updateAgility(hero);
      return;
    }
    case "intellect": {
      updateIntellect(hero);
      return;
    }
  }
}

function updatePower(hero: IHero | IEnemy) {
  const maxHpFromPower = Math.round(hero.getters.getPower() * MAX_HP_FROM_1_POWER);
  hero.incStats.maxHpFromPower = maxHpFromPower;
  hero.getHeal(maxHpFromPower);
}
function updateAgility(hero: IHero | IEnemy) {
  const attackSpeedFromAgility = +(hero.getters.getAgility() * ATTACK_SPD_FROM_1_AGILITY).toFixed(2);
  hero.incStats.attackSpeedFromAgility = attackSpeedFromAgility;
}
function updateIntellect(hero: IHero | IEnemy) {
  const powerSkillFromIntellect = Math.round(hero.getters.getIntellect() * POWER_SKILL_FROM_1_INTELLECT);
  hero.incStats.powerSkillFromIntellect = powerSkillFromIntellect;
}
