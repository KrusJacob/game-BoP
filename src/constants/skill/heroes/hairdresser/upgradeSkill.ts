import { UpSkill, UpgradeSkills } from "@/types/skill.types";
import { getText, incPoint, getValue, registerSkill } from "../..";
import SKILLS_HAIRDRESSER from "./hairdresserSkill";
import { IHero } from "@/types/hero.types";
import { IEnemy } from "@/types/enemy.types";

export const upgradeHairdresserSkills: UpgradeSkills = {
  power: {
    totalPoint: 0,
    openLevels: ["level_1"],
    level_1: [
      {
        name: `Толстые пальцы`,
        descr: function () {
          const attack = getText.call(this, "attack");
          const attackSpeed = getText.call(this, "attackSpeed");
          return {
            current: attack.current
              ? `Увеличивает атаку на ${attack.current}, но уменьшает скорость атаки на ${-attackSpeed.current}`
              : "",
            next: attack.next
              ? `Увеличивает атаку на ${attack.next}, но уменьшает скорость атаки на ${-attackSpeed.next}`
              : "",
          };
        },
        img: "/src/assets/skill/hairdresser/skillPower_1_1.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: true,
        branch: "power",
        data: {
          attack: [10, 20, 30],
          attackSpeed: [-0.05, -0.1, -0.15],
        },
        fn(hero) {
          hero.setters.incAttack(getValue(this, "attack"));
          hero.setters.incAttackSpeed(getValue(this, "attackSpeed"));
        },
      },
    ],
    level_2: [
      {
        name: "Тупые ножницы",
        descr: function () {
          const power = getText.call(this, "power");
          const agility = getText.call(this, "agility");
          return {
            current: power.current
              ? `Увеличивает силу на ${power.current}, но уменьшает ловкость и интеллект на ${-agility.current}`
              : "",
            next: power.next
              ? `Увеличивает силу на ${power.next}, но уменьшает ловкость и интеллект на ${-agility.next}`
              : "",
          };
        },
        img: "/src/assets/skill/hairdresser/skillPower_2_1.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "power",
        data: {
          power: [12, 24, 36],
          agility: [-3, -6, -9],
        },
        fn(hero) {
          hero.setters.incPower(getValue(this, "power"));
          hero.setters.incAgility(getValue(this, "agility"));
          hero.setters.incIntellect(getValue(this, "agility"));
        },
      },
    ],
    level_3: [
      {
        name: "Грубый взмах",
        descr: function () {
          const value = getText.call(this, "value");
          return {
            current: value.current
              ? `"Заточенный инструмент" дополнительно наносит чистый урон: ${value.current}% от силы`
              : "",
            next: value.next
              ? `"Заточенный инструмент" дополнительно наносит чистый урон: ${value.next}% от силы`
              : "",
          };
        },
        img: "/src/assets/skill/hairdresser/skillPower_3_1.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "power",
        data: {
          value: [50, 70, 90],
        },
        fn() {
          SKILLS_HAIRDRESSER[1].data.power_3_1.isOpen = true;
          SKILLS_HAIRDRESSER[1].data.power_3_1.modifierPower += getValue(this) / 100;
        },
      },
    ],
    level_4: [
      {
        name: "Стрижка топором",
        descr: function () {
          const chanceCritDamage = getText.call(this, "chanceCritDamage");
          const attack = getText.call(this, "attack");
          return {
            current: attack.current
              ? `Увеличивает шанс критического удара на ${chanceCritDamage.current}% и атаку на ${attack.current}`
              : "",
            next: attack.next
              ? `Увеличивает шанс критического удара на ${chanceCritDamage.next}% и атаку на ${attack.next}`
              : "",
          };
        },
        img: "/src/assets/skill/hairdresser/skillPower_4_1.png",
        maxPoints: 5,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "power",
        data: {
          chanceCritDamage: [2, 4, 6, 8, 10],
          attack: [5, 10, 15, 20, 25],
        },
        fn(hero) {
          hero.setters.incAttack(getValue(this, "attack"));
          SKILLS_HAIRDRESSER[3].data.chanceCritDamage += getValue(this, "chanceCritDamage");
        },
      },
    ],
  },
  agility: {
    totalPoint: 0,
    openLevels: ["level_1"],
    level_1: [
      {
        name: "Ручная работа",
        descr: function () {
          const agility = getText.call(this, "agility");
          const powerSkill = getText.call(this, "powerSkill");
          return {
            current: agility.current
              ? `Увеличивает ловкость на ${agility.current}, но снижает силу умений на ${-powerSkill.current}`
              : "",
            next: agility.next
              ? `Увеличивает ловкость на ${agility.next}, но снижает силу умений на ${-powerSkill.next}`
              : "",
          };
        },
        img: "/src/assets/skill/hairdresser/skillAgility_1_1.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: true,
        branch: "agility",
        data: {
          agility: [9, 18, 27],
          powerSkill: [-4, -8, -12],
        },
        fn(hero) {
          hero.setters.incAgility(getValue(this, "agility"));
          hero.setters.incPowerSkill(getValue(this, "powerSkill"));
        },
      },
    ],
    level_2: [
      {
        name: "Порхай как бабочка",
        descr: function () {
          const text = getText.call(this, "value");
          return {
            current: text.current ? `Увеличивает уклонение ${text.current}` : "",
            next: text.next ? `Увеличивает уклонение ${text.next}` : "",
          };
        },
        img: "/src/assets/skill/hairdresser/skillAgility_2_1.png",
        maxPoints: 5,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "agility",
        data: {
          value: [2, 4, 6, 8, 10],
        },
        fn(hero) {
          SKILLS_HAIRDRESSER[3].data.chanceEvade += getValue(this);
        },
      },
    ],
    level_3: [
      {
        name: "Опасная стрижка",
        descr: function () {
          const text = getText.call(this, "value");
          return {
            current: text.current
              ? `"Заточенный инструмент" дополнительно игнорирует ${text.current}% защиты`
              : "",
            next: text.next ? `"Заточенный инструмент" дополнительно игнорирует ${text.next}% защиты` : "",
          };
        },
        img: "/src/assets/skill/hairdresser/skillAgility_3_1.png",
        maxPoints: 2,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "agility",
        data: {
          value: [25, 50],
        },
        fn() {
          SKILLS_HAIRDRESSER[1].data.ignoreDef += getValue(this);
        },
      },
    ],
    level_4: [
      {
        name: "Качественные инструменты",
        descr: function () {
          const value = getText.call(this, "value");
          return {
            current: value.current ? `Увеличивает атаку и защиту на ${value.current}` : "",
            next: value.next ? `Увеличивает атаку и защиту на ${value.next}` : "",
          };
        },
        img: "/src/assets/skill/hairdresser/skillAgility_4_1.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "agility",
        data: {
          value: [4, 8, 12],
        },
        fn(hero) {
          hero.setters.incAttack(getValue(this));
          hero.setters.incDef(getValue(this));
        },
      },
    ],
  },
  intellect: {
    totalPoint: 0,
    openLevels: ["level_1"],
    level_1: [
      {
        name: "Семь раз отмерь - один отрежь",
        descr: function () {
          const intellect = getText.call(this, "intellect");
          const attackSpeed = getText.call(this, "attackSpeed");
          return {
            current: intellect.current
              ? `Увеличивает интеллект на ${
                  intellect.current
                }, но уменьшает скорость атаки на ${-attackSpeed.current}`
              : "",
            next: intellect.next
              ? `Увеличивает интеллект на ${intellect.next}, но уменьшает скорость атаки на ${-attackSpeed.next}`
              : "",
          };
        },
        img: "/src/assets/skill/hairdresser/skillIntellect_1_1.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: true,
        branch: "intellect",
        data: {
          intellect: [9, 18, 27],
          attackSpeed: [-0.07, -0.14, -0.21],
        },
        fn(hero) {
          hero.setters.incIntellect(getValue(this, "intellect"));
          hero.setters.incAttackSpeed(getValue(this, "attackSpeed"));
        },
      },
      {
        name: "Точный подрез",
        descr: function () {
          const value = getText.call(this, "value");
          return {
            current: value.current
              ? `"Заточенный инструмент" наносит дополнительный чистый урон: ${value.current}% от интеллекта`
              : "",
            next: value.next
              ? `"Заточенный инструмент" наносит дополнительный чистый урон: ${value.next}% от интеллекта`
              : "",
          };
        },
        img: "/src/assets/skill/hairdresser/skillIntellect_1_2.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: true,
        branch: "intellect",
        data: {
          value: [50, 70, 90],
        },
        fn() {
          SKILLS_HAIRDRESSER[1].data.intellect_1_2.isOpen = true;
          SKILLS_HAIRDRESSER[1].data.intellect_1_2.modifierIntellect += getValue(this) / 100;
        },
      },
    ],
    level_2: [
      {
        name: "Освежиться",
        descr: function () {
          const text = getText.call(this, "value");
          return {
            current: text.current
              ? `"Профессиональная подготовка" дополнительно восстанавливает ${text.current}% HP от макс.здоровья`
              : "",
            next: text.next
              ? `"Профессиональная подготовка" дополнительно восстанавливает ${text.next}% HP от макс.здоровья`
              : "",
          };
        },
        img: "/src/assets/skill/hairdresser/skillIntellect_2_1.png",
        maxPoints: 2,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "intellect",
        data: {
          value: [4, 6],
        },
        fn() {
          SKILLS_HAIRDRESSER[2].data.healPercent += getValue(this);
        },
      },
    ],
    level_3: [
      {
        name: "Использование бритвы",
        descr: function () {
          const chance = getText.call(this, "chance");
          const duration = getText.call(this, "duration");
          const modifier = getText.call(this, "modifier");
          return {
            current: chance.current
              ? `"Заточенный инструмент" c шансом ${chance.current}% накладывает кровотечение на ${duration.current} сек. Нанося каждую секунду ${modifier.current}% от макс.здоровья врага`
              : "",
            next: chance.next
              ? `"Заточенный инструмент" c шансом ${chance.next}% накладывает кровотечение на ${duration.next} сек. Нанося каждую секунду ${modifier.next}% от макс.здоровья врага`
              : "",
          };
        },
        img: "/src/assets/skill/hairdresser/skillIntellect_3_1.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "intellect",
        data: {
          chance: [35, 40, 45],
          duration: [3, 4, 5],
          modifier: [5, 5, 5],
        },
        fn() {
          SKILLS_HAIRDRESSER[1].data.intellect_3_1.isOpen = true;
          SKILLS_HAIRDRESSER[1].data.intellect_3_1.chance += getValue(this, "chance");
          SKILLS_HAIRDRESSER[1].data.intellect_3_1.duration += getValue(this, "duration");
          SKILLS_HAIRDRESSER[1].data.intellect_3_1.modifierBleed += getValue(this, "modifier");
        },
      },
    ],
    level_4: [
      {
        name: "Ледяное опрыскивание",
        descr: function () {
          const text = getText.call(this, "value");
          return {
            current: text.current ? `"Профессиональная подготовка" также оглушает на ${text.current} секунды` : "",
            next: text.next ? `"Профессиональная подготовка" также оглушает на ${text.next} секунды` : "",
          };
        },
        img: "/src/assets/skill/hairdresser/skillIntellect_4_1.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "intellect",
        data: {
          value: [2, 3, 4],
        },
        fn() {
          SKILLS_HAIRDRESSER[2].data.intellect_4_1.isOpen = true;
          SKILLS_HAIRDRESSER[2].data.intellect_4_1.modifierStun += getValue(this);
        },
      },
    ],
  },
};
