import { goDamage, goPosionDmg } from "@/constants/func/fight";
import { CHANCE_CRITICAL_DAMAGE, CHANCE_EVADE } from "@/constants/setup";
import { IEnemy } from "@/types/enemy.types";
import { heroSkills, IHero } from "@/types/hero.types";
import { getRandom } from "@/utils/getRandom";
import { healHeroOfSkill, applyPowerSkill } from "../../utils";

const SKILLS_COOK: heroSkills[] = [
  {
    label: "Во все оружии",
    descr: function () {
      return `Повышает на ${this.data.duration} секунд наносимый урон героя на ${this.data.modifierDamage}% и снижает получаемый урон на ${this.data.modifierDef}%. Стоимость - ${this.data.costEnergy} энергии`;
    },
    img: "/src/assets/skill/skill_cook_1.png",
    data: {
      costEnergy: 160,
      modifierDamage: 15,
      modifierDef: 15,
      duration: 8,
      agility_2_2: {
        isOpen: true,
        modifier: 0,
      },
    },
    trigger: "active",
    fn: function (this: heroSkills[], hero: IHero, target: IHero | IEnemy) {
      hero.pushSkillText(this[0].label);
      const data = this[0].data;
      hero.buffs.incDamage(data.modifierDamage, data.duration);
      hero.buffs.incDef(data.modifierDef, data.duration);
      if (data.agility_2_2.isOpen) {
        hero.buffs.incAttackSpeed(data.agility_2_2.modifier, data.duration);
      }
    },
  },
  {
    label: "Сиропчик",
    descr: function () {
      return `После любого действия противника есть ${this.data.chance}% - шанс восстановить часть здоровья. Перезарядка: ${this.data.cooldownCount} с.`;
    },
    img: "/src/assets/skill/skill_cook_2.png",
    data: {
      chance: 20,
      healValue: 20,
      healPercent: 3,
      cooldownCount: 5,
      isCooldown: false,
    },
    trigger: "afterTargetAttack",
    fn: function (this: heroSkills[], hero: IHero) {
      const chance = getRandom(1, 100);
      const data = this[1].data;
      if (chance <= data.chance && !data.isCooldown) {
        hero.pushSkillText(this[1].label);
        console.log("heal");
        data.isCooldown = true;
        setTimeout(() => {
          data.isCooldown = false;
        }, data.cooldownCount * 1000);
        setTimeout(() => {
          healHeroOfSkill(hero, data.healValue, data.healPercent);
        }, 250);
      }
    },
  },
  {
    label: "Отвар яда",
    descr: function () {
      return `При каждой атаке есть ${this.data.chance}% шанс отравить врага ядом. Яд каждую секунду наносит магический урон и длиться ${this.data.duration} секунд`;
    },
    img: "/src/assets/skill/skill_cook_3.png",
    data: {
      chance: 20,
      duration: 5,
      modifierOfIntellect: 0.15,
      initalValue: 25,
      power_2_1: {
        isOpen: false,
        modifierPower: 0,
      },
      intellect_2_2: {
        isOpen: false,
        modifierDebuff: 0,
      },
      intellect_3_1: {
        isOpen: false,
        modifierOfIntellect: 0,
      },
    },
    trigger: "afterInitiatorAttack",
    fn: function (this: heroSkills[], hero: IHero, target: IHero | IEnemy) {
      const data = this[2].data;
      const chance = getRandom(1, 100);
      if (chance <= data.chance) {
        hero.pushSkillText(this[2].label);
        console.log("Отравлен");

        if (data.power_2_1.isOpen) {
          const damage = Math.floor(hero.getters.getPower() * data.power_2_1.modifierPower);
          goDamage(target, damage);
        }
        if (data.intellect_2_2.isOpen) {
          target.buffs.incDamage(-data.intellect_2_2.modifierDebuff, data.duration);
        }

        let poisinValue = Math.round(hero.getters.getIntellect() * data.modifierOfIntellect + data.initalValue);
        poisinValue = applyPowerSkill(poisinValue, hero.getters.getPowerSkill());
        if (data.intellect_3_1.isOpen) {
          poisinValue += Math.floor(hero.getters.getIntellect() * data.intellect_3_1.modifierOfIntellect);
          console.log(poisinValue);
        }
        goPosionDmg(hero, target, poisinValue, data.duration);
      }
    },
  },
  {
    label: "Техника боя",
    descr: function () {
      return `Шанс критического удара: ${this.data?.chanceCritDamage}%, Шанс уклонения: ${this.data?.chanceEvade}% `;
    },
    img: "/src/assets/skill/chances.png",
    data: {
      chanceCritDamage: CHANCE_CRITICAL_DAMAGE,
      chanceEvade: CHANCE_EVADE,
    },
  },
];

export default SKILLS_COOK;
