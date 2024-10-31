import { CHANCE_CRITICAL_DAMAGE, CHANCE_EVADE } from "@/constants/setup";
import { IEnemy } from "@/types/enemy.types";
import { heroSkills, IHero } from "@/types/hero.types";
import { getRandom } from "@/utils/getRandom";
import { healHeroOfSkill } from "../../utils";
import { goStun } from "@/constants/func/fight";

const SKILLS_BOXER: heroSkills[] = [
  {
    label: "Апперкот",
    descr: function () {
      return `Атакует противника, нанося ${(this.data.modifier * 100).toFixed()}% урона. Стоимость - ${
        this.data.costEnergy
      } энергии`;
    },
    img: "/src/assets/skill/skill_boxer_1.png",
    data: {
      costEnergy: 170,
      modifier: 1.75,
      totalCooldown: 10,
      count: 0,
      power_2_2: {
        isOpen: false,
        modifierPower: 0,
      },
    },
    trigger: "active",
    fn: function (this: heroSkills[], hero: IHero, target: IHero | IEnemy) {
      const data = this[0].data;
      // if (this[0].data.count === 0) {
      hero.attack(target, { modifier: data.modifier, isIgnoreAvade: true });
      // target.update();
      if (data.power_2_2) {
        const heal = hero.getters.getPower() * data.power_2_2.modifierPower;
        healHeroOfSkill(hero, heal, 0);
      }
      // this[0].data.count = this[0].data.totalCooldown;
      // const interval = setInterval(() => {
      //   this[0].data.count -= 1;
      //   if (this[0].data.count === 0) {
      //     clearInterval(interval);
      //   }
      // }, 1000);

      // setTimeout(() => (this[0].data.count = 0), this[0].data.totalCooldown * 1000);
      // }
    },
  },
  {
    label: "Шестое чувство",
    descr: function () {
      return `После каждого уклонения герой восстанавливает часть здоровья и получает барьер, поглощающий входящий урон. Перезарядка: ${this.data.totalCooldown} секунд`;
    },
    img: "/src/assets/skill/skill_boxer_2.png",
    data: {
      healValue: 30,
      healPercent: 4,
      barrierValue: 100,
      totalCooldown: 6,
      isCooldown: false,
      talent_3_1: {
        isOpen: false,
        modifierHeal: 0,
      },
      power_3_2: {
        isOpen: false,
        valueEnergy: 0,
      },
    },
    trigger: "afterHeroAwade",
    fn: function (this: heroSkills[], hero: IHero) {
      const data = this[1].data;
      if (!data.isCooldown) {
        data.isCooldown = true;
        setTimeout(() => {
          data.isCooldown = false;
        }, data.totalCooldown * 1000);
        setTimeout(() => {
          let healValue = data.healValue;
          if (data.talent_3_1.isOpen) {
            healValue += Math.floor(hero.getters.getIntellect() * data.talent_3_1.modifierHeal);
          }
          if (data.power_3_2.isOpen) {
            hero.energy.value += data.power_3_2.valueEnergy;
          }
          healHeroOfSkill(hero, healValue, data.healPercent);
          hero.getBarrier(data.barrierValue);
        }, 250);
      }
    },
  },
  {
    label: "Хук левой",
    descr: function () {
      return `После атаки героя есть ${this.data?.chance}% шанс провести доп. атаку c ${
        this.data.modifier * 100
      }% урона`;
    },
    img: "/src/assets/skill/skill_boxer_3.png",
    data: {
      chance: 18,
      modifier: 0.5,
      talent_3_1: {
        isOpen: false,
        stunChance: 0,
        stunDuration: 0,
      },
    },
    trigger: "afterHeroAttack",
    fn: function (this: heroSkills[], hero: IHero, target: IHero | IEnemy) {
      const data = this[2].data;
      const chance = getRandom(1, 100);
      if (chance <= data.chance && !target.status.death) {
        setTimeout(() => {
          hero.attack(target, { modifier: data.modifier });
          if (data.talent_3_1.isOpen) {
            const stunChance = getRandom(1, 100);
            if (stunChance <= data.talent_3_1.stunChance) {
              goStun(target, data.talent_3_1.stunDuration);
            }
          }
          target.update();
        }, 250);
      }
    },
  },
  {
    label: "Техника боя",
    descr: function () {
      return `Шанс критического удара: ${this.data.chanceCritDamage}%, Шанс уклонения: ${this.data.chanceEvade}% `;
    },
    img: "/src/assets/skill/chances.png",
    data: {
      chanceCritDamage: CHANCE_CRITICAL_DAMAGE,
      chanceEvade: CHANCE_EVADE,
    },
  },
];

export default SKILLS_BOXER;
