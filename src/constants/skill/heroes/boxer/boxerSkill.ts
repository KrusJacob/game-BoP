import { IEnemy } from "@/types/enemy.types";
import { heroSkills, IHero } from "@/types/hero.types";
import { getRandom } from "@/utils/getRandom";
import { applyPowerSkill, goHealHeroOfSkill, getСombatTechniquesSkill } from "../../utils";
import { goStun } from "@/constants/func/fight";

const SKILLS_BOXER: heroSkills[] = [
  {
    label: "Апперкот",
    descr: function () {
      return `Атакует противника, нанося ${(this.data.modifier * 100).toFixed()}% урона. Стоимость - ${
        this.data.costEnergy
      } энергии`;
    },
    img: "/assets/skill/skill_boxer_1.png",
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
      hero.pushSkillText(this[0].label);
      const data = this[0].data;

      hero.attack(target, { modifier: data.modifier, isIgnoreAvade: true });
      if (data.power_2_2) {
        const heal = hero.getters.getPower() * data.power_2_2.modifierPower;
        goHealHeroOfSkill(hero, heal, 0);
      }
    },
  },
  {
    label: "Шестое чувство",
    descr: function () {
      return `После каждого уклонения герой восстанавливает часть здоровья и получает барьер, поглощающий входящий урон. Перезарядка: ${this.data.totalCooldown} секунд`;
    },
    img: "/assets/skill/skill_boxer_2.png",
    data: {
      healValue: 50,
      healPercent: 4,
      barrierValue: 75,
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
    trigger: "afterTargetMiss",
    fn: function (this: heroSkills[], hero: IHero) {
      const data = this[1].data;
      if (!data.isCooldown) {
        hero.pushSkillText(this[1].label);
        data.isCooldown = true;
        setTimeout(() => {
          data.isCooldown = false;
        }, data.totalCooldown * 1000);
        setTimeout(() => {
          let healValue = data.healValue;
          if (data.talent_3_1.isOpen) {
            healValue += hero.getters.getIntellect() * data.talent_3_1.modifierHeal;
          }
          if (data.power_3_2.isOpen) {
            hero.energy.value += data.power_3_2.valueEnergy;
          }
          goHealHeroOfSkill(hero, healValue, data.healPercent);
          const totalBarrier = applyPowerSkill(data.barrierValue, hero.getters.getPowerSkill());
          hero.getBarrier(totalBarrier);
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
    img: "/assets/skill/skill_boxer_3.png",
    data: {
      chance: 20,
      modifier: 0.5,
      talent_3_1: {
        isOpen: false,
        stunChance: 0,
        stunDuration: 0,
      },
    },
    trigger: "afterInitiatorAttack",
    fn: function (this: heroSkills[], hero: IHero, target: IHero | IEnemy) {
      const data = this[2].data;
      const chance = getRandom(1, 100);
      if (chance <= data.chance && !target.status.death) {
        setTimeout(() => {
          hero.pushSkillText(this[2].label);
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
  getСombatTechniquesSkill(),
];

export default SKILLS_BOXER;
