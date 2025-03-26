import { IEnemy } from "@/types/enemy.types";
import { heroSkills, IHero } from "@/types/hero.types";
import { getRandom } from "@/utils/getRandom";
import { applyPowerSkill, goHealHeroOfSkill, getСombatTechniquesSkill } from "../../utils";
import { goStun } from "@/constants/func/fight";

const SKILLS_BOXER: heroSkills[] = [
  {
    label: "Апперкот",
    descr: function () {
      return `Атакует противника, нанося ${(
        this.data.modifier * 100
      ).toFixed()}% урона. От этого удара невозможно уклониться. Стоимость - ${this.data.costEnergy} энергии`;
    },
    img: "/assets/skill/skill_boxer_1.png",
    data: {
      costEnergy: 160,
      modifier: 1.75,
      totalCooldown: 10,
      count: 0,
      power_2_2: {
        isOpen: false,
        modifierPower: 0,
      },
      power_5_1: {
        isOpen: false,
        modifierPower: 0,
        durationStun: 2,
      },
      agility_2_2: {
        isOpen: false,
        modifierDef: 0,
        duration: 0,
      },
    },
    trigger: "active",
    fn: function (this: heroSkills[], hero: IHero, target: IHero | IEnemy) {
      hero.pushSkillText(this[0].label);
      const data = this[0].data;

      let bonusDamage = 0;
      if (data.power_5_1.isOpen) {
        bonusDamage += hero.getters.getPower() * data.power_5_1.modifierPower;
      }

      hero.attack(target, { modifier: data.modifier, isIgnoreAvade: true, bonusDamage });
      if (data.power_2_2) {
        const heal = hero.getters.getPower() * data.power_2_2.modifierPower;
        goHealHeroOfSkill(hero, heal, 0);
      }
      if (data.power_5_1.isOpen) {
        goStun(hero, data.power_5_1.durationStun);
      }
      if (data.agility_2_2.isOpen) {
        const decDef = Math.floor(target.getters.getDef() * data.agility_2_2.modifierDef);
        target.setters.incDef(-decDef);
        console.log(decDef);
        setTimeout(() => {
          target.setters.incDef(decDef);
        }, data.agility_2_2.duration * 1000);
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
      intellect_3_1: {
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
          if (data.intellect_3_1.isOpen) {
            healValue += hero.getters.getIntellect() * data.intellect_3_1.modifierHeal;
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
      power_3_1: {
        isOpen: false,
        stunChance: 0,
        stunDuration: 0,
        energy: 0,
      },
      agility_5_1: {
        isOpen: false,
        chance: 0,
        modifier: 0,
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
          if (data.power_3_1.isOpen) {
            const stunChance = getRandom(1, 100);
            if (stunChance <= data.power_3_1.stunChance) {
              goStun(target, data.power_3_1.stunDuration);
            }
            hero.energy.value += data.power_3_1.energy;
          }

          if (data.agility_5_1.isOpen) {
            const chance = getRandom(1, 100);
            if (chance <= data.agility_5_1.chance) {
              setTimeout(() => {
                hero.attack(target, { modifier: data.agility_5_1.modifier });
              }, 150);
            }
          }

          target.update();
        }, 150);
      }
    },
  },
  getСombatTechniquesSkill(),
];

export default SKILLS_BOXER;
