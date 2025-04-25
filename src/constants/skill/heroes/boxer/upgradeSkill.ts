import { UpSkill, UpgradeSkills } from "@/types/skill.types";
import SKILLS_BOXER from "./boxerSkill";
import { getText, incPoint, getValue, registerSkill } from "..";
import { IHero } from "@/types/hero.types";
import { IEnemy } from "@/types/enemy.types";
import { goMagicalDamage } from "../../utils";

export const upgradeBoxerSkills: UpgradeSkills = {
  power: {
    totalPoint: 0,
    openLevels: ["level_1"],
    level_1: [
      {
        name: `Стальной пресс`,
        descr: function () {
          const text = getText.call(this, "value");
          return {
            current: text.current ? `Увеличивает защиту на ${text.current}` : "",
            next: text.next ? `Увеличивает защиту на ${text.next}` : "",
          };
        },
        img: "/assets/skill/boxer/skillPower_1_1.png",
        maxPoints: 5,
        currentPoint: 0,
        inc: incPoint,
        open: true,
        branch: "power",
        data: {
          value: [4, 8, 12, 16, 20],
        },
        fn(hero) {
          hero.setters.incDef(getValue(this));
        },
      },
      {
        name: "Выносливость быка",
        descr: function () {
          const text = getText.call(this, "value");
          return {
            current: text.current ? `Увеличивает макс.запас здоровья на ${text.current}` : "",
            next: text.next ? `Увеличивает макс.запас здоровья на ${text.next}` : "",
          };
        },
        img: "/assets/skill/boxer/skillPower_1_2.png",
        maxPoints: 5,
        currentPoint: 0,
        inc: incPoint,
        open: true,
        branch: "power",
        data: {
          value: [110, 220, 330, 440, 550],
        },
        fn(hero) {
          hero.setters.incMaxHp(getValue(this));
        },
      },
    ],
    level_2: [
      {
        name: "Силовые тренировки",
        descr: function () {
          const text = getText.call(this, "value");
          return {
            current: text.current ? `Увеличивает силу и атаку на ${text.current}` : "",
            next: text.next ? `Увеличивает силу и атаку на ${text.next}` : "",
          };
        },
        img: "/assets/skill/boxer/skillPower_2_1.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "power",
        data: {
          value: [4, 8, 12, 16, 20],
        },
        fn(hero) {
          hero.setters.incAttack(getValue(this));
          hero.setters.incPower(getValue(this));
        },
      },
      {
        name: "Камбэк",
        descr: function () {
          const text = getText.call(this, "value");
          return {
            current: text.current ? `"Апперкот" восстанавливает герою здоровье - ${text.current}% от силы` : "",
            next: text.next ? `"Апперкот" восстанавливает герою здоровье - ${text.next}% от силы` : "",
          };
        },
        img: "/assets/skill/boxer/skillPower_2_2.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "power",
        data: {
          value: [150, 200, 250],
        },
        fn(hero) {
          SKILLS_BOXER[0].data.power_2_2.isOpen = true;
          SKILLS_BOXER[0].data.power_2_2.modifierPower += getValue(this) / 100;
        },
      },
    ],
    level_3: [
      {
        name: "Нокаутирующий удар",
        descr: function () {
          const chance = getText.call(this, "chance");
          const duration = getText.call(this, "duration");
          const energy = getText.call(this, "energy");
          return {
            current: chance.current
              ? `"Хук левой" с шансом ${chance.current}% оглушит противника на ${duration.current} секунды и восстановит ${energy.current} энергии герою`
              : "",
            next: chance.next
              ? `"Хук левой" с шансом ${chance.next}% оглушит противника на ${duration.next} секунды и восстановит ${energy.next} энергии герою`
              : "",
          };
        },
        img: "/assets/skill/boxer/skillPower_3_1.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "power",
        data: {
          chance: [50, 60, 70],
          duration: [2, 2, 2],
          energy: [5, 10, 15],
        },
        fn() {
          SKILLS_BOXER[2].data.power_3_1.isOpen = true;
          SKILLS_BOXER[2].data.power_3_1.stunChance += getValue(this, "chance");
          SKILLS_BOXER[2].data.power_3_1.stunDuration += getValue(this, "duration");
          SKILLS_BOXER[2].data.power_3_1.energy += getValue(this, "energy");
        },
      },
    ],
    level_4: [
      {
        name: "Руки-базуки",
        descr: function () {
          const value = getText.call(this, "value");
          const debuff = getText.call(this, "debuff");
          return {
            current: value.current
              ? `Увеличивает атаку на ${value.current}, но снижает скорость атаки на ${-debuff.current}`
              : "",
            next: value.next
              ? `Увеличивает атаку на ${value.next}, но снижает скорость атаки на ${-debuff.next}`
              : "",
          };
        },
        img: "/assets/skill/boxer/skillPower_4_1.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "power",
        data: {
          value: [30, 60, 90],
          debuff: [-0.13, -0.26, -0.39],
        },
        fn(hero) {
          hero.setters.incAttack(getValue(this));
          hero.setters.incAttackSpeed(getValue(this, "debuff"));
        },
      },
    ],
    level_5: [
      {
        name: "Ванпанчмен",
        descr: function () {
          const modifierValue = getText.call(this, "modifierValue");
          const modifierPower = getText.call(this, "modifierPower");
          return {
            current: modifierValue.current
              ? `"Апперкот" наносит дополнительно ${modifierValue.current}% урона + ${modifierPower.current}% от силы героя, но оглушает героя на 2 секунды`
              : "",
            next: modifierValue.next
              ? `"Апперкот" наносит дополнительно ${modifierValue.next}% урона + ${modifierPower.next}% от силы героя, но оглушает героя на 2 секунды`
              : "",
          };
        },
        img: "/assets/skill/boxer/skillPower_5_1.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "power",
        data: {
          modifierValue: [75, 100, 135],
          modifierPower: [75, 100, 135],
        },
        fn(hero) {
          SKILLS_BOXER[0].data.modifier += getValue(this, "modifierValue") / 100;
          SKILLS_BOXER[0].data.power_5_1.isOpen = true;
          SKILLS_BOXER[0].data.power_5_1.modifierPower += getValue(this, "modifierPower") / 100;
        },
      },
    ],
  },
  agility: {
    totalPoint: 0,
    openLevels: ["level_1"],
    level_1: [
      {
        name: "Быстрые удары",
        descr: function () {
          const text = getText.call(this, "value");
          return {
            current: text.current ? `Увеличивает скорость атаки на ${text.current}` : "",
            next: text.next ? `Увеличивает скорость атаки на ${text.next}` : "",
          };
        },
        img: "/assets/skill/boxer/skillAgility_1_1.png",
        maxPoints: 5,
        currentPoint: 0,
        inc: incPoint,
        open: true,
        branch: "agility",
        data: {
          value: [0.06, 0.12, 0.18, 0.24, 0.3],
        },
        fn(hero) {
          hero.setters.incAttackSpeed(getValue(this));
        },
      },
    ],
    level_2: [
      {
        name: "Распределение тренировок",
        descr: function () {
          const text = getText.call(this, "value");
          return {
            current: text.current ? `Увеличивает силу, ловкость и интеллект на ${text.current}` : "",
            next: text.next ? `Увеличивает силу, ловкость и интеллект на ${text.next}` : "",
          };
        },
        img: "/assets/skill/boxer/skillAgility_2_1.png",
        maxPoints: 5,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "agility",
        data: {
          value: [3, 6, 9, 12, 15],
        },
        fn(hero) {
          hero.setters.incPower(getValue(this));
          hero.setters.incAgility(getValue(this));
          hero.setters.incIntellect(getValue(this));
        },
      },
      // {
      //   name: "Усиленный апперкот",
      //   descr: function () {
      //     const text = getText.call(this, "value");
      //     return {
      //       current: text.current ? `"Апперкот" наносит на ${text.current}% урона больше` : "",
      //       next: text.next ? `"Апперкот" наносит на ${text.next}% урона больше` : "",
      //     };
      //   },
      //   img: "/assets/skill/boxer/skillAgility_2_2.png",
      //   maxPoints: 3,
      //   currentPoint: 0,
      //   inc: incPoint,
      //   open: false,
      //   branch: "agility",
      //   data: {
      //     value: [30, 50, 70],
      //   },
      //   fn(hero) {
      //     SKILLS_BOXER[0].data.modifier += getValue(this) / 100;
      //   },
      // },
      {
        name: "Пробивающий удар",
        descr: function () {
          const modifierDef = getText.call(this, "modifierDef");
          const duration = getText.call(this, "duration");
          return {
            current: modifierDef.current
              ? `"Апперкот" снижает защиту противника на ${modifierDef.current}% на ${duration.current} секунд`
              : "",
            next: modifierDef.next
              ? `"Апперкот" снижает защиту противника на ${modifierDef.next}% на ${duration.next} секунд`
              : "",
          };
        },
        img: "/assets/skill/boxer/skillAgility_2_2.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "agility",
        data: {
          modifierDef: [40, 55, 70],
          duration: [5, 6, 7],
        },
        fn(hero) {
          SKILLS_BOXER[0].data.agility_2_2.isOpen = true;
          SKILLS_BOXER[0].data.agility_2_2.modifierDef += getValue(this, "modifierDef") / 100;
          SKILLS_BOXER[0].data.agility_2_2.duration += getValue(this, "duration");
        },
      },
    ],
    level_3: [
      {
        name: "Удар по почкам",
        descr: function () {
          const text = getText.call(this, "value");
          return {
            current: text.current ? `Увеличивает шанс критического удара на ${text.current}%` : "",
            next: text.next ? `Увеличивает шанс критического удара на ${text.next}%` : "",
          };
        },
        img: "/assets/skill/boxer/skillAgility_3_1.png",
        maxPoints: 5,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "agility",
        data: {
          value: [3, 6, 9, 12, 15],
        },
        fn() {
          SKILLS_BOXER[3].data.chanceCritDamage += getValue(this);
        },
      },
    ],
    level_4: [
      {
        name: "Двоечка",
        descr: function () {
          const text = getText.call(this, "value");
          return {
            current: text.current ? `Увеличивает шанс навыка "Хук левой" на ${text.current}%` : "",
            next: text.next ? `Увеличивает шанс навыка "Хук левой" на ${text.next}%` : "",
          };
        },
        img: "/assets/skill/boxer/skillAgility_4_1.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "agility",
        data: {
          value: [4, 6, 8],
        },
        fn() {
          SKILLS_BOXER[2].data.chance += getValue(this);
        },
      },
    ],
    level_5: [
      {
        name: "Троечка",
        descr: function () {
          const chance = getText.call(this, "chance");
          const modifier = getText.call(this, "modifier");
          return {
            current: chance.current
              ? `"Хук левой" с шансом ${chance.current}% может провести еще доп.атаку, нанося ${modifier.current}% урона`
              : "",
            next: chance.next
              ? `"Хук левой" с шансом ${chance.next}% может провести еще доп.атаку, нанося ${modifier.next}% урона`
              : "",
          };
        },
        img: "/assets/skill/boxer/skillAgility_5_1.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "agility",
        data: {
          chance: [30, 40, 50],
          modifier: [70, 85, 100],
        },
        fn(hero) {
          SKILLS_BOXER[2].data.agility_5_1.isOpen = true;
          SKILLS_BOXER[2].data.agility_5_1.chance += getValue(this, "chance");
          SKILLS_BOXER[2].data.agility_5_1.modifier += getValue(this, "modifier") / 100;
        },
      },
    ],
  },
  intellect: {
    totalPoint: 0,
    openLevels: ["level_1"],
    level_1: [
      {
        name: "Заточка навыков",
        descr: function () {
          const text = getText.call(this, "value");
          return {
            current: text.current ? `Увеличивает атаку и силу умений на ${text.current}` : "",
            next: text.next ? `Увеличивает атаку и силу умений на ${text.next}` : "",
          };
        },
        img: "/assets/skill/boxer/skillIntellect_1_1.png",
        maxPoints: 5,
        currentPoint: 0,
        inc: incPoint,
        open: true,
        branch: "intellect",
        data: {
          value: [5, 10, 15, 20, 25],
        },
        fn(hero) {
          hero.setters.incAttack(getValue(this));
          hero.setters.incPowerSkill(getValue(this));
        },
      },
    ],
    level_2: [
      {
        name: "Сила в уме",
        descr: function () {
          const text = getText.call(this, "value");
          return {
            current: text.current ? `Увеличивает интеллект на ${text.current}` : "",
            next: text.next ? `Увеличивает интеллект на ${text.next}` : "",
          };
        },
        img: "/assets/skill/boxer/skillIntellect_2_1.png",
        maxPoints: 5,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "intellect",
        data: {
          value: [7, 14, 21, 28, 35],
        },
        fn(hero) {
          hero.setters.incIntellect(getValue(this));
        },
      },
      {
        name: "Продуманные удары",
        descr: function () {
          const text = getText.call(this, "value");
          return {
            current: text.current
              ? `Атаки наносят дополнительный магический урон - ${text.current}% от интеллекта `
              : "",
            next: text.next ? `Атаки наносят дополнительный магический урон - ${text.next}% от интеллекта ` : "",
          };
        },
        img: "/assets/skill/boxer/skillIntellect_2_2.png",
        maxPoints: 5,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "intellect",
        data: {
          value: [20, 25, 30, 35, 40],
          modifierDamage: 0,
        },
        fn(hero) {
          this.data.modifierDamage += getValue(this);
          if (this.currentPoint === 1) {
            registerSkill(skill.bind(this), "afterInitiatorAttack");

            function skill(this: UpSkill, hero: IHero, target: IEnemy) {
              const damage = hero.getters.getIntellect() * (this.data.modifierDamage / 100);
              goMagicalDamage(hero, target, damage);
            }
          }
        },
      },
    ],
    level_3: [
      {
        name: "Не падать духом",
        descr: function () {
          const text = getText.call(this, "value");
          return {
            current: text.current
              ? `"Шестое чувство" восстанавливает дополнительно ${text.current}% от интеллекта`
              : "",
            next: text.next ? `Шестое чувство" восстанавливает дополнительно ${text.next}% от интеллекта` : "",
          };
        },
        img: "/assets/skill/boxer/skillIntellect_3_1.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "intellect",
        data: {
          value: [150, 200, 250],
        },
        fn() {
          SKILLS_BOXER[1].data.intellect_3_1.isOpen = true;
          SKILLS_BOXER[1].data.intellect_3_1.modifierHeal += getValue(this) / 100;
        },
      },
      {
        name: "Второе дыхание",
        descr: function () {
          const text = getText.call(this, "value");
          return {
            current: text.current ? `"Шестое чувство" восстанавливает ${text.current} энергии` : "",
            next: text.next ? `"Шестое чувство" восстанавливает ${text.next} энергии` : "",
          };
        },
        img: "/assets/skill/boxer/skillIntellect_3_2.png",
        maxPoints: 2,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "intellect",
        data: {
          value: [30, 45],
        },
        fn() {
          console.log(SKILLS_BOXER[0].data);
          SKILLS_BOXER[1].data.intellect_3_2.isOpen = true;
          SKILLS_BOXER[1].data.intellect_3_2.valueEnergy += getValue(this);
        },
      },
    ],
    level_4: [
      {
        name: "Предугадывание ударов",
        descr: function () {
          const text = getText.call(this, "value");
          return {
            current: text.current ? `Увеличивает уклонение на ${text.current}` : "",
            next: text.next ? `Увеличивает уклонение на ${text.next}` : "",
          };
        },
        img: "/assets/skill/boxer/skillIntellect_4_1.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "intellect",
        data: {
          value: [3, 5, 7],
        },
        fn() {
          SKILLS_BOXER[3].data.chanceEvade += getValue(this);
        },
      },
    ],
    level_5: [
      {
        name: "Вдохновение бойца",
        descr: function () {
          const modifier = getText.call(this, "modifier");
          const duration = getText.call(this, "duration");
          return {
            current: modifier.current
              ? `В начале каждого боя увеливает наносимый урон и снижает получаемый на ${modifier.current}% на ${duration.current} секунд`
              : "",
            next: modifier.next
              ? `В начале каждого боя увеливает наносимый урон и снижает получаемый на ${modifier.next}% на ${duration.next} секунд`
              : "",
          };
        },
        img: "/assets/skill/boxer/skillIntellect_5_1.png",
        maxPoints: 2,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "intellect",
        data: {
          modifier: [20, 30],
          duration: [6, 8],
        },
        fn(hero) {
          if (this.currentPoint === 1) {
            registerSkill(skill.bind(this), "inBeginFight");

            function skill(this: UpSkill, hero: IHero, target: IEnemy) {
              hero.pushSkillText(this.name);
              const modifier = getValue(this, "modifier", true);
              const duration = getValue(this, "duration", true);
              console.log(duration);
              hero.buffs.incDamage(modifier, duration);
              hero.buffs.incDef(modifier, duration);
            }
          }
        },
      },
    ],
  },
};
