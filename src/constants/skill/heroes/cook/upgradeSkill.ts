import { UpSkill, UpgradeSkills } from "@/types/skill.types";
import SKILLS_COOK from "./cookSkill";
import { getText, incPoint, getValue, registerSkill } from "../..";
import { IHero } from "@/types/hero.types";
import { healHeroOfSkill } from "../../utils";
import { goDamage } from "@/constants/func/fight";
import { IEnemy } from "@/types/enemy.types";

export const upgradeCookSkills: UpgradeSkills = {
  power: {
    totalPoint: 0,
    openLevels: ["level_1"],
    level_1: [
      {
        name: "Жирок",
        descr: function () {
          const text = getText.call(this, "value");
          return {
            current: text.current ? `Увеличивает макс.здоровье на ${text.current}` : "",
            next: text.next ? `Увеличивает макс.здоровье на ${text.next}` : "",
          };
        },
        img: "/src/assets/skill/cook/skillPower_1_1.png",
        maxPoints: 5,
        currentPoint: 0,
        inc: incPoint,
        open: true,
        branch: "power",
        data: {
          value: [120, 240, 360, 480, 600],
        },
        fn(hero) {
          hero.setters.incMaxHp(getValue(this));
        },
      },
    ],
    level_2: [
      {
        name: "Ком в горле",
        descr: function () {
          const text = getText.call(this, "value");
          return {
            current: text.current
              ? `"Отвар яда" в момент срабатывания единожды наносит чистый урон - ${text.current}% от силы`
              : "",
            next: text.next
              ? `"Отвар яда" в момент срабатывания единожды наносит чистый урон: ${text.next}% от силы`
              : "",
          };
        },
        img: "/src/assets/skill/cook/skillPower_2_1.png",
        maxPoints: 5,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "power",
        data: {
          value: [100, 130, 160, 190, 210],
        },
        fn(hero) {
          SKILLS_COOK[2].data.power_2_1.isOpen = true;
          SKILLS_COOK[2].data.power_2_1.modifierPower += getValue(this) / 100;
        },
      },
      {
        name: "Толстая кожа",
        descr: function () {
          const power = getText.call(this, "power");
          const def = getText.call(this, "def");
          return {
            current: power.current ? `Увеличивает силу на ${power.current} и защиту на ${def.current}` : "",
            next: def.next ? `Увеличивает силу на ${power.next} и защиту на ${def.next}` : "",
          };
        },
        img: "/src/assets/skill/cook/skillPower_2_2.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "power",
        data: {
          power: [3, 6, 9],
          def: [3, 6, 9],
        },
        fn(hero) {
          hero.setters.incPower(getValue(this, "power"));
          hero.setters.incDef(getValue(this, "def"));
        },
      },
    ],
    level_3: [
      {
        name: "Бой на ножах",
        descr: function () {
          const value = getText.call(this, "value");
          const powerSkill = getText.call(this, "powerSkill");
          return {
            current: value.current
              ? `Увеличивает шанс критического удара на ${
                  value.current
                }%, но снижает силу умений на ${-powerSkill.current}`
              : "",
            next: value.next
              ? `Увеличивает шанс критического удара на ${
                  value.next
                }%, но снижает силу умений на ${-powerSkill.next}`
              : "",
          };
        },
        img: "/src/assets/skill/cook/skillPower_3_1.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "power",
        data: {
          value: [3, 6, 9],
          powerSkill: [-6, -12, -18],
        },
        fn(hero) {
          SKILLS_COOK[3].data.chanceCritDamage += getValue(this);
          hero.setters.incPowerSkill(getValue(this, "powerSkill"));
        },
      },
      {
        name: "Голодная ярость",
        descr: function () {
          const text = getText.call(this, "value");
          return {
            current: text.current
              ? `"Во все оружии" дополнительно увеличивает наносимый на ${text.current}% и снижает получаемый урон на ${text.current}%`
              : "",
            next: text.next
              ? `"Во все оружии" дополнительно увеличивает наносимый на ${text.next}% и снижает получаемый урон на ${text.next}%`
              : "",
          };
        },
        img: "/src/assets/skill/cook/skillPower_3_2.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "power",
        data: {
          value: [4, 6, 8],
        },
        fn(hero) {
          SKILLS_COOK[0].data.modifierDamage += getValue(this);
          SKILLS_COOK[0].data.modifierDef += getValue(this);
        },
      },
    ],
    level_4: [
      {
        name: "На массе",
        descr: function () {
          const value = getText.call(this, "value");
          const debuff = getText.call(this, "debuff");
          return {
            current: value.current
              ? `Увеличивает силу и атаку на ${value.current}, но снижает скорость атаки на ${-debuff.current}`
              : "",
            next: value.next
              ? `Увеличивает силу и атаку на ${value.next}, но снижает скорость атаки на ${-debuff.next}`
              : "",
          };
        },
        img: "/src/assets/skill/cook/skillPower_4_1.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "power",
        data: {
          value: [10, 20, 30],
          debuff: [-0.05, -0.1, -0.15],
        },
        fn(hero) {
          hero.setters.incAttack(getValue(this));
          hero.setters.incPower(getValue(this));
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
        name: "Ловкость рук",
        descr: function () {
          const agility = getText.call(this, "agility");
          const attack = getText.call(this, "attack");
          return {
            current: agility.current
              ? `Увеличивает ловкость на ${agility.current} и атаку на ${attack.current}`
              : "",
            next: agility.next ? `Увеличивает ловкость на ${agility.next} и атаку на ${attack.next}` : "",
          };
        },
        img: "/src/assets/skill/cook/skillAgility_1_1.png",
        maxPoints: 5,
        currentPoint: 0,
        inc: incPoint,
        open: true,
        branch: "agility",
        data: {
          agility: [4, 8, 12, 16, 20],
          attack: [3, 6, 9, 12, 15],
        },
        fn(hero) {
          hero.setters.incAgility(getValue(this, "agility"));
          hero.setters.incAttack(getValue(this, "attack"));
        },
      },
    ],
    level_2: [
      {
        name: "Забинтовать порез",
        descr: function () {
          const text = getText.call(this, "value");
          return {
            current: text.current
              ? `При получении критического удара, восстанавилвает здоровье: ${text.current}% от ловкости`
              : "",
            next: text.next
              ? `При получении критического удара, восстанавилвает здоровье: ${text.next}% от ловкости`
              : "",
          };
        },
        img: "/src/assets/skill/cook/skillAgility_2_1.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "agility",
        data: {
          value: [150, 200, 250],
          modifierHeal: 0,
        },
        fn(hero) {
          this.data.modifierHeal += getValue(this);
          if (this.currentPoint === 1) {
            registerSkill(skill.bind(this), "afterEnemyCrit");

            function skill(this: UpSkill, hero: IHero) {
              const healValue = Math.floor(hero.getters.getAgility() * (this.data.modifierHeal / 100));
              healHeroOfSkill(hero, healValue, 0, false);
            }
          }
        },
      },
      {
        name: "Быстрая готовка",
        descr: function () {
          const text = getText.call(this, "value");
          return {
            current: text.current
              ? `"Во все оружии" так же повышает скорость атаки героя на ${text.current}%`
              : "",
            next: text.next ? `"Во все оружии" так же повышает скорость атаки героя на ${text.next}%` : "",
          };
        },
        img: "/src/assets/skill/cook/skillAgility_2_2.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "agility",
        data: {
          value: [10, 15, 20],
        },
        fn(hero) {
          SKILLS_COOK[0].data.agility_2_2.isOpen = true;
          SKILLS_COOK[0].data.agility_2_2.modifier += getValue(this);
        },
      },
    ],
    level_3: [
      {
        name: "Шинкование в слепую",
        descr: function () {
          const attackSpeed = getText.call(this, "attackSpeed");
          const intellect = getText.call(this, "intellect");
          return {
            current: attackSpeed.current
              ? `Увеличивает скорость атаки на ${
                  attackSpeed.current
                }, но уменьшает интеллект на ${-intellect.current}`
              : "",
            next: attackSpeed.next
              ? `Увеличивает скорость атаки на ${attackSpeed.next}, но уменьшает интеллект на ${-intellect.next}`
              : "",
          };
        },
        img: "/src/assets/skill/cook/skillAgility_3_1.png",
        maxPoints: 5,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "agility",
        data: {
          attackSpeed: [0.1, 0.2, 0.3, 0.4, 0.5],
          intellect: [-8, -16, -24, -32, -40],
        },
        fn(hero) {
          hero.setters.incAttackSpeed(getValue(this, "attackSpeed"));
          hero.setters.incIntellect(getValue(this, "intellect"));
        },
      },
      {
        name: "Опасные добавки",
        descr: function () {
          const chanceCritDamage = getText.call(this, "chanceCritDamage");
          const maxHp = getText.call(this, "maxHp");
          return {
            current: chanceCritDamage.current
              ? `Увеличивает шанс крит.удара на ${
                  chanceCritDamage.current
                }%, но уменьшает макс.запас здоровья на ${-maxHp.current}`
              : "",
            next: chanceCritDamage.next
              ? `Увеличивает шанс крит.удара на ${
                  chanceCritDamage.next
                }%, но уменьшает макс.запас здоровья на ${-maxHp.next}`
              : "",
          };
        },
        img: "/src/assets/skill/cook/skillAgility_3_2.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "agility",
        data: {
          chanceCritDamage: [3, 6, 9],
          maxHp: [-50, -100, -150],
        },
        fn(hero) {
          SKILLS_COOK[3].data.chanceCritDamage += getValue(this, "chanceCritDamage");
          hero.setters.incMaxHp(getValue(this, "maxHp"));
        },
      },
    ],
    level_4: [
      {
        name: "Заточенные ножи",
        descr: function () {
          const text = getText.call(this, "value");
          return {
            current: text.current
              ? `При атаках, вы дополнительно ингорируете ${text.current}% защиты противника`
              : "",
            next: text.next ? `При атаках, вы дополнительно ингорируете ${text.next}% защиты противника` : "",
          };
        },
        img: "/src/assets/skill/cook/skillAgility_4_1.png",
        maxPoints: 5,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "agility",
        data: {
          value: [18, 27, 36, 45, 54],
        },
        fn(hero) {
          hero.setters.incIgnoreDef(getValue(this));
        },
      },
    ],
  },
  intellect: {
    totalPoint: 0,
    openLevels: ["level_1"],
    level_1: [
      {
        name: "Дедушкины рецепты",
        descr: function () {
          const text = getText.call(this, "value");
          return {
            current: text.current ? `Увеличивает интеллект на ${text.current}` : "",
            next: text.next ? `Увеличивает интеллект на ${text.next}` : "",
          };
        },
        img: "/src/assets/skill/cook/skillIntellect_1_1.png",
        maxPoints: 5,
        currentPoint: 0,
        inc: incPoint,
        open: true,
        branch: "intellect",
        data: {
          value: [6, 12, 18, 24, 30],
        },
        fn(hero) {
          hero.setters.incIntellect(getValue(this));
        },
      },
    ],
    level_2: [
      {
        name: "Прочная утварь",
        descr: function () {
          const text = getText.call(this, "value");
          return {
            current: text.current ? `Увеличивает защиту на ${text.current}` : "",
            next: text.next ? `Увеличивает защиту на ${text.next}` : "",
          };
        },
        img: "/src/assets/skill/cook/skillIntellect_2_1.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "intellect",
        data: {
          value: [4, 8, 12],
        },
        fn(hero) {
          hero.setters.incDef(getValue(this));
        },
      },
      {
        name: "Слабительное",
        descr: function () {
          const text = getText.call(this, "value");
          return {
            current: text.current ? `"Отвар яда" также снижает урон противника на ${text.current}%` : "",
            next: text.next ? `"Отвар яда" также снижает урон противника на ${text.next}%` : "",
          };
        },
        img: "/src/assets/skill/cook/skillIntellect_2_2.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "intellect",
        data: {
          value: [7, 9, 11],
        },
        fn(hero) {
          SKILLS_COOK[2].data.intellect_2_2.isOpen = true;
          SKILLS_COOK[2].data.intellect_2_2.modifierDebuff += getValue(this);
        },
      },
    ],
    level_3: [
      {
        name: "Жгучая отрава",
        descr: function () {
          const text = getText.call(this, "value");
          return {
            current: text.current ? `"Отвар яда" наносит дополнительный урон: ${text.current}% от интеллекта` : "",
            next: text.next ? `"Отвар яда" наносит дополнительный урон: ${text.next}% от интеллекта` : "",
          };
        },
        img: "/src/assets/skill/cook/skillIntellect_3_1.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "intellect",
        data: {
          value: [30, 45, 60],
        },
        fn() {
          SKILLS_COOK[2].data.intellect_3_1.isOpen = true;
          SKILLS_COOK[2].data.intellect_3_1.modifierOfIntellect += getValue(this) / 100;
        },
      },
      {
        name: "Любитель выпить",
        descr: function () {
          const duration = getText.call(this, "duration");
          const text = getText.call(this, "value");
          return {
            current: text.current
              ? `"Перезарядка "Сиропчика" снижается на ${duration.current} сек, также уменьшает макс.здоровья на ${text.current}`
              : "",
            next: text.next
              ? `"Перезарядка "Сиропчика" снижается на ${duration.next} сек, также уменьшает макс.здоровья на ${text.next}`
              : "",
          };
        },
        img: "/src/assets/skill/cook/skillIntellect_3_2.png",
        maxPoints: 2,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "intellect",
        data: {
          duration: [0.5, 1],
          value: [100, 200],
        },
        fn(hero) {
          hero.setters.incMaxHp(-getValue(this));
          SKILLS_COOK[1].data.cooldownCount -= getValue(this, "duration");
        },
      },
    ],
    level_4: [
      {
        name: "Соль на рану",
        descr: function () {
          const text = getText.call(this, "value");
          return {
            current: text.current
              ? `При критическом ударе наносит дополнительный чистый урон: ${text.current}% от интеллекта`
              : "",
            next: text.next
              ? `При критическом ударе наносит дополнительный чистый урон: ${text.next}% от интеллекта`
              : "",
          };
        },
        img: "/src/assets/skill/cook/skillIntellect_4_1.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "intellect",
        data: {
          value: [125, 175, 225],
          modifierDamage: 0,
        },
        fn() {
          this.data.modifierDamage += getValue(this);
          if (this.currentPoint === 1) {
            registerSkill(skill.bind(this), "afterHeroCrit");

            function skill(this: UpSkill, hero: IHero, target: IEnemy) {
              const damage = Math.floor(hero.getters.getIntellect() * (this.data.modifierDamage / 100));
              goDamage(target, damage);
            }
          }
        },
      },
    ],
  },
};
