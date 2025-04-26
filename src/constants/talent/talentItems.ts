import { IHero } from "@/types/hero.types";
import { talentType } from "@/types/talent.types";
import { getRandom } from "@/utils/getRandom";
import { IEnemy } from "@/types/enemy.types";
import { getPercent } from "@/utils/getPercent";
import { goHealTick, goStun } from "../func/effects";
import { goPureDamage } from "../skill/utils";
import { getEnergy } from "../func/getters";
import { getText, getValue, registerTalent } from "./actions";

export const ALL_TALENTS: talentType[] = [
  {
    name: "Грозный натиск",
    img: "/assets/talent/attack.png",
    level: 0,

    descr: function () {
      const text = getText.call(this, "value");
      return {
        current: text.current ? `Увеличивает урон героя на ${text.current}` : "",
        next: text.next ? `Увеличивает урон героя на ${text.next}` : "",
      };
    },
    data: {
      value: [14, 25, 36, 47, 58],
    },
    fn(hero: IHero) {
      hero.setters.incAttack(getValue(this));
    },
  },
  {
    name: "Несокрушимость",
    img: "/assets/talent/def.png",
    level: 0,

    descr: function () {
      const text = getText.call(this, "value");
      return {
        current: text.current ? `Увеличивает защиту героя на ${text.current}` : "",
        next: text.next ? `Увеличивает защиту героя на ${text.next}` : "",
      };
    },
    data: {
      value: [8, 14, 20, 26, 32],
    },
    fn(hero: IHero) {
      hero.setters.incDef(getValue(this));
    },
  },
  {
    name: "Магический заслон",
    img: "/assets/talent/magicDef.png",
    level: 0,

    descr: function () {
      const text = getText.call(this, "value");
      return {
        current: text.current ? `Увеличивает магическую защиту героя на ${text.current}` : "",
        next: text.next ? `Увеличивает магическую защиту героя на ${text.next}` : "",
      };
    },
    data: {
      value: [10, 15, 20, 25, 30],
    },
    fn(hero: IHero) {
      hero.setters.incMagicDef(getValue(this));
    },
  },

  {
    name: "Жизненные ресурсы",
    img: "/assets/talent/maxHp.png",
    level: 0,

    descr: function () {
      const text = getText.call(this, "value");
      return {
        current: text.current ? `Увеличивает максимальное здоровье героя на ${text.current}` : "",
        next: text.next ? `Увеличивает максимальное здоровье героя на ${text.next}` : "",
      };
    },
    data: {
      value: [180, 330, 480, 630, 780],
    },
    fn(hero: IHero) {
      hero.setters.incMaxHp(getValue(this));
    },
  },
  {
    name: "Сила гиганта",
    img: "/assets/talent/power.png",
    level: 0,

    descr: function () {
      const text = getText.call(this, "value");
      return {
        current: text.current ? `Увеличивает силу героя на ${text.current}` : "",
        next: text.next ? `Увеличивает силу героя на ${text.next}` : "",
      };
    },
    data: {
      value: [14, 25, 36, 47, 58],
    },
    fn(hero: IHero) {
      hero.setters.incPower(getValue(this));
    },
  },
  {
    name: "Проворность",
    img: "/assets/talent/agility.png",
    level: 0,

    descr: function () {
      const text = getText.call(this, "value");
      return {
        current: text.current ? `Увеличивает ловкость героя на ${text.current}` : "",
        next: text.next ? `Увеличивает ловкость героя на ${text.next}` : "",
      };
    },
    data: {
      value: [14, 25, 36, 47, 58],
    },
    fn(hero: IHero) {
      hero.setters.incAgility(getValue(this));
    },
  },
  {
    name: "Концетрация мыслей",
    img: "/assets/talent/intellect.png",
    level: 0,

    descr: function () {
      const text = getText.call(this, "value");
      return {
        current: text.current ? `Увеличивает интеллект героя на ${text.current}` : "",
        next: text.next ? `Увеличивает интеллект героя на ${text.next}` : "",
      };
    },
    data: {
      value: [14, 25, 36, 47, 58],
    },
    fn(hero: IHero) {
      hero.setters.incIntellect(getValue(this));
    },
  },
  {
    name: "Небесный шквал",
    img: "/assets/talent/attackSpeed.png",
    level: 0,

    descr: function () {
      const text = getText.call(this, "value");
      return {
        current: text.current ? `Увеличивает скорость атаки героя на ${text.current}` : "",
        next: text.next ? `Увеличивает скорость атаки героя на ${text.next}` : "",
      };
    },
    data: {
      value: [0.14, 0.23, 0.32, 0.41, 0.5],
    },
    fn(hero: IHero) {
      hero.setters.incAttackSpeed(getValue(this));
    },
  },
  {
    name: "Наставление магии",
    img: "/assets/talent/powerSkill.png",
    level: 0,
    descr: function () {
      const text = getText.call(this, "value");
      return {
        current: text.current ? `Увеличивает силу магии героя на ${text.current}` : "",
        next: text.next ? `Увеличивает силу магии героя на ${text.next}` : "",
      };
    },
    data: {
      value: [9, 15, 21, 27, 33],
    },
    fn(hero: IHero) {
      hero.setters.incPowerSkill(getValue(this));
    },
  },
  {
    name: "Изворотливость",
    img: "/assets/talent/chanceEvade.png",
    level: 0,
    descr: function () {
      const text = getText.call(this, "value");
      return {
        current: text.current ? `Увеличивает шанс уклонения героя на ${text.current}%` : "",
        next: text.next ? `Увеличивает шанс уклонения героя на ${text.next}%` : "",
      };
    },
    data: {
      value: [4, 7, 10, 13, 16],
    },
    fn(hero: IHero) {
      hero.setters.incChanceEvade(getValue(this));
    },
  },
  {
    name: "Смертельные выпады",
    img: "/assets/talent/chanceCritDamage.png",
    level: 0,
    descr: function () {
      const text = getText.call(this, "value");
      return {
        current: text.current ? `Увеличивает шанс критического урона героя на ${text.current}%` : "",
        next: text.next ? `Увеличивает шанс критического урона героя на ${text.next}%` : "",
      };
    },
    data: {
      value: [4, 7, 10, 13, 16],
    },
    fn(hero: IHero) {
      hero.setters.incChanceCritDamage(getValue(this));
    },
  },
  {
    name: "Разлом обороны",
    img: "/assets/talent/ignoreDef.png",
    level: 0,
    descr: function () {
      const text = getText.call(this, "value");
      return {
        current: text.current ? `Ваши атаки игнорируют ${text.current}% брони противника` : "",
        next: text.next ? `Ваши атаки игнорируют ${text.next}% брони противника` : "",
      };
    },
    data: {
      value: [18, 27, 38, 49, 60],
    },
    fn(hero: IHero) {
      hero.setters.incIgnoreDef(getValue(this));
    },
  },
  {
    name: "Шипастая броня",
    img: "/assets/talent/reflect.png",
    level: 0,

    descr: function () {
      const value = getText.call(this, "value");
      const modifierDef = getText.call(this, "modifierDef");
      return {
        current: value.current
          ? `При получении урона, наносит атакующему чистый урон: ${value.current} ед. урона + ${modifierDef.current}% от вашей защиты`
          : "",
        next: value.next
          ? `При получении урона, наносит атакующему чистый урон: ${value.next} ед. урона + ${modifierDef.next}% от вашей защиты`
          : "",
      };
    },
    data: {
      value: [8, 12, 16, 20, 24],
      modifierDef: [20, 25, 30, 35, 40],
    },
    trigger: "afterTargetAttack",
    fn(hero: IHero) {
      if (this.level === 1) {
        registerTalent(this, activeTalent, this.trigger!);
        function activeTalent(this: talentType, hero: IHero, target: IHero | IEnemy) {
          const value = getValue(this);
          const modifierDef = getValue(this, "modifierDef");
          const damageValue = value + getPercent(hero.getters.getDef(), modifierDef);
          console.log(goPureDamage(hero, target, damageValue), "reflect");
        }
      }
    },
  },
  {
    name: "Просветление",
    img: "/assets/talent/startEnergy.png",
    level: 0,

    descr: function () {
      const value = getText.call(this, "value");
      return {
        current: value.current ? `В начале каждого боя вы получаете ${value.current} энергии` : "",
        next: value.next ? `В начале каждого боя вы получаете ${value.next} энергии` : "",
      };
    },
    data: {
      value: [15, 20, 25, 30, 35],
    },
    trigger: "inBeginFight",
    fn(hero: IHero) {
      if (this.level === 1) {
        registerTalent(this, activeTalent, this.trigger!);
        function activeTalent(this: talentType, hero: IHero, target: IHero | IEnemy) {
          const energyValue = getValue(this);
          getEnergy(hero, energyValue);
        }
      }
    },
  },
  {
    name: "Оглушающие удары",
    img: "/assets/talent/stun.png",
    level: 0,
    descr: function () {
      const chance = getText.call(this, "chance");
      const duration = getText.call(this, "duration");
      return {
        current: chance.current
          ? `Ваши атаки c ${chance.current}% шансом могут оглушить противника на ${duration.current} секунды`
          : "",
        next: chance.next
          ? `Ваши атаки c ${chance.next}% шансом могут оглушить противника на ${duration.next} секунды`
          : "",
      };
    },
    data: {
      chance: [6, 7, 8, 9, 10],
      duration: [2, 2, 2, 2, 2],
    },
    trigger: "afterInitiatorAttack",
    fn() {
      if (this.level === 1) {
        registerTalent(this, activeTalent, this.trigger!);
        function activeTalent(this: talentType, hero: IHero, target: IHero | IEnemy) {
          const chance = getRandom(1, 100);
          if (chance <= getValue(this, "chance")) {
            console.log("Оглушен");
            goStun(target, getValue(this, "duration"));
          }
        }
      }
    },
  },
  {
    name: "Целебные потоки",
    img: "/assets/talent/heal.png",
    level: 0,
    descr: function () {
      const tick = getText.call(this, "tick");
      const healValue = getText.call(this, "healValue");
      const healPercent = getText.call(this, "healPercent");

      return {
        current: tick.current
          ? `Каждые ${tick.current} секунд в бою, вы воостанавливаете ${healValue.current} ед. здоровья + ${healPercent.current}% от максимального запаса здоровья `
          : "",
        next: tick.next
          ? `Каждые ${tick.next} секунд в бою, вы воостанавливаете ${healValue.next} ед. здоровья + ${healPercent.next}% от максимального запаса здоровья `
          : "",
      };
    },
    data: {
      healValue: [40, 55, 70, 85, 100],
      healPercent: [1, 2, 3, 4, 5],
      tick: [6, 6, 6, 6, 6],
    },
    trigger: "inBeginFight",
    fn() {
      if (this.level === 1) {
        registerTalent(this, activeTalent, this.trigger!);
        function activeTalent(this: talentType, hero: IHero, target: IHero | IEnemy) {
          const healValue = getValue(this, "healValue");
          const healPercent = getValue(this, "healPercent");
          const tick = getValue(this, "tick");
          goHealTick(hero, target, healValue, healPercent, tick);
        }
      }
    },
  },
  {
    name: "Впитывание знаний",
    img: "/assets/talent/exp.png",
    level: 0,
    descr: function () {
      const text = getText.call(this, "value");
      return {
        current: text.current ? `Увеличивает получаемый опыт на ${text.current}%` : "",
        next: text.next ? `Увеличивает получаемый опыт на ${text.next}%` : "",
      };
    },
    data: {
      value: [12, 18, 22, 26, 30],
    },
    trigger: "afterInitiatorAttack",
    fn(hero: IHero) {
      hero.boost.exp += getValue(this);
    },
  },
  {
    name: "Золотая лихорадка",
    img: "/assets/talent/gold.png",
    level: 0,
    descr: function () {
      const text = getText.call(this, "value");
      return {
        current: text.current ? `Увеличивает получаемое золото на ${text.current}%` : "",
        next: text.next ? `Увеличивает получаемое золото на ${text.next}%` : "",
      };
    },
    data: {
      value: [12, 18, 22, 26, 30],
    },
    trigger: "afterInitiatorAttack",
    fn(hero: IHero) {
      hero.boost.gold += getValue(this);
    },
  },
];
