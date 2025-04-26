import { heroSkills, IHero } from "@/types/hero.types";
import { applyPowerSkill, goMagicalDamage, goHealHeroOfSkill, getСombatTechniquesSkill } from "../../utils";
import { goBleedDmg, goStun } from "@/constants/func/effects";
import { IEnemy } from "@/types/enemy.types";
import { getPercent } from "@/utils/getPercent";
import { getRandom } from "@/utils/getRandom";

const SKILLS_HAIRDRESSER: heroSkills[] = [
  {
    label: "В две руки",
    descr: function () {
      return `Увеличивает скорость атаки на ${this.data.modifier}% на ${this.data.duration} секунд. Стоимость - ${this.data.costEnergy} энергии`;
    },
    img: "/assets/skill/skill_hairdresser_1.png",
    data: {
      costEnergy: 180,
      modifier: 35,
      duration: 6,
      power_2_2: {
        isOpen: false,
        modifierHeal: 0,
      },
      intellect_2_2: {
        isOpen: false,
        modifierMaxHp: 0,
        modifierIntellect: 0,
      },
    },
    trigger: "active",
    fn: function (this: heroSkills[], hero: IHero, target: IHero | IEnemy) {
      hero.pushSkillText(this[0].label);
      const data = this[0].data;
      hero.buffs.incAttackSpeed(data.modifier, data.duration);
      if (data.power_2_2.isOpen) {
        goHealHeroOfSkill(hero, 0, data.power_2_2.modifierHeal);
      }
      if (data.intellect_2_2.isOpen) {
        const barrierOfMaxHp = getPercent(hero.getters.getMaxHp(), data.intellect_2_2.modifierMaxHp);
        const barrierOfIntellect = Math.floor(hero.getters.getIntellect() * data.intellect_2_2.modifierIntellect);
        hero.getBarrier(barrierOfMaxHp + barrierOfIntellect);
      }
    },
  },
  {
    label: "Заточенный инструмент",
    descr: function () {
      return `Каждая ${this.data.count} ваша атака игнорирует ${this.data.ignoreDef}% защиты противника `;
    },
    img: "/assets/skill/skill_hairdresser_2.png",
    data: {
      count: 3,
      ignoreDef: 50,
      currentCount: 1,
      power_3_1: {
        isOpen: false,
        modifierPower: 0,
      },
      intellect_1_2: {
        isOpen: false,
        modifierIntellect: 0,
      },
      intellect_3_1: {
        isOpen: false,
        chance: 0,
        duration: 0,
        modifierBleed: 0,
        isBleeded: false,
      },
      agility_5_1: {
        isOpen: false,
        modifierHeal: 0,
      },
    },
    trigger: "beforeInitiatorAttack",
    fn: function (this: heroSkills[], hero: IHero, target: IEnemy) {
      const data = this[1].data;
      if (data.currentCount >= data.count) {
        hero.buffs.nextAttack.ignoreDef = data.ignoreDef;

        data.currentCount = 1;
        if (data.power_3_1.isOpen) {
          const damage = hero.getters.getPower() * data.power_3_1.modifierPower;
          goMagicalDamage(hero, target, damage);
        }
        if (data.intellect_1_2.isOpen) {
          const damage = hero.getters.getIntellect() * data.intellect_1_2.modifierIntellect;
          goMagicalDamage(hero, target, damage);
        }
        if (data.agility_5_1.isOpen) {
          let heal = hero.getters.getAttack() * data.agility_5_1.modifierHeal;
          goHealHeroOfSkill(hero, heal, 0);
        }
        if (data.intellect_3_1.isOpen) {
          const chance = getRandom(1, 100);
          if (chance <= data.intellect_3_1.chance) {
            let bleedValue = getPercent(target.getters.getMaxHp(), data.intellect_3_1.modifierBleed);
            bleedValue = applyPowerSkill(bleedValue, hero.getters.getPowerSkill());
            goBleedDmg(hero, target, bleedValue, data.intellect_3_1.duration);
          }
        }
      } else {
        data.currentCount += 1;
      }
    },
  },
  {
    label: "Профессиональная подготовка",
    descr: function () {
      return `Перед каждым боем герой восстанавливает часть здоровья и увеличивает наносимый урон на ${this.data.modifierDamage}% на ${this.data.duration} секунд`;
    },
    img: "/assets/skill/skill_hairdresser_3.png",
    data: {
      healValue: 125,
      healPercent: 10,
      modifierDamage: 20,
      duration: 5,
      intellect_4_1: {
        isOpen: false,
        modifierStun: 0,
      },
      power_5_1: {
        isOpen: false,
        modifierDef: 0,
      },
    },
    trigger: "inBeginFight",
    fn: function (this: heroSkills[], hero: IHero, enemy: IEnemy) {
      hero.pushSkillText(this[2].label);
      const data = this[2].data;
      goHealHeroOfSkill(hero, data.healValue, data.healPercent);
      hero.buffs.incDamage(data.modifierDamage, data.duration);

      if (data.power_5_1.isOpen) {
        hero.buffs.incDef(data.power_5_1.modifierDef, data.duration);
      }

      if (data.intellect_4_1.isOpen) {
        goStun(enemy, data.intellect_4_1.modifierStun);
      }
    },
  },
  getСombatTechniquesSkill(),
];

export default SKILLS_HAIRDRESSER;
