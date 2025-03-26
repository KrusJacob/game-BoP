import { UpSkill, UpgradeSkills } from "@/types/skill.types";
import SKILLS_PRIEST from "./priestSkill";
import { getText, incPoint, getValue, registerSkill } from "..";
import { IHero } from "@/types/hero.types";
import { IEnemy } from "@/types/enemy.types";
import { goHealHeroOfSkill, goMagicalDamage, goPureDamage } from "../../utils";
import { damageToHP, goDamage, goDarkCurse, goStun } from "@/constants/func/fight";
import { getRandom } from "@/utils/getRandom";

export const upgradePriestSkills: UpgradeSkills = {
  power: {
    totalPoint: 0,
    openLevels: ["level_1"],
    level_1: [
      {
        name: `Получить обед`,
        descr: function () {
          const power = getText.call(this, "power");
          const maxHp = getText.call(this, "maxHp");
          return {
            current: power.current
              ? `Увеличивает силу на ${power.current} и макс.здоровье на ${maxHp.current}`
              : "",
            next: power.next ? `Увеличивает силу на ${power.next} и макс.здоровье на ${maxHp.next}` : "",
          };
        },
        img: "/assets/skill/priest/skillPower_1_1.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: true,
        branch: "power",
        data: {
          power: [2, 4, 6],
          maxHp: [80, 160, 240],
        },
        fn(hero) {
          hero.setters.incPower(getValue(this, "power"));
          hero.setters.incMaxHp(getValue(this, "maxHp"));
        },
      },
      {
        name: "Усиленная молитва",
        descr: function () {
          const text = getText.call(this, "value");
          return {
            current: text.current
              ? `Прочность барьера от "Молитва" увеличивается на ${text.current}% от силы героя`
              : "",
            next: text.next ? `Прочность барьера от "Молитва" увеличивается на ${text.next}% от силы героя` : "",
          };
        },
        img: "/assets/skill/priest/skillPower_1_2.png",
        maxPoints: 5,
        currentPoint: 0,
        inc: incPoint,
        open: true,
        branch: "power",
        data: {
          value: [120, 160, 200, 240, 280],
        },
        fn(hero) {
          SKILLS_PRIEST[0].data.power_1_2.isOpen = true;
          SKILLS_PRIEST[0].data.power_1_2.modifierPower += getValue(this) / 100;
        },
      },
    ],
    level_2: [
      {
        name: "Латы паладина",
        descr: function () {
          const def = getText.call(this, "def");
          const decDodge = getText.call(this, "decDodge");
          return {
            current: def.current
              ? `Увеличивает защиту ${def.current}, но уменьшает уклонение на ${decDodge.current}%`
              : "",
            next: def.next ? `Увеличивает защиту ${def.next}, но уменьшает уклонение на ${-decDodge.next}%` : "",
          };
        },
        img: "/assets/skill/priest/skillPower_2_1.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "power",
        data: {
          def: [6, 12, 18],
          decDodge: [-2, -4, -6],
        },
        fn(hero) {
          hero.setters.incDef(getValue(this, "def"));
          SKILLS_PRIEST[3].data.chanceEvade += getValue(this, "decDodge");
        },
      },
      {
        name: "Молот правосудия",
        descr: function () {
          const cooldown = getText.call(this, "cooldown");
          const modifierPower = getText.call(this, "modifierPower");
          const duration = getText.call(this, "duration");
          return {
            current: cooldown.current
              ? `Каждые ${cooldown.current} секунд вы наносите врагу чистый урон: ${modifierPower.current}% от силы героя и оглушаете на ${duration.current} секунд`
              : "",
            next: cooldown.next
              ? `Каждые ${cooldown.next} секунд вы наносите врагу чистый урон: ${modifierPower.next}% от силы героя и оглушаете на ${duration.next} секунд`
              : "",
          };
        },
        img: "/assets/skill/priest/skillPower_2_2.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "power",
        data: {
          cooldown: [9, 8, 7],
          modifierPower: [120, 140, 160],
          duration: [1, 1, 1],
        },
        fn(hero) {
          if (this.currentPoint === 1) {
            registerSkill(skill.bind(this), "inBeginFight");

            function skill(this: UpSkill, hero: IHero, target: IEnemy) {
              const damage = (getValue(this, "modifierPower", true) * hero.getters.getPower()) / 100;
              const cooldown = getValue(this, "cooldown", true) * 1000;
              const interval = setInterval(() => {
                if (hero.status.death || target.status.death) {
                  clearInterval(interval);
                  return;
                }
                hero.pushSkillText(this.name);
                console.log(goPureDamage(hero, target, damage), "damage");
                goStun(target, getValue(this, "duration", true));
              }, cooldown);
            }
          }
        },
      },
    ],
    level_3: [
      {
        name: "Долой пост",
        descr: function () {
          const value = getText.call(this, "value");
          const agility = getText.call(this, "agility");
          return {
            current: value.current
              ? `Увеличивает силу и атаку героя на ${value.current}, но уменьшает ловкость на ${-agility.current}`
              : "",
            next: value.next
              ? `Увеличивает силу и атаку героя на ${value.next}, но уменьшает ловкость на ${-agility.next}`
              : "",
          };
        },
        img: "/assets/skill/priest/skillPower_3_1.png",
        maxPoints: 5,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "power",
        data: {
          value: [7, 14, 21, 28, 35],
          agility: [-2, -4, -8, -12, -16],
        },
        fn(hero) {
          hero.setters.incPower(getValue(this, "value"));
          hero.setters.incAttack(getValue(this, "value"));
          hero.setters.incAgility(getValue(this, "agility"));
        },
      },
    ],
    level_4: [
      {
        name: "Божественное вмешательство",
        descr: function () {
          const healValue = getText.call(this, "healValue");
          const healPercent = getText.call(this, "healPercent");
          const energy = getText.call(this, "energy");
          const cooldown = getText.call(this, "cooldown");
          return {
            current: healValue.current
              ? `При получении критического урона, восстанавливает герою ${healValue.current} здоровья + ${healPercent.current}% от макс.здоровья и дает ${energy.current} энергии. Перезарядка: ${cooldown.current} с.`
              : "",
            next: healValue.next
              ? `При получении критического урона, восстанавливает герою ${healValue.next} здоровья + ${healPercent.next}% от макс.здоровья и дает ${energy.next} энергии. Перезарядка: ${cooldown.next} с.`
              : "",
          };
        },
        img: "/assets/skill/priest/skillPower_4_1.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "power",
        data: {
          healValue: [250, 325, 400],
          healPercent: [6, 8, 10],
          energy: [10, 15, 20],
          cooldown: [9, 8, 7],
          isCooldown: false,
        },
        fn(hero) {
          if (this.currentPoint === 1) {
            registerSkill(skill.bind(this), "afterTargetCrit");

            function skill(this: UpSkill, hero: IHero, target: IEnemy) {
              if (this.data.isCooldown) return;
              hero.pushSkillText(this.name);
              const cooldown = getValue(this, "cooldown", true) * 1000;
              goHealHeroOfSkill(hero, getValue(this, "healValue", true), getValue(this, "healPercent", true));
              hero.energy.value += getValue(this, "energy", true);
              this.data.isCooldown = true;
              setTimeout(() => {
                this.data.isCooldown = false;
              }, cooldown);
            }
          }
        },
      },
    ],
    level_5: [
      {
        name: "Кара богов",
        descr: function () {
          const damage = getText.call(this, "damage");
          const delay = getText.call(this, "delay");
          return {
            current: damage.current
              ? `Через ${delay.current} секунд от начала боя наносит противнику ${damage.current} чистого урона`
              : "",
            next: damage.next
              ? `Через ${delay.next} секунд от начала боя наносит противнику ${damage.next} чистого урона`
              : "",
          };
        },
        img: "/assets/skill/priest/skillPower_5_1.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "power",
        data: {
          damage: [500, 650, 800],
          delay: [16, 14, 12],
        },
        fn(hero) {
          if (this.currentPoint === 1) {
            registerSkill(skill.bind(this), "inBeginFight");

            function skill(this: UpSkill, hero: IHero, target: IEnemy) {
              const timeout = setTimeout(() => {
                if (hero.status.death && target.status.death) return;

                hero.pushSkillText(this.name);
                goPureDamage(hero, target, getValue(this, "damage", true));
              }, getValue(this, "delay", true) * 1000);
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
        name: "Священные клики",
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
        img: "/assets/skill/priest/skillAgility_1_1.png",
        maxPoints: 5,
        currentPoint: 0,
        inc: incPoint,
        open: true,
        branch: "agility",
        data: {
          agility: [3, 6, 9, 12, 15],
          attack: [5, 10, 15, 20, 25],
        },
        fn(hero) {
          hero.setters.incAgility(getValue(this, "agility"));
          hero.setters.incAttack(getValue(this, "attack"));
        },
      },
    ],
    level_2: [
      {
        name: "Боевое мастерство",
        descr: function () {
          const attack = getText.call(this, "attack");
          const intellect = getText.call(this, "intellect");
          return {
            current: attack.current
              ? `Увеличивает атаку на ${attack.current}, но снижает интеллект на ${-intellect.current}`
              : "",
            next: attack.next
              ? `Увеличивает атаку на ${attack.next}, но снижает интеллект на ${-intellect.next}`
              : "",
          };
        },
        img: "/assets/skill/priest/skillAgility_2_1.png",
        maxPoints: 5,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "agility",
        data: {
          attack: [11, 22, 33, 44, 55],
          intellect: [-4, -8, -12, -16, -20],
        },
        fn(hero) {
          hero.setters.incAttack(getValue(this, "attack"));
          hero.setters.incIntellect(getValue(this, "intellect"));
        },
      },
      {
        name: "Просветление",
        descr: function () {
          const text = getText.call(this, "value");
          return {
            current: text.current ? `"Молитва" также повышает скорость атаки на ${text.current}%` : "",
            next: text.next ? `"Молитва" также повышает скорость атаки на ${text.next}%` : "",
          };
        },
        img: "/assets/skill/priest/skillAgility_2_2.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "agility",
        data: {
          value: [30, 45, 60],
        },
        fn(hero) {
          SKILLS_PRIEST[0].data.agility_2_2.isOpen = true;
          SKILLS_PRIEST[0].data.agility_2_2.attackSpeed = getValue(this, "value", true);
        },
      },
    ],
    level_3: [
      {
        name: "Удар правосудия",
        descr: function () {
          const maxCountAttack = getText.call(this, "maxCountAttack");
          const modifierDamage = getText.call(this, "modifierDamage");
          return {
            current: maxCountAttack.current
              ? `Каждый ${maxCountAttack.current}-ый удар наносит дополнительно чистый урон: ${modifierDamage.current}% от атаки и исцеляет на это же значение`
              : "",
            next: maxCountAttack.next
              ? `Каждый ${maxCountAttack.next}-ый удар наносит дополнительно чистый урон: ${modifierDamage.next}% от атаки и исцеляет на это же значение`
              : "",
          };
        },
        img: "/assets/skill/priest/skillAgility_3_1.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "agility",
        data: {
          maxCountAttack: [7, 6, 5],
          currentCountAttack: 0,
          modifierDamage: [90, 100, 110],
        },
        fn() {
          if (this.currentPoint === 1) {
            registerSkill(skill.bind(this), "afterInitiatorAttack");

            function skill(this: UpSkill, hero: IHero, target: IEnemy) {
              this.data.currentCountAttack += 1;
              if (this.data.currentCountAttack === getValue(this, "maxCountAttack", true)) {
                hero.pushSkillText(this.name);
                this.data.currentCountAttack = 0;
                const damage = hero.getters.getAttack() * (getValue(this, "modifierDamage", true) / 100);
                goPureDamage(hero, target, damage);
                goHealHeroOfSkill(hero, damage, 0, false);
              }
            }
          }
        },
      },
      {
        name: "Помянуть усопшего",
        descr: function () {
          const healPercent = getText.call(this, "healPercent");
          const energy = getText.call(this, "energy");
          return {
            current: healPercent.current
              ? `В конце боя восстанавливает себе ${healPercent.current}% от макс.здоровья и ${energy.current} энергии`
              : "",
            next: healPercent.next
              ? `В конце боя восстанавливает себе ${healPercent.next}% от макс.здоровья и ${energy.next} энергии`
              : "",
          };
        },
        img: "/assets/skill/priest/skillAgility_3_2.png",
        maxPoints: 2,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "agility",
        data: {
          healPercent: [12, 16],
          energy: [10, 15],
        },
        fn() {
          if (this.currentPoint === 1) {
            registerSkill(skill.bind(this), "inEndFight");

            function skill(this: UpSkill, hero: IHero, target: IEnemy) {
              hero.pushSkillText(this.name);
              goHealHeroOfSkill(hero, 0, getValue(this, "healPercent", true));
              console.log(getValue(this, "energy", true), "- energy");
              hero.energy.value += getValue(this, "energy", true);
            }
          }
        },
      },
    ],
    level_4: [
      {
        name: "Воин света",
        descr: function () {
          const def = getText.call(this, "def");
          const chanceCritDamage = getText.call(this, "chanceCritDamage");
          const chanceEvade = getText.call(this, "chanceEvade");
          return {
            current: def.current
              ? `Увеличивает защиту на ${def.current}, шанс критического удара на ${chanceCritDamage.current}% и шанс уклонения на ${chanceEvade.current}%`
              : "",
            next: def.next
              ? `Увеличивает защиту на ${def.next}, шанс критического удара на ${chanceCritDamage.next}% и шанс уклонения на ${chanceEvade.next}%`
              : "",
          };
        },
        img: "/assets/skill/priest/skillAgility_4_1.png",
        maxPoints: 5,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "agility",
        data: {
          def: [3, 6, 9, 12, 15],
          chanceCritDamage: [1, 2, 3, 4, 5],
          chanceEvade: [1, 2, 3, 4, 5],
        },
        fn(hero) {
          hero.setters.incDef(getValue(this, "def"));
          hero.setters.incChanceCritDamage(getValue(this, "chanceCritDamage"));
          hero.setters.incChanceEvade(getValue(this, "chanceEvade"));
        },
      },
    ],
    level_5: [
      {
        name: "Форма ангела",
        descr: function () {
          const modifier = getText.call(this, "modifier");
          const duration = getText.call(this, "duration");
          return {
            current: modifier.current
              ? `"Молитва" действует на ${duration.current} секунду дольше, также во время действия увеличивает наносимый урон героя и скорость атаки на ${modifier.current}%`
              : "",
            next: modifier.next
              ? `"Молитва" действует на ${duration.next} секунду дольше, также во время действия увеличивает наносимый урон героя и скорость атаки на ${modifier.next}%`
              : "",
          };
        },
        img: "/assets/skill/priest/skillAgility_5_1.png",
        maxPoints: 2,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "agility",
        data: {
          modifier: [18, 25],
          duration: [1, 1],
        },
        fn(hero) {
          SKILLS_PRIEST[0].data.duration += getValue(this, "duration");
          SKILLS_PRIEST[0].data.agility_5_1.isOpen = true;
          SKILLS_PRIEST[0].data.agility_5_1.modifier += getValue(this, "modifier");
        },
      },
    ],
  },
  intellect: {
    totalPoint: 0,
    openLevels: ["level_1"],
    level_1: [
      {
        name: "Защитная мантия",
        descr: function () {
          const intellect = getText.call(this, "intellect");
          const def = getText.call(this, "def");
          const magicDef = getText.call(this, "magicDef");
          return {
            current: intellect.current
              ? `Увеличивает интеллект на ${intellect.current}, защиту на ${def.current} и магическую защиту на ${magicDef.current}`
              : "",
            next: intellect.next
              ? `Увеличивает интеллект на ${intellect.next}, защиту на ${def.next} и магическую защиту на ${magicDef.next}`
              : "",
          };
        },
        img: "/assets/skill/priest/skillIntellect_1_1.png",
        maxPoints: 5,
        currentPoint: 0,
        inc: incPoint,
        open: true,
        branch: "intellect",
        data: {
          intellect: [3, 6, 9, 12, 15],
          def: [2, 4, 6, 8, 10],
          magicDef: [2, 4, 6, 8, 10],
        },
        fn(hero) {
          hero.setters.incIntellect(getValue(this, "intellect"));
          hero.setters.incDef(getValue(this, "def"));
          hero.setters.incMagicDef(getValue(this, "magicDef"));
        },
      },
    ],
    level_2: [
      {
        name: "Сильная аура",
        descr: function () {
          const value = getText.call(this, "value");
          const decAttack = getText.call(this, "decAttack");
          return {
            current: value.current
              ? `Уменьшает атаку на ${-decAttack.current}, но "Искра света" наносит на ${
                  value.current
                } больше урона`
              : "",
            next: value.next
              ? `Уменьшает атаку на ${-decAttack.next}, но "Искра света" наносит на ${value.next} больше урона`
              : "",
          };
        },
        img: "/assets/skill/priest/skillIntellect_3_2.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "intellect",
        data: {
          value: [6, 12, 18],
          decAttack: [-6, -12, -18],
        },
        fn(hero) {
          hero.setters.incAttack(getValue(this, "decAttack"));
          SKILLS_PRIEST[1].data.value += getValue(this);
        },
      },
      {
        name: "Печать правосудия",
        descr: function () {
          const heal = getText.call(this, "heal");
          return {
            current: heal.current
              ? `Каждый раз когда противник получает метку от "Взор правосудия", герой восстанавливает себе ${heal.current} здоровья`
              : "",
            next: heal.next
              ? `Каждый раз когда противник получает метку от "Взор правосудия", герой восстанавливает себе ${heal.next} здоровья`
              : "",
          };
        },
        img: "/assets/skill/priest/skillIntellect_2_2.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "intellect",
        data: {
          heal: [30, 45, 60],
        },
        fn(hero) {
          SKILLS_PRIEST[2].data.intellect_2_2.isOpen = true;
          SKILLS_PRIEST[2].data.intellect_2_2.heal += getValue(this, "heal");
        },
      },
      {
        name: "Темный источник",
        descr: function () {
          const value = getText.call(this, "value");
          return {
            current: value.current
              ? `Количество меток для нанесения урона от "Взор правосудия" уменьшается на ${value.current}`
              : "",
            next: value.next
              ? `Количество меток для нанесения урона от "Взор правосудия" уменьшается на ${value.next}`
              : "",
          };
        },
        img: "/assets/skill/priest/skillIntellect_2_3.png",
        maxPoints: 1,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "intellect",
        data: {
          value: [1],
        },
        fn(hero) {
          SKILLS_PRIEST[2].data.maxMark -= getValue(this, "value");
        },
      },
    ],
    level_3: [
      {
        name: "Присутствие бездны",
        descr: function () {
          const text = getText.call(this, "text");
          return {
            current: text.current ? `"Искра света" - тип урона меняется на чистый урон` : "",
            next: text.next ? `"Искра света" - тип урона меняется на чистый урон` : "",
          };
        },
        img: "/assets/skill/priest/skillIntellect_3_1.png",
        maxPoints: 1,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "intellect",
        data: {
          text: ["чистого"],
        },
        fn() {
          SKILLS_PRIEST[1].data.intellect_3_1.isOpen = true;
          SKILLS_PRIEST[1].data.typeDmg = "чистого";
        },
      },
      {
        name: "Божественный заслон",
        descr: function () {
          const modifierDef = getText.call(this, "modifierDef");
          const energyCost = getText.call(this, "energyCost");
          return {
            current: modifierDef.current
              ? `"Молитва" требует на ${energyCost.current} энергии меньше, так же во время ее действия снижает получаемый урон по герою на ${modifierDef.current}%`
              : "",
            next: modifierDef.next
              ? `"Молитва" требует на ${energyCost.next} энергии меньше, так же во время ее действия снижает получаемый урон по герою на ${modifierDef.next}%`
              : "",
          };
        },
        img: "/assets/skill/priest/skillIntellect_2_1.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "intellect",
        data: {
          modifierDef: [30, 40, 50],
          energyCost: [6, 8, 10],
        },
        fn(hero) {
          SKILLS_PRIEST[0].data.costEnergy -= getValue(this, "energyCost");
          SKILLS_PRIEST[0].data.intellect_2_1.isOpen = true;
          SKILLS_PRIEST[0].data.intellect_2_1.modifierDef += getValue(this, "modifierDef");
        },
      },

      {
        name: "Взгляд в душу",
        descr: function () {
          const modifierIntellect = getText.call(this, "modifierIntellect");
          return {
            current: modifierIntellect.current
              ? `"Взор правосудия" дополнительно наносит ${modifierIntellect.current}% урона от интеллекта и восстанавливает столько же здоровья`
              : "",
            next: modifierIntellect.next
              ? `"Взор правосудия" дополнительно наносит ${modifierIntellect.next}% урона от интеллекта и восстанавливает столько же здоровья`
              : "",
          };
        },
        img: "/assets/skill/priest/skillIntellect_3_3.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "intellect",
        data: {
          modifierIntellect: [70, 90, 110],
        },
        fn() {
          SKILLS_PRIEST[2].data.intellect_3_3.isOpen = true;
          SKILLS_PRIEST[2].data.intellect_3_3.modifierIntellect += getValue(this, "modifierIntellect") / 100;
        },
      },
    ],
    level_4: [
      {
        name: "Темная энергия",
        descr: function () {
          const chance = getText.call(this, "chance");
          const energy = getText.call(this, "energy");
          const duration = getText.call(this, "duration");
          return {
            current: chance.current
              ? `При атаке есть ${chance.current}% шанс восстановить ${energy.current} энергии и наложить на противника 1 слой "Темное проклятие" на ${duration.current} секунд. (Каждый слой снижает получаемое исцеление на 20%)`
              : "",
            next: chance.next
              ? `При атаке есть ${chance.next}% шанс восстановить ${energy.next} энергии и наложить на противника 1 слой "Темное проклятие" на ${duration.next} секунд. (Каждый слой снижает получаемое исцеление на 20%)`
              : "",
          };
        },
        img: "/assets/skill/priest/skillIntellect_4_1.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "intellect",
        data: {
          chance: [15, 18, 21],
          energy: [7, 9, 11],
          duration: [7, 9, 11],
        },
        fn() {
          if (this.currentPoint === 1) {
            registerSkill(skill.bind(this), "afterInitiatorAttack");

            function skill(this: UpSkill, hero: IHero, target: IEnemy) {
              const chance = getRandom(1, 100);
              if (chance <= getValue(this, "chance", true)) {
                hero.pushSkillText(this.name);
                hero.energy.value += getValue(this, "energy", true);
                goDarkCurse(target, 1, getValue(this, "duration", true));
              }
            }
          }
        },
      },
    ],
    level_5: [
      {
        name: "Сделка с дьяволом",
        descr: function () {
          const sacrifice = getText.call(this, "sacrifice");
          const modifier = getText.call(this, "modifier");
          const duration = getText.call(this, "duration");

          return {
            current: sacrifice.current
              ? `В начале боя герой жертвует ${
                  sacrifice.current
                } здоровья и увеличивает получаемой урон противника на ${-modifier.current}% на ${
                  duration.current
                } секунд`
              : "",
            next: sacrifice.next
              ? `В начале боя герой жертвует ${
                  sacrifice.next
                } здоровья и увеличивает получаемой урон противника на ${-modifier.next}% на ${
                  duration.next
                } секунд`
              : "",
          };
        },
        img: "/assets/skill/priest/skillIntellect_5_1.png",
        maxPoints: 3,
        currentPoint: 0,
        inc: incPoint,
        open: false,
        branch: "intellect",
        data: {
          sacrifice: [250, 300, 350],
          modifier: [-20, -25, -30],
          duration: [8, 10, 12],
        },
        fn(hero) {
          if (this.currentPoint === 1) {
            registerSkill(skill.bind(this), "inBeginFight");

            function skill(this: UpSkill, hero: IHero, target: IEnemy) {
              hero.pushSkillText(this.name);

              goDamage(target, hero, { type: "sacrifice", value: getValue(this, "sacrifice", true) });
              target.buffs.incDef(getValue(this, "modifier", true), getValue(this, "duration", true));
            }
          }
        },
      },
    ],
  },
};
