import { UpSkill, UpgradeSkills } from "@/types/skill.types";
import { getText, incPoint, getValue, registerSkill } from "..";
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
        img: "/assets/skill/hairdresser/skillPower_1_1.png",
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
      {
        name: `Прочный инструмент`,
        descr: function () {
          const def = getText.call(this, "def");
          const power = getText.call(this, "power");
          return {
            current: def.current ? `Увеличивает защиту на ${def.current} и силу на ${power.current}` : "",
            next: def.next ? `Увеличивает защиту на ${def.next} и силу на ${power.next}` : "",
          };
        },
        img: "/assets/skill/chances.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: true,
        branch: "power",
        data: {
          def: [2, 4, 6],
          power: [4, 8, 12],
        },
        fn(hero) {
          hero.setters.incDef(getValue(this, "def"));
          hero.setters.incPower(getValue(this, "power"));
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
        img: "/assets/skill/hairdresser/skillPower_2_1.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "power",
        data: {
          power: [11, 22, 33],
          agility: [-3, -6, -9],
        },
        fn(hero) {
          hero.setters.incPower(getValue(this, "power"));
          hero.setters.incAgility(getValue(this, "agility"));
          hero.setters.incIntellect(getValue(this, "agility"));
        },
      },
      {
        name: "Передышка",
        descr: function () {
          const value = getText.call(this, "value");
          return {
            current: value.current
              ? `"В две руки" восстанавливает ${value.current}% от макс.запаса здоровья героя`
              : "",
            next: value.next ? `"В две руки" восстанавливает ${value.next}% от макс.запаса здоровья героя` : "",
          };
        },
        img: "/assets/skill/hairdresser/skillPower_2_2.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "power",
        data: {
          value: [7, 10, 13],
        },
        fn(hero) {
          SKILLS_HAIRDRESSER[0].data.power_2_2.isOpen = true;
          SKILLS_HAIRDRESSER[0].data.power_2_2.modifierHeal += getValue(this);
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
              ? `"Заточенный инструмент" дополнительно наносит магический урон: ${value.current}% от силы`
              : "",
            next: value.next
              ? `"Заточенный инструмент" дополнительно наносит магический урон: ${value.next}% от силы`
              : "",
          };
        },
        img: "/assets/skill/hairdresser/skillPower_3_1.png",
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
        img: "/assets/skill/hairdresser/skillPower_4_1.png",
        maxPoints: 5,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "power",
        data: {
          chanceCritDamage: [2, 4, 6, 8, 10],
          attack: [4, 8, 12, 16, 20],
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
        img: "/assets/skill/hairdresser/skillAgility_1_1.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: true,
        branch: "agility",
        data: {
          agility: [8, 16, 24],
          powerSkill: [-4, -8, -12],
        },
        fn(hero) {
          hero.setters.incAgility(getValue(this, "agility"));
          hero.setters.incPowerSkill(getValue(this, "powerSkill"));
        },
      },
      {
        name: "Проверенный метод",
        descr: function () {
          const text = getText.call(this, "value");
          return {
            current: text.current ? `Снижает затраты энергии "В две руки" на ${text.current}` : "",
            next: text.next ? `Снижает затраты энергии "В две руки" на ${text.next}` : "",
          };
        },
        img: "/assets/skill/chances.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: true,
        branch: "agility",
        data: {
          value: [10, 20, 30],
        },
        fn(hero) {
          SKILLS_HAIRDRESSER[0].data.costEnergy -= getValue(this);
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
        img: "/assets/skill/hairdresser/skillAgility_2_1.png",
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
        img: "/assets/skill/hairdresser/skillAgility_3_1.png",
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
      {
        name: "Смелый взмах",
        descr: function () {
          const chanceCritDamage = getText.call(this, "chanceCritDamage");
          const intellect = getText.call(this, "intellect");
          return {
            current: chanceCritDamage.current
              ? `Увеличивает шанс крит.удара на ${
                  chanceCritDamage.current
                }%, но снижает интеллект на ${-intellect.current}`
              : "",
            next: chanceCritDamage.next
              ? `Увеличивает шанс крит.удара на ${
                  chanceCritDamage.next
                }%, но снижает интеллект на ${-intellect.next}`
              : "",
          };
        },
        img: "/assets/skill/hairdresser/skillAgility_3_2.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "agility",
        data: {
          chanceCritDamage: [3, 6, 9],
          intellect: [-4, -8, -12],
        },
        fn(hero) {
          SKILLS_HAIRDRESSER[3].data.chanceCritDamage += getValue(this, "chanceCritDamage");
          hero.setters.incIntellect(getValue(this, "intellect"));
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
        img: "/assets/skill/hairdresser/skillAgility_4_1.png",
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
        img: "/assets/skill/hairdresser/skillIntellect_1_1.png",
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
              ? `"Заточенный инструмент" наносит дополнительный магический урон: ${value.current}% от интеллекта`
              : "",
            next: value.next
              ? `"Заточенный инструмент" наносит дополнительный магический урон: ${value.next}% от интеллекта`
              : "",
          };
        },
        img: "/assets/skill/hairdresser/skillIntellect_1_2.png",
        maxPoints: 5,
        currentPoint: 0,
        inc: incPoint,
        open: true,
        branch: "intellect",
        data: {
          value: [40, 55, 70, 85, 100],
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
        img: "/assets/skill/hairdresser/skillIntellect_2_1.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "intellect",
        data: {
          value: [4, 6, 8],
        },
        fn() {
          SKILLS_HAIRDRESSER[2].data.healPercent += getValue(this);
        },
      },
      {
        name: "Защитный фартук",
        descr: function () {
          const maxHp = getText.call(this, "maxHp");
          const intellect = getText.call(this, "intellect");
          return {
            current: maxHp.current
              ? `"В две руки" дает герою барьер - ${maxHp.current}% HP от макс.здоровья + ${intellect.current}% от интеллекта`
              : "",
            next: maxHp.next
              ? `"В две руки" дает герою барьер - ${maxHp.next}% HP от макс.здоровья + ${intellect.next}% от интеллекта`
              : "",
          };
        },
        img: "/assets/skill/hairdresser/skillIntellect_2_2.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "intellect",
        data: {
          maxHp: [8, 10, 12],
          intellect: [100, 150, 200],
        },
        fn() {
          SKILLS_HAIRDRESSER[0].data.intellect_2_2.isOpen = true;
          SKILLS_HAIRDRESSER[0].data.intellect_2_2.modifierMaxHp += getValue(this, "maxHp");
          SKILLS_HAIRDRESSER[0].data.intellect_2_2.modifierIntellect += getValue(this, "intellect") / 100;
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
              ? `"Заточенный инструмент" c шансом ${chance.current}% накладывает кровотечение на ${duration.current} сек. нанося каждую секунду ${modifier.current}% магического урона от макс.здоровья врага`
              : "",
            next: chance.next
              ? `"Заточенный инструмент" c шансом ${chance.next}% накладывает кровотечение на ${duration.next} сек. нанося каждую секунду ${modifier.next}% магического урона от макс.здоровья врага`
              : "",
          };
        },
        img: "/assets/skill/hairdresser/skillIntellect_3_1.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "intellect",
        data: {
          chance: [40, 45, 50],
          duration: [3, 4, 5],
          modifier: [3, 3, 3],
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
            current: text.current
              ? `"Профессиональная подготовка" оглушает противника на ${text.current} секунды`
              : "",
            next: text.next ? `"Профессиональная подготовка" оглушает противника на ${text.next} секунды` : "",
          };
        },
        img: "/assets/skill/hairdresser/skillIntellect_4_1.png",
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
