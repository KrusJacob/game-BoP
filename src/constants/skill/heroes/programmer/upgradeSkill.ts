import { UpSkill, UpgradeSkills } from "@/types/skill.types";
import { getText, incPoint, getValue, registerSkill } from "..";
import SKILLS_PROGRAMMER from "./programmerSkill";
import { IHero } from "@/types/hero.types";
import { IEnemy } from "@/types/enemy.types";
import { goMagicalDamage } from "../../utils";

export const upgradeProgrammerSkills: UpgradeSkills = {
  power: {
    totalPoint: 0,
    openLevels: ["level_1"],
    level_1: [
      {
        name: `Походы в зал`,
        descr: function () {
          const power = getText.call(this, "power");
          const intellect = getText.call(this, "intellect");
          return {
            current: power.current
              ? `Увеличивает силу на ${power.current}, но уменьшает интеллект на ${-intellect.current}`
              : "",
            next: power.next
              ? `Увеличивает силу на ${power.next}, но уменьшает интеллект на ${-intellect.next}`
              : "",
          };
        },
        img: "/assets/skill/programmer/skillPower_1_1.png",
        maxPoints: 5,
        currentPoint: 0,
        inc: incPoint,
        open: true,
        branch: "power",
        data: {
          power: [12, 24, 36, 48, 60],
          intellect: [-5, -10, -15, -20, -25],
        },
        fn(hero) {
          hero.setters.incPower(getValue(this, "power"));
          hero.setters.incIntellect(getValue(this, "intellect"));
        },
      },
    ],
    level_2: [
      {
        name: "Силовой барьер",
        descr: function () {
          const text = getText.call(this, "value");
          return {
            current: text.current ? `Oбьем барьера от "Брандмауэр" зависит от силы, а не от интеллекта` : "",
            next: text.next ? `Oбьем барьера от "Брандмауэр" зависит от силы, а не от интеллекта` : "",
          };
        },
        img: "/assets/skill/programmer/skillPower_2_1.png",
        maxPoints: 1,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "power",
        data: {
          value: [true],
        },
        fn(hero) {
          SKILLS_PROGRAMMER[1].data.power_2_1.isOpen = true;
        },
      },
      {
        name: "Плотный перекус",
        descr: function () {
          const text = getText.call(this, "value");
          return {
            current: text.current
              ? `Активация "Брандмауэр" восстанавливает здоровье в размере ${text.current}% от силы`
              : "",
            next: text.next
              ? `Активация "Брандмауэр" восстанавливает здоровье в размере ${text.next}% от силы`
              : "",
          };
        },
        img: "/assets/skill/programmer/skillPower_2_2.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "power",
        data: {
          value: [130, 190, 250],
        },
        fn(hero) {
          SKILLS_PROGRAMMER[1].data.power_2_2.isOpen = true;
          SKILLS_PROGRAMMER[1].data.power_2_2.modifierHeal += getValue(this) / 100;
        },
      },
      {
        name: "Полная мощность",
        descr: function () {
          const value = getText.call(this, "value");
          return {
            current: value.current
              ? `Активация "Брандмауэр" наносит противнику магический урон - ${value.current}% от макс.запаса здоровья героя`
              : "",
            next: value.next
              ? `Активация "Брандмауэр" наносит противнику магический урон - ${value.next}% от макс.запаса здоровья героя`
              : "",
          };
        },
        img: "/assets/skill/programmer/skillPower_2_3.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "power",
        data: {
          value: [8, 12, 16],
        },
        fn(hero) {
          SKILLS_PROGRAMMER[1].data.power_2_3.isOpen = true;
          SKILLS_PROGRAMMER[1].data.power_2_3.modifierDamage += getValue(this);
        },
      },
    ],
    level_3: [
      {
        name: "Сильнее жать кнопки",
        descr: function () {
          const value = getText.call(this, "value");
          return {
            current: value.current ? `Увеличивает атаку на ${value.current}` : "",
            next: value.next ? `Увеличивает атаку на ${value.next}` : "",
          };
        },
        img: "/assets/skill/programmer/skillPower_3_1.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "power",
        data: {
          value: [9, 18, 27],
        },
        fn(hero) {
          hero.setters.incAttack(getValue(this));
        },
      },
      {
        name: "Двухэтапная защита",
        descr: function () {
          const def = getText.call(this, "def");
          const maxHp = getText.call(this, "maxHp");
          return {
            current: def.current
              ? `Увеличивает макс.запас здоровья на ${maxHp.current} и защиту на ${def.current}`
              : "",
            next: def.next ? `Увеличивает макс.запас здоровья на ${maxHp.next} и защиту на ${def.next}` : "",
          };
        },
        img: "/assets/skill/programmer/skillPower_3_2.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "power",
        data: {
          def: [2, 4, 6],
          maxHp: [80, 160, 240],
        },
        fn(hero) {
          hero.setters.incDef(getValue(this, "def"));
          hero.setters.incMaxHp(getValue(this, "maxHp"));
        },
      },
    ],
    level_4: [
      {
        name: "Опасный вирус",
        descr: function () {
          const value = getText.call(this, "value");
          return {
            current: value.current
              ? `В момент срабатывания "Вирус" - наносит магический урон врагу в размере ${value.current}% от силы героя`
              : "",
            next: value.next
              ? `В момент срабатывания "Вирус" - наносит магический урон врагу в размере ${value.next}% от силы героя`
              : "",
          };
        },
        img: "/assets/skill/programmer/skillPower_4_1.png",
        maxPoints: 5,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "power",
        data: {
          value: [80, 100, 120, 140, 160],
        },
        fn(hero) {
          SKILLS_PROGRAMMER[2].data.power_4_1.isOpen = true;
          SKILLS_PROGRAMMER[2].data.power_4_1.modifierDamage += getValue(this) / 100;
        },
      },
    ],
    level_5: [
      {
        name: "Протокол защиты",
        descr: function () {
          const def = getText.call(this, "value");
          return {
            current: def.current ? `Увеличивает защиту и магическую защиту на ${def.current}` : "",
            next: def.next ? `Увеличивает защиту и магическую защиту на ${def.next}` : "",
          };
        },
        img: "/assets/skill/programmer/skillPower_5_1.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "power",
        data: {
          value: [5, 10, 15],
        },
        fn(hero) {
          hero.setters.incDef(getValue(this));
          hero.setters.incMagicDef(getValue(this));
        },
      },
    ],
  },
  agility: {
    totalPoint: 0,
    openLevels: ["level_1"],
    level_1: [
      {
        name: "Пробежка по утрам",
        descr: function () {
          const text = getText.call(this, "value");
          return {
            current: text.current ? `Увеличивает ловкость на ${text.current}` : "",
            next: text.next ? `Увеличивает ловкость на ${text.next}` : "",
          };
        },
        img: "/assets/skill/programmer/skillAgility_1_1.png",
        maxPoints: 5,
        currentPoint: 0,
        inc: incPoint,
        open: true,
        branch: "agility",
        data: {
          value: [6, 12, 18, 24, 30],
        },
        fn(hero) {
          hero.setters.incAgility(getValue(this));
        },
      },
    ],
    level_2: [
      {
        name: "Качественный провайдер",
        descr: function () {
          const text = getText.call(this, "value");
          return {
            current: text.current ? `Увеличивает атаку и защиту на ${text.current}` : "",
            next: text.next ? `Увеличивает атаку и защиту на ${text.next}` : "",
          };
        },
        img: "/assets/skill/programmer/skillAgility_2_1.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "agility",
        data: {
          value: [3, 6, 9],
        },
        fn(hero) {
          hero.setters.incAttack(getValue(this));
          hero.setters.incDef(getValue(this));
        },
      },
      {
        name: "Оптимизация кода",
        descr: function () {
          const text = getText.call(this, "value");
          return {
            current: text.current ? `Затраты энергии на "Утечка данных" снижаются на ${text.current}` : "",
            next: text.next ? `Затраты энергии на "Утечка данных" снижаются на ${text.next}` : "",
          };
        },
        img: "/assets/skill/programmer/skillAgility_2_2.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "agility",
        data: {
          value: [15, 25, 35],
        },
        fn(hero) {
          SKILLS_PROGRAMMER[0].data.costEnergy -= getValue(this);
        },
      },
    ],
    level_3: [
      {
        name: "Подключить скрипты",
        descr: function () {
          const text = getText.call(this, "value");
          return {
            current: text.current ? `Увеличивает шанс критического удара на ${text.current}%` : "",
            next: text.next ? `Увеличивает шанс критического удара на ${text.next}%` : "",
          };
        },
        img: "/assets/skill/programmer/skillAgility_3_1.png",
        maxPoints: 5,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "agility",
        data: {
          value: [2, 4, 6, 8, 10],
        },
        fn() {
          SKILLS_PROGRAMMER[3].data.chanceCritDamage += getValue(this);
        },
      },
      {
        name: "Взлом защиты",
        descr: function () {
          const text = getText.call(this, "value");
          return {
            current: text.current
              ? `При атаках, вы дополнительно ингорируете ${text.current}% защиты противника`
              : "",
            next: text.next ? `При атаках, вы дополнительно ингорируете ${text.next}% защиты противника` : "",
          };
        },
        img: "/assets/skill/programmer/skillAgility_3_2.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "agility",
        data: {
          value: [20, 30, 40],
        },
        fn(hero) {
          hero.setters.incIgnoreDef(getValue(this));
        },
      },
    ],
    level_4: [
      {
        name: "Разогрев для пальцев",
        descr: function () {
          const text = getText.call(this, "value");
          const duration = getText.call(this, "duration");
          return {
            current: text.current
              ? `В начале боя увеличивает скорость атаки на ${text.current}% на ${duration.current} cекунд`
              : "",
            next: text.next
              ? `В начале боя увеличивает скорость атаки на ${text.next}% на ${duration.next} cекунд`
              : "",
          };
        },
        img: "/assets/skill/programmer/skillAgility_4_1.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "agility",
        data: {
          value: [20, 30, 40],
          duration: [4, 5, 6],
        },
        fn() {
          if (this.currentPoint === 1) {
            registerSkill(skill.bind(this), "inBeginFight");

            function skill(this: UpSkill, hero: IHero) {
              hero.buffs.incAttackSpeed(getValue(this, "value", true), getValue(this, "duration", true));
            }
          }
        },
      },
    ],
    level_5: [
      {
        name: "Восстановление данных",
        descr: function () {
          const modifierHeal = getText.call(this, "modifierHeal");
          const duration = getText.call(this, "duration");
          return {
            current: modifierHeal.current
              ? `После "Утечка данных" восстанавливает каждую секунду здоровье - ${modifierHeal.current}% от ловкости героя, в течении ${duration.current} секунд`
              : "",
            next: modifierHeal.next
              ? `После "Утечка данных" восстанавливает каждую секунду здоровье - ${modifierHeal.next}% от ловкости героя, в течении ${duration.next} секунд`
              : "",
          };
        },
        img: "/assets/skill/programmer/skillAgility_5_1.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "agility",
        data: {
          modifierHeal: [120, 135, 150],
          duration: [4, 5, 6],
        },
        fn(hero) {
          SKILLS_PROGRAMMER[0].data.agility_5_1.isOpen = true;
          SKILLS_PROGRAMMER[0].data.agility_5_1.modifierHeal += getValue(this, "modifierHeal") / 100;
          SKILLS_PROGRAMMER[0].data.agility_5_1.duration += getValue(this, "duration");
        },
      },
    ],
  },
  intellect: {
    totalPoint: 0,
    openLevels: ["level_1"],
    level_1: [
      {
        name: "Чтение книг",
        descr: function () {
          const intellect = getText.call(this, "intellect");
          return {
            current: intellect.current ? `Увеличивает интеллект на ${intellect.current}` : "",
            next: intellect.next ? `Увеличивает интеллект на ${intellect.next}` : "",
          };
        },
        img: "/assets/skill/programmer/skillIntellect_1_1.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: true,
        branch: "intellect",
        data: {
          intellect: [6, 12, 18],
        },
        fn(hero) {
          hero.setters.incIntellect(getValue(this, "intellect"));
        },
      },
      {
        name: "Майнинг",
        descr: function () {
          const value = getText.call(this, "value");
          const decAttack = getText.call(this, "decAttack");
          return {
            current: value.current
              ? `Каждую секунду наносит врагу ${
                  value.current
                } магического урона. Уменьшает атаку героя на ${-decAttack.current}`
              : "",
            next: value.next
              ? `Каждую секунду наносит врагу ${
                  value.next
                } магического урона. Уменьшает атаку героя на ${-decAttack.next}`
              : "",
          };
        },
        img: "/assets/skill/programmer/skillIntellect_1_2.png",
        maxPoints: 5,
        currentPoint: 0,
        inc: incPoint,
        open: true,
        branch: "intellect",
        data: {
          value: [10, 20, 30, 40, 50],
          decAttack: [-7, -14, -21, -28, -35],
        },
        fn(hero) {
          hero.setters.incAttack(getValue(this, "decAttack"));
          if (this.currentPoint === 1) {
            registerSkill(skill.bind(this), "inBeginFight");

            function skill(this: UpSkill, hero: IHero, target: IEnemy) {
              hero.pushSkillText(this.name);

              const interval = setInterval(() => {
                if (hero.status.death || target.status.death) clearInterval(interval);
                goMagicalDamage(hero, target, getValue(this, "value", true));
              }, 1000);
            }
          }
        },
      },
    ],
    level_2: [
      {
        name: "Перераспределение нагрузки",
        descr: function () {
          const def = getText.call(this, "def");
          const decMaxHp = getText.call(this, "decMaxHp");
          return {
            current: def.current
              ? `Увеличивает защиту на ${def.current}, но уменьшает макс.запас здоровья на ${-decMaxHp.current}`
              : "",
            next: def.next
              ? `Увеличивает защиту на ${def.next}, но уменьшает макс.запас здоровья на ${-decMaxHp.next}`
              : "",
          };
        },
        img: "/assets/skill/programmer/skillIntellect_2_1.png",
        maxPoints: 5,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "intellect",
        data: {
          def: [6, 12, 18, 24, 30],
          decMaxHp: [-75, -150, -225, -300, -375],
        },
        fn(hero) {
          hero.setters.incDef(getValue(this, "def"));
          hero.setters.incMaxHp(getValue(this, "decMaxHp"));
        },
      },
      {
        name: "ТРОЯН",
        descr: function () {
          const text = getText.call(this, "value");
          return {
            current: text.current
              ? `"Вирус" отравляет врага, нанося ${text.current}% магического урона от макс.запаса врага каждую секунду. Не суммируется`
              : "",
            next: text.next
              ? `"Вирус" отравляет врага, нанося ${text.next}% магического урона от макс.запаса врага каждую секунду. Не суммируется`
              : "",
          };
        },
        img: "/assets/skill/programmer/skillIntellect_2_2.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "intellect",
        data: {
          value: [1, 1.5, 2],
        },
        fn(hero) {
          SKILLS_PROGRAMMER[2].data.intellect_2_2.isOpen = true;
          SKILLS_PROGRAMMER[2].data.intellect_2_2.modifier += getValue(this);
        },
      },
    ],
    level_3: [
      {
        name: "Адаптивный скрипт",
        descr: function () {
          const text = getText.call(this, "value");
          return {
            current: text.current ? `Увеличивает шанс срабатывания "Вирус" на ${text.current}%` : "",
            next: text.next ? `Увеличивает шанс срабатывания "Вирус" на ${text.next}%` : "",
          };
        },
        img: "/assets/skill/programmer/skillIntellect_3_1.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "intellect",
        data: {
          value: [3, 6, 9],
        },
        fn() {
          SKILLS_PROGRAMMER[2].data.chance += getValue(this);
        },
      },
    ],
    level_4: [
      {
        name: "5G",
        descr: function () {
          const text = getText.call(this, "value");
          return {
            current: text.current ? `Каждая атака дополнительно даёт ${text.current} энергии` : "",
            next: text.next ? `Каждая атака дополнительно даёт ${text.next} энергии` : "",
          };
        },
        img: "/assets/skill/programmer/skillIntellect_4_1.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "intellect",
        data: {
          value: [1, 2, 3],
        },
        fn(hero) {
          hero.energy.incValue += getValue(this);
        },
      },
    ],
    level_5: [
      {
        name: "DDoS-атака",
        descr: function () {
          const modifier = getText.call(this, "modifier");
          const duration = getText.call(this, "duration");
          return {
            current: duration.current
              ? `Увеличивает урон от "Утечка данных" на ${modifier.current}% от макс.запаса врага, также накладывает на врага 4 слоя "Темное проклятие" на ${duration.current} секунд`
              : "",
            next: duration.next
              ? `Увеличивает урон от "Утечка данных" на ${modifier.next}% от макс.запаса врага, также накладывает на врага 4 слоя "Темное проклятие" на ${duration.next} секунд`
              : "",
          };
        },
        img: "/assets/skill/programmer/skillIntellect_5_1.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "intellect",
        data: {
          modifier: [1, 2, 3],
          duration: [6, 7, 8],
        },
        fn(hero) {
          SKILLS_PROGRAMMER[0].data.modifier += getValue(this, "modifier");
          SKILLS_PROGRAMMER[0].data.intellect_5_1.isOpen = true;
          SKILLS_PROGRAMMER[0].data.intellect_5_1.duration += getValue(this, "duration");
        },
      },
    ],
  },
};
