import { UpgradeSkills } from "@/types/skill.types";
import SKILLS_BOXER from "./boxerSkill";
import { getText, incPoint, getValue } from "../..";

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
        img: "/src/assets/skill/boxer/skillPower_1_1.png",
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
            current: text.current ? `Увеличивает макс.здоровье на ${text.current}` : "",
            next: text.next ? `Увеличивает макс.здоровье на ${text.next}` : "",
          };
        },
        img: "/src/assets/skill/boxer/skillPower_1_2.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: true,
        branch: "power",
        data: {
          value: [125, 250, 375],
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
        img: "/src/assets/skill/boxer/skillPower_2_1.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "power",
        data: {
          value: [5, 10, 15],
        },
        fn(hero) {
          hero.setters.incAttack(getValue(this));
          hero.setters.incPower(getValue(this));
        },
      },
    ],
    level_3: [
      {
        name: "Нокаутирующий удар",
        descr: function () {
          const chance = getText.call(this, "chance");
          const duration = getText.call(this, "duration");
          return {
            current: chance.current
              ? `"Хук левой" с шансом ${chance.current}% оглушит противника на ${duration.current} секунды`
              : "",
            next: chance.next
              ? `"Хук левой" с шансом ${chance.next}% оглушит противника на ${duration.next} секунды`
              : "",
          };
        },
        img: "/src/assets/skill/boxer/skillPower_3_1.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "power",
        data: {
          chance: [30, 50, 70],
          duration: [2, 2, 2],
        },
        fn() {
          SKILLS_BOXER[2].data.talent_3_1.isOpen = true;
          SKILLS_BOXER[2].data.talent_3_1.stunChance += getValue(this, "chance");
          SKILLS_BOXER[2].data.talent_3_1.stunDuration += getValue(this, "duration");
          console.log(SKILLS_BOXER);
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
        img: "/src/assets/skill/boxer/skillPower_4_1.png",
        maxPoints: 2,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "power",
        data: {
          value: [25, 50],
          debuff: [-0.15, -0.3],
        },
        fn(hero) {
          hero.setters.incAttack(getValue(this));
          hero.setters.incAttackSpeed(getValue(this, "debuff"));
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
        img: "/src/assets/skill/boxer/skillAgility_1_1.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: true,
        branch: "agility",
        data: {
          value: [0.08, 0.16, 0.24],
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
        img: "/src/assets/skill/boxer/skillAgility_2_1.png",
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
        img: "/src/assets/skill/boxer/skillAgility_3_1.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "agility",
        data: {
          value: [2, 4, 6],
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
        img: "/src/assets/skill/boxer/skillAgility_4_1.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "agility",
        data: {
          value: [2, 4, 6],
        },
        fn() {
          SKILLS_BOXER[2].data.chance += getValue(this);
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
        img: "/src/assets/skill/boxer/skillIntellect_1_1.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: true,
        branch: "intellect",
        data: {
          value: [6, 12, 18],
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
        img: "/src/assets/skill/boxer/skillIntellect_2_1.png",
        maxPoints: 5,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "intellect",
        data: {
          value: [8, 16, 24, 32, 40],
        },
        fn(hero) {
          hero.setters.incIntellect(getValue(this));
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
        img: "/src/assets/skill/boxer/skillIntellect_3_1.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "intellect",
        data: {
          value: [150, 200, 250],
        },
        fn() {
          SKILLS_BOXER[1].data.talent_3_1.isOpen = true;
          SKILLS_BOXER[1].data.talent_3_1.modifierHeal += getValue(this) / 100;
          console.log(SKILLS_BOXER[1].data.talent_3_1.modifierHeal);
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
        img: "/src/assets/skill/boxer/skillIntellect_4_1.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "intellect",
        data: {
          value: [2, 4, 6],
        },
        fn() {
          SKILLS_BOXER[3].data.chanceEvade += getValue(this);
        },
      },
    ],
  },
};
