import { CHANCE_CRITICAL_DAMAGE, CHANCE_EVADE } from "@/constants/setup";
import { heroSkills, IHero } from "@/types/hero.types";
import { healHeroOfSkill } from "../../utils";
import { goBleedDmg, goDamage, goFreeze, goStun } from "@/constants/func/fight";
import { IEnemy } from "@/types/enemy.types";
import { getPercent } from "@/utils/getPercent";
import { getRandom } from "@/utils/getRandom";

const SKILLS_HAIRDRESSER: heroSkills[] = [
  {
    label: "",
    descr: function () {
      return `Описание способности. В разработке...`;
    },
    img: "/src/assets/skill/skill_hairdresser_1.png",
    data: {},
  },
  {
    label: "Заточенный инструмент",
    descr: function () {
      return `Каждая ${this.data.count} ваша атака игнорирует ${this.data.ignoreDef}% защиты противника `;
    },
    img: "/src/assets/skill/skill_hairdresser_2.png",
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
    },
    trigger: "beforeHeroAttack",
    fn: function (this: heroSkills[], hero: IHero, enemy: IEnemy) {
      const data = this[1].data;
      if (data.currentCount >= data.count) {
        hero.buffs.nextAttack.ignoreDef += data.ignoreDef;

        data.currentCount = 1;
        if (data.power_3_1.isOpen) {
          const damage = Math.floor(hero.getters.getPower() * data.power_3_1.modifierPower);
          goDamage(enemy, damage);
        }
        if (data.intellect_1_2.isOpen) {
          const damage = Math.floor(hero.getters.getIntellect() * data.intellect_1_2.modifierIntellect);
          console.log(damage);
          goDamage(enemy, damage);
        }
        if (data.intellect_3_1.isOpen) {
          const chance = getRandom(1, 100);
          if (chance <= data.intellect_3_1.chance) {
            let bleedValue = getPercent(enemy.getters.getMaxHp(), data.intellect_3_1.modifierBleed);
            goBleedDmg(hero, enemy, bleedValue, data.intellect_3_1.duration);
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
    img: "/src/assets/skill/skill_hairdresser_3.png",
    data: {
      healValue: 125,
      healPercent: 10,
      modifierDamage: 20,
      duration: 5,
      intellect_4_1: {
        isOpen: false,
        modifierStun: 0,
      },
    },
    trigger: "inBeginFight",
    fn: function (this: heroSkills[], hero: IHero, enemy: IEnemy) {
      const data = this[2].data;
      console.log("heal", data.healPercent);
      healHeroOfSkill(hero, data.healValue, data.healPercent);
      hero.buffs.incDamage(data.modifierDamage, data.duration);

      if (data.intellect_4_1.isOpen) {
        goStun(enemy, data.intellect_4_1.modifierStun);
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

export default SKILLS_HAIRDRESSER;
