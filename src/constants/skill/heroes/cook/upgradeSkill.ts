import { UpSkill, UpgradeSkills } from "@/types/skill.types";
import SKILLS_COOK from "./cookSkill";
import { getText, incPoint, getValue, registerSkill } from "..";
import { IHero } from "@/types/hero.types";
import { goPureDamage, goHealHeroOfSkill, goPhysicalDamage } from "../../utils";
import { IEnemy } from "@/types/enemy.types";
import { getPercent } from "@/utils/getPercent";

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
            current: text.current ? `Увеличивает макс.запас здоровья на ${text.current}` : "",
            next: text.next ? `Увеличивает макс.запас здоровья на ${text.next}` : "",
          };
        },
        img: "/assets/skill/cook/skillPower_1_1.png",
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
        name: "Ком в горле",
        descr: function () {
          const text = getText.call(this, "value");
          return {
            current: text.current
              ? `"Отвар яда" в момент срабатывания единожды наносит магический урон - ${text.current}% от силы`
              : "",
            next: text.next
              ? `"Отвар яда" в момент срабатывания единожды наносит магический урон: ${text.next}% от силы`
              : "",
          };
        },
        img: "/assets/skill/cook/skillPower_2_1.png",
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
        img: "/assets/skill/cook/skillPower_2_2.png",
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
        img: "/assets/skill/cook/skillPower_3_1.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "power",
        data: {
          value: [4, 8, 12],
          powerSkill: [-5, -10, -15],
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
        img: "/assets/skill/cook/skillPower_3_2.png",
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
        img: "/assets/skill/cook/skillPower_4_1.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "power",
        data: {
          value: [10, 20, 30],
          debuff: [-0.07, -0.14, -0.21],
        },
        fn(hero) {
          hero.setters.incAttack(getValue(this));
          hero.setters.incPower(getValue(this));
          hero.setters.incAttackSpeed(getValue(this, "debuff"));
        },
      },
    ],
    level_5: [
      {
        name: "Мясник",
        descr: function () {
          const modifierMaxHp = getText.call(this, "modifierMaxHp");
          const cooldown = getText.call(this, "cooldown");
          return {
            current: modifierMaxHp.current
              ? `Каждые ${cooldown.current} секунды ваша следующая атака нанесет дополнительно ${modifierMaxHp.current}% физического урона от макс.запаса здоровья героя и проигнорирует защиту противника`
              : "",
            next: modifierMaxHp.next
              ? `Каждые ${cooldown.next} секунды ваша следующая атака нанесет дополнительно ${modifierMaxHp.next}% физического урона от макс.запаса здоровья героя и проигнорирует защиту противника`
              : "",
          };
        },
        img: "/assets/skill/cook/skillPower_5_1.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "power",
        data: {
          modifierMaxHp: [6, 7, 8],
          cooldown: [8, 7, 6],
          isCooldown: false,
        },
        fn(hero) {
          if (this.currentPoint === 1) {
            registerSkill(skill.bind(this), "afterInitiatorAttack");

            function skill(this: UpSkill, hero: IHero, target: IEnemy) {
              if (this.data.isCooldown) return;
              this.data.isCooldown = true;
              setTimeout(() => (this.data.isCooldown = false), getValue(this, "cooldown", true) * 1000);
              hero.pushSkillText(this.name);
              const damage = getPercent(hero.getters.getMaxHp(), getValue(this, "modifierMaxHp", true));
              goPhysicalDamage(hero, target, damage, { ignoreDef: 100 });
            }
          }
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
        img: "/assets/skill/cook/skillAgility_1_1.png",
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
        img: "/assets/skill/cook/skillAgility_2_1.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "agility",
        data: {
          value: [175, 225, 275],
        },
        fn(hero) {
          if (this.currentPoint === 1) {
            registerSkill(skill.bind(this), "afterTargetCrit");

            function skill(this: UpSkill, hero: IHero) {
              const healValue = hero.getters.getAgility() * (getValue(this) / 100);
              goHealHeroOfSkill(hero, healValue, 0);
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
        img: "/assets/skill/cook/skillAgility_2_2.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "agility",
        data: {
          value: [12, 20, 28],
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
        img: "/assets/skill/cook/skillAgility_3_1.png",
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
              ? `Увеличивает шанс критического удара на ${
                  chanceCritDamage.current
                }%, но уменьшает макс.запас здоровья на ${-maxHp.current}`
              : "",
            next: chanceCritDamage.next
              ? `Увеличивает шанс критического удара на ${
                  chanceCritDamage.next
                }%, но уменьшает макс.запас здоровья на ${-maxHp.next}`
              : "",
          };
        },
        img: "/assets/skill/cook/skillAgility_3_2.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "agility",
        data: {
          chanceCritDamage: [4, 7, 9],
          maxHp: [-60, -120, -180],
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
        img: "/assets/skill/cook/skillAgility_4_1.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "agility",
        data: {
          value: [30, 45, 60],
        },
        fn(hero) {
          hero.setters.incIgnoreDef(getValue(this));
        },
      },
    ],
    level_5: [
      {
        name: "Соль на рану",
        descr: function () {
          const modifierAgility = getText.call(this, "modifierAgility");
          const modifierHeal = getText.call(this, "modifierHeal");
          const cooldown = getText.call(this, "cooldown");
          return {
            current: modifierAgility.current
              ? `При критическом ударе наносит дополнительный чистый урон: ${modifierAgility.current}% от ловкости и исцеляет героя на ${modifierHeal.current}% от этого значения. Перезарядка: ${cooldown.current} секунд`
              : "",
            next: modifierAgility.next
              ? `При критическом ударе наносит дополнительный чистый урон: ${modifierAgility.next}% от ловкости и исцеляет героя на ${modifierHeal.next}% от этого значения. Перезарядка: ${cooldown.next} секунд`
              : "",
          };
        },
        img: "/assets/skill/cook/skillAgility_5_1.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "agility",
        data: {
          modifierAgility: [150, 175, 200],
          modifierHeal: [40, 50, 60],
          cooldown: [7, 6, 5],
          isCooldown: false,
        },
        fn() {
          if (this.currentPoint === 1) {
            registerSkill(skill.bind(this), "afterInitiatorCrit");

            function skill(this: UpSkill, hero: IHero, target: IEnemy) {
              if (this.data.isCooldown) return;
              this.data.isCooldown = true;
              setTimeout(() => (this.data.isCooldown = false), getValue(this, "cooldown", true) * 1000);
              hero.pushSkillText(this.name);
              const damage = hero.getters.getAgility() * (getValue(this, "modifierAgility", true) / 100);
              const heal = goPureDamage(hero, target, damage) * (getValue(this, "modifierHeal", true) / 100);
              goHealHeroOfSkill(hero, heal, 0, false);
            }
          }
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
        img: "/assets/skill/cook/skillIntellect_1_1.png",
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
        img: "/assets/skill/cook/skillIntellect_2_1.png",
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
            current: text.current ? `"Отвар яда" также снижает наносимый урон противника на ${text.current}%` : "",
            next: text.next ? `"Отвар яда" также снижает наносимый урон противника на ${text.next}%` : "",
          };
        },
        img: "/assets/skill/cook/skillIntellect_2_2.png",
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
          const decAttack = getText.call(this, "decAttack");
          return {
            current: text.current
              ? `Уменьшает атаку героя на ${-decAttack.current}. Яд от вашего "Отвар яда" наносит дополнительный урон: ${
                  text.current
                }% от интеллекта`
              : "",
            next: text.next
              ? `Уменьшает атаку героя на ${-decAttack.next}. Яд от вашего "Отвар яда" наносит дополнительный урон: ${
                  text.next
                }% от интеллекта`
              : "",
          };
        },
        img: "/assets/skill/cook/skillIntellect_3_1.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "intellect",
        data: {
          value: [40, 55, 70],
          decAttack: [-10, -20, -30],
        },
        fn(hero) {
          hero.setters.incAttack(getValue(this, "decAttack"));
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
        img: "/assets/skill/cook/skillIntellect_3_2.png",
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
        name: "Охлажденный напиток",
        descr: function () {
          const text = getText.call(this, "value");
          return {
            current: text.current
              ? `"Отвар яда" накладывает охлаждение на противника, снижая его скорость атаки на ${text.current}%`
              : "",
            next: text.next
              ? `"Отвар яда" накладывает охлаждение на противника, снижая его скорость атаки на ${text.next}%`
              : "",
          };
        },
        img: "/assets/skill/cook/skillIntellect_4_1.png",
        maxPoints: 5,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "intellect",
        data: {
          value: [7, 10, 13, 18, 21],
        },
        fn() {
          SKILLS_COOK[2].data.intellect_4_1.isOpen = true;
          SKILLS_COOK[2].data.intellect_4_1.modifierOfFreeze += getValue(this);
        },
      },
      {
        name: "Мастер яда",
        descr: function () {
          const duration = getText.call(this, "duration");
          return {
            current: duration.current
              ? `"Отвар яда" накладывает на противника 1 слой "Темное проклятие" на ${duration.current} секунд`
              : "",
            next: duration.next
              ? `"Отвар яда" накладывает на противника 1 слой "Темное проклятие" на ${duration.next} секунд`
              : "",
          };
        },
        img: "/assets/skill/cook/skillIntellect_4_2.png",
        maxPoints: 2,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "intellect",
        data: {
          duration: [7, 10],
        },
        fn() {
          SKILLS_COOK[2].data.intellect_4_2.isOpen = true;
          SKILLS_COOK[2].data.intellect_4_2.duration += getValue(this, "duration");
        },
      },
    ],
    level_5: [
      {
        name: "Всегда под рукой",
        descr: function () {
          const chance = getText.call(this, "chance");

          return {
            current: chance.current ? `Шанс применения "Сиропчик" увеличивается на ${chance.current}%` : "",
            next: chance.next ? `Шанс применения "Сиропчик" увеличивается на ${chance.next}%` : "",
          };
        },
        img: "/assets/skill/cook/skillIntellect_5_1.png",
        maxPoints: 2,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "intellect",
        data: {
          chance: [3, 5],
        },
        fn(hero) {
          SKILLS_COOK[1].data.chance += getValue(this, "chance");
        },
      },
      // {
      //   name: "Передозировка",
      //   descr: function () {
      //     const cooldown = getText.call(this, "cooldown");
      //     const countdown = getText.call(this, "countdown");
      //     return {
      //       current: cooldown.current
      //         ? `Через 4 секунды после применения "Отвар яда" оглушает противника на 1 секунду. Перезарядка: ${cooldown.current} секунд`
      //         : "",
      //       next: cooldown.next
      //         ? `Через 4 секунды после применения "Отвар яда" оглушает противника на 1 секунду. Перезарядка: ${cooldown.next} секунд`
      //         : "",
      //     };
      //   },
      //   img: "/assets/skill/cook/skillPower_4_1.png",
      //   maxPoints: 3,
      //   currentPoint: 0,
      //   inc: incPoint,
      //   open: false,
      //   branch: "intellect",
      //   data: {
      //     cooldown: [9, 7, 5],
      //     countdown: [4, 4, 4],
      //   },
      //   fn(hero) {
      //     SKILLS_COOK[2].data.intellect_5_1.isOpen = true;
      //     SKILLS_COOK[2].data.intellect_5_1.cooldown += getValue(this, "cooldown", true);
      //     SKILLS_COOK[2].data.intellect_5_1.countdown += getValue(this, "countdown", true);
      //   },
      // },
    ],
  },
};
