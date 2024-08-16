import { IHero, heroSkills } from "@/types/hero.types";
import { CHANCE_CRITICAL_DAMAGE, CHANCE_EVADE } from "../setup";
import { IEnemy } from "@/types/enemy.types";
import { getRandom } from "@/utils/getRandom";
import { applyPowerSkill, healHeroOfSkill } from "./utils";
import { goDotDmg } from "../fn";

const SKILLS_BOXER: heroSkills[] = [
  {
    label: "Апперкот",
    descr: function () {
      return `Наносит урон противнику в размере ${this.data.modifier * 100}% от атаки. Перезарядка - ${
        this.data.totalCooldown
      } секунд`;
    },
    img: "/src/assets/skill/skill_boxer_1.png",
    data: {
      modifier: 1.5,
      totalCooldown: 15,
      count: 0,
    },
    // trigger: "active",
    // fn: function (this: heroSkills[], hero: IHero, target: IHero | IEnemy) {
    //   if (this[0].data.count === 0) {
    //     console.log("skill 0");
    //     hero.attack(target, { modifier: this[0].data.modifier, isIgnoreAvade: true });
    //     target.update();

    //     this[0].data.count = 15;
    //     const interval = setInterval(() => {
    //       this[0].data.count -= 1;
    //       if (this[0].data.count === 0) {
    //         clearInterval(interval);
    //       }
    //     }, 1000);

    //     // setTimeout(() => (this[0].data.count = 0), this[0].data.totalCooldown * 1000);
    //   }
    // },
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
          healHeroOfSkill(hero, data.healValue, data.healPercent);
          hero.getBarrier(data.barrierValue);
        }, 250);
      }
    },
  },
  {
    label: "Хук левой",
    descr: function () {
      return `После атаки героя с шансом ${this.data?.chance}% проводит дополнительную атаку, c ${
        this.data.modifier * 100
      }% урона от атаки`;
    },
    img: "/src/assets/skill/skill_boxer_3.png",
    data: {
      chance: 18,
      modifier: 0.5,
    },
    trigger: "afterHeroAttack",
    fn: function (this: heroSkills[], hero: IHero, target: IHero | IEnemy) {
      const chance = getRandom(1, 100);
      if (chance <= this[2].data.chance && !target.status.death) {
        setTimeout(() => {
          hero.attack(target, { modifier: this[2].data.modifier });
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

const SKILLS_PROGRAMMER: heroSkills[] = [
  {
    label: "",
    descr: function () {
      return `Описание способности. В разработке...`;
    },
    img: "/src/assets/skill/skill_programmer_1.png",
    data: {},
  },
  {
    label: "Брандмауэр",
    descr: function () {
      return `В Начале боя активирует барьер, поглощающий входящий урон. Обьем барьера зависит от интеллекта и силы умений`;
    },
    img: "/src/assets/skill/skill_programmer_2.png",
    data: {
      modifierOfIntellect: 3,
      barrierValue: 120,
    },
    trigger: "inBeginFight",
    fn: function (this: heroSkills[], hero: IHero) {
      console.log("barrier");
      let totalBarrier =
        hero.getters.getIntellect() * this[1].data.modifierOfIntellect + this[1].data.barrierValue;
      totalBarrier = applyPowerSkill(totalBarrier, hero.getters.getPowerSkill());
      hero.getBarrier(totalBarrier);
      hero.update();
    },
  },
  {
    label: "Вирус",
    descr: function () {
      return `При каждой атаке есть ${this.data.chance}% шанс заразить противника вирусом. Максимум ${this.data.maxLayer} слоя. Каждый слой снижает наносимый урон противника на ${this.data.modifier}% и длиться ${this.data.duration} секунд`;
    },
    img: "/src/assets/skill/skill_programmer_3.png",
    data: {
      chance: 25,
      maxLayer: 3,
      modifier: 15,
      applyedLayer: 0,
      duration: 6,
    },
    trigger: "afterHeroAttack",
    fn: function (this: heroSkills[], target: IHero | IEnemy) {
      const data = this[2].data;
      const chance = getRandom(1, 100);

      if (chance <= data.chance && data.applyedLayer < data.maxLayer) {
        console.log(`вирус ${data.applyedLayer + 1}`);
        target.buffs.incDamage(-data.modifier, data.duration);
        data.applyedLayer += 1;
        console.log(data.applyedLayer, "layer");
        setTimeout(() => {
          data.applyedLayer -= 1;
          console.log("layer снялся");
        }, data.duration * 1000);
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

const SKILLS_COOK: heroSkills[] = [
  {
    label: "",
    descr: function () {
      return `Описание способности. В разработке...`;
    },
    img: "/src/assets/skill/skill_cook_1.png",
    data: {},
  },
  {
    label: "Сиропчик",
    descr: function () {
      return `После любого действия противника есть ${this.data.chance}% - шанс восстановить часть здоровья. Перезарядка: ${this.data.cooldownCount} с.`;
    },
    img: "/src/assets/skill/skill_cook_2.png",
    data: {
      chance: 20,
      healValue: 50,
      healPercent: 5,
      cooldownCount: 5,
      isCooldown: false,
    },
    trigger: "afterEnemyAttack",
    fn: function (this: heroSkills[], hero: IHero) {
      const chance = getRandom(1, 100);
      const data = this[1].data;
      if (chance <= data.chance && !data.isCooldown) {
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
      modifierOfIntellect: 1.2,
      initalValue: 20,
      isPoisoned: false,
    },
    trigger: "afterHeroAttack",
    fn: function (this: heroSkills[], hero: IHero, target: IHero | IEnemy) {
      const data = this[2].data;
      const chance = getRandom(1, 100);
      if (chance <= data.chance && !data.isPoisoned) {
        console.log("Отравлен");
        data.isPoisoned = true;
        setTimeout(() => {
          data.isPoisoned = false;
        }, data.duration * 1000);

        let poisinValue = Math.round(hero.getters.getIntellect() * data.modifierOfIntellect + data.initalValue);
        poisinValue = applyPowerSkill(poisinValue, hero.getters.getPowerSkill());
        goDotDmg(hero, target, poisinValue, data.duration);
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
    },
    trigger: "beforeHeroAttack",
    fn: function (this: heroSkills[], hero: IHero) {
      if (this[1].data.currentCount >= this[1].data.count) {
        hero.buffs.nextAttack.ignoreDef += 50;
        this[1].data.currentCount = 1;
      } else {
        this[1].data.currentCount += 1;
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
      healValue: 100,
      healPercent: 15,
      modifierDamage: 20,
      duration: 5,
    },
    trigger: "inBeginFight",
    fn: function (this: heroSkills[], hero: IHero) {
      const data = this[2].data;
      console.log("heal");
      healHeroOfSkill(hero, data.healValue, data.healPercent);
      hero.buffs.incDamage(data.modifierDamage, data.duration);
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

export { SKILLS_BOXER, SKILLS_COOK, SKILLS_PROGRAMMER, SKILLS_HAIRDRESSER };
