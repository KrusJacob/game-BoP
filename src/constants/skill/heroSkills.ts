import { IHero, heroSkills } from "@/types/hero.types";
import { CHANCE_CRITICAL_DAMAGE, CHANCE_EVADE } from "../setup";
import { IEnemy } from "@/types/enemy.types";
import { getRandom } from "@/utils/getRandom";
import { getPercent } from "@/utils/getPercent";
import { applyPowerSkill } from "./utils";

const SKILLS_BOXER: heroSkills[] = [
  {
    label: function () {
      return `Апперкот. Наносит урон противнику в размере ${this.value.modifier * 100}% от атаки. Перезарядка - ${
        this.value.totalCooldown
      } секунд`;
    },
    img: "/src/assets/skill/skill_boxer_1.png",
    value: {
      modifier: 1.5,
      totalCooldown: 15,
      count: 0,
    },
    // trigger: "active",
    // fn: function (this: heroSkills[], hero: IHero, target: IHero | IEnemy) {
    //   if (this[0].value.count === 0) {
    //     console.log("skill 0");
    //     hero.attack(target, { modifier: this[0].value.modifier, isIgnoreAvade: true });
    //     target.update();

    //     this[0].value.count = 15;
    //     const interval = setInterval(() => {
    //       this[0].value.count -= 1;
    //       if (this[0].value.count === 0) {
    //         clearInterval(interval);
    //       }
    //     }, 1000);

    //     // setTimeout(() => (this[0].value.count = 0), this[0].value.totalCooldown * 1000);
    //   }
    // },
  },
  {
    label: function () {
      return `Шестое чувство`;
    },
    img: "/src/assets/skill/skill_boxer_2.png",
    value: {},
  },
  {
    label: function () {
      return `Хук левой. После атаки героя с шансом ${this.value?.chance}% проводит дополнительную атаку, c ${
        this.value.modifier * 100
      }% урона от атаки`;
    },
    img: "/src/assets/skill/skill_boxer_3.png",
    value: {
      chance: 20,
      modifier: 0.5,
    },
    trigger: "afterHeroAttack",
    fn: function (this: heroSkills[], hero: IHero, target: IHero | IEnemy) {
      const chance = getRandom(1, 100);
      if (chance <= this[2].value.chance) {
        setTimeout(() => {
          hero.attack(target, { modifier: this[2].value.modifier });
          target.update();
        }, 300);
      }
    },
  },
  {
    label: function () {
      return `Шанс критического удара: ${this.value?.chanceCritDamage}%, Шанс уклонения: ${this.value?.chanceEvade}% `;
    },
    img: "/src/assets/skill/chances.png",
    value: {
      chanceCritDamage: CHANCE_CRITICAL_DAMAGE,
      chanceEvade: CHANCE_EVADE,
    },
  },
];

const SKILLS_PROGRAMMER: heroSkills[] = [
  {
    label: function () {
      return `Описание способности. В разработке...`;
    },
    img: "/src/assets/skill/skill_programmer_1.png",
    value: {},
  },
  {
    label: function () {
      return `Брандмауэр. В Начале боя активирует барьер, поглощающий входящий урон. Обьем барьера зависит от интеллекта и силы умений`;
    },
    img: "/src/assets/skill/skill_programmer_2.png",
    value: {
      modifier: 3,
      barrierValue: 150,
    },
    trigger: "inBeginFight",
    fn: function (this: heroSkills[], hero: IHero, target: IHero | IEnemy) {
      let totalBarrier = hero.getters.getIntellect() * this[1].value.modifier + this[1].value.barrierValue;
      totalBarrier = applyPowerSkill(totalBarrier, hero.getters.getPowerSkill());
      hero.getBarrier(totalBarrier);
      hero.update();
    },
  },
  {
    label: function () {
      return `Описание способности. В разработке...`;
    },
    img: "/src/assets/skill/skill_programmer_3.png",
    value: {},
  },
  {
    label: function () {
      return `Шанс критического удара: ${this.value?.chanceCritDamage}%, Шанс уклонения: ${this.value?.chanceEvade}% `;
    },
    img: "/src/assets/skill/chances.png",
    value: {
      chanceCritDamage: CHANCE_CRITICAL_DAMAGE,
      chanceEvade: CHANCE_EVADE,
    },
  },
];

const SKILLS_COOK: heroSkills[] = [
  {
    label: function () {
      return `Описание способности. В разработке...`;
    },
    img: "/src/assets/skill/skill_cook_1.png",
    value: {},
  },
  {
    label: function () {
      return `Сиропчик. После любого действия противника есть ${this.value.chance}% - шанс восстановить часть здоровья. Перезарядка: ${this.value.cooldownCount} с.`;
    },
    img: "/src/assets/skill/skill_cook_2.png",
    value: {
      chance: 20,
      healNumber: 50,
      healPercent: 5,
      cooldownCount: 5,
      isCooldown: false,
    },
    trigger: "afterEnemyAttack",
    fn: function (this: heroSkills[], hero: IHero, target: IHero | IEnemy) {
      const chance = getRandom(1, 100);
      const value = this[1].value;
      if (chance <= value.chance && !value.isCooldown) {
        console.log("heal");
        value.isCooldown = true;
        setTimeout(() => {
          value.isCooldown = false;
        }, value.cooldownCount * 1000);
        setTimeout(() => {
          let healValue = value.healNumber + getPercent(hero.getters.getMaxHp(), value.healPercent);
          healValue = applyPowerSkill(healValue, hero.getters.getPowerSkill());
          hero.getHeal(healValue);
          hero.update();
        }, 300);
      }
    },
  },
  {
    label: function () {
      return `Описание способности. В разработке...`;
    },
    img: "/src/assets/skill/skill_cook_3.png",
    value: {},
  },
  {
    label: function () {
      return `Шанс критического удара: ${this.value?.chanceCritDamage}%, Шанс уклонения: ${this.value?.chanceEvade}% `;
    },
    img: "/src/assets/skill/chances.png",
    value: {
      chanceCritDamage: CHANCE_CRITICAL_DAMAGE,
      chanceEvade: CHANCE_EVADE,
    },
  },
];

const SKILLS_HAIRDRESSER: heroSkills[] = [
  {
    label: function () {
      return `Описание способности. В разработке...`;
    },
    img: "/src/assets/skill/skill_hairdresser_1.png",
    value: {},
  },
  {
    label: function () {
      return `Заточенный инструмент. Каждая ${this.value.count} ваша атака игнорирует ${this.value.ignoreDef}% противника `;
    },
    img: "/src/assets/skill/skill_hairdresser_2.png",
    value: {
      count: 3,
      ignoreDef: 50,
      currentCount: 0,
    },
    trigger: "beforeHeroAttack",
    fn: function (this: heroSkills[], hero: IHero, target: IHero | IEnemy) {
      if (this[1].value.currentCount >= this[1].value.count) {
        hero.buffs.nextAttack.ignoreDef += 50;
        this[1].value.currentCount = 0;
      } else {
        this[1].value.currentCount += 1;
      }
    },
  },
  {
    label: function () {
      return `Описание способности. В разработке...`;
    },
    img: "/src/assets/skill/skill_hairdresser_3.png",
    value: {},
  },
  {
    label: function () {
      return `Шанс критического удара: ${this.value?.chanceCritDamage}%, Шанс уклонения: ${this.value?.chanceEvade}% `;
    },
    img: "/src/assets/skill/chances.png",
    value: {
      chanceCritDamage: CHANCE_CRITICAL_DAMAGE,
      chanceEvade: CHANCE_EVADE,
    },
  },
];

export { SKILLS_BOXER, SKILLS_COOK, SKILLS_PROGRAMMER, SKILLS_HAIRDRESSER };
