import { IHero, TypeSkillTrigger, heroSkills } from "@/types/hero.types";
import { talentType } from "@/types/talent.types";
import { getRandom } from "@/utils/getRandom";
import { IEnemy } from "@/types/enemy.types";
import { getPercent } from "@/utils/getPercent";
import { goStun } from "../func/fight";
import { registerSkill } from "../skill/heroes";

export const ALL_TALENTS: talentType[] = [
  {
    name: "Грозный натиск",
    img: "/assets/talent/attack.png",
    level: 0,

    descr: function () {
      const text = getText.call(this, "value");
      return `Увеличивает атаку героя на ${text}`;
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
      return `Увеличивает защиту героя на ${text}`;
    },
    data: {
      value: [10, 18, 26, 32, 40],
    },
    fn(hero: IHero) {
      hero.setters.incDef(getValue(this));
    },
  },
  {
    name: "Жизненные ресурсы",
    img: "/assets/talent/maxHp.png",
    level: 0,

    descr: function () {
      const text = getText.call(this, "value");
      return `Увеличивает максимальный запас героя на ${text}`;
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
      return `Увеличивает силу героя на ${text}`;
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
      return `Увеличивает ловкость героя на ${text}`;
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
      return `Увеличивает интеллект героя на ${text}`;
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
      return `Увеличивает скорость атаки героя на ${text}`;
    },
    data: {
      value: [0.16, 0.27, 0.38, 0.49, 0.6],
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
      return `Увеличивает силу умений героя на ${text}`;
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
      return `Увеличивает шанс уклонения героя на ${text}%`;
    },
    data: {
      value: [4, 6, 8, 10, 12],
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
      return `Увеличивает шанс критического удара героя на ${text}%`;
    },
    data: {
      value: [4, 6, 8, 10, 12],
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
      return `Ваши атаки игнорируют ${text}% защиты противника`;
    },
    data: {
      value: [14, 25, 33, 41, 50],
    },
    fn(hero: IHero) {
      hero.setters.incIgnoreDef(getValue(this));
    },
  },
  {
    name: "Оглушающие удары",
    img: "/assets/talent/stun.png",
    level: 0,
    descr: function () {
      const chance = getText.call(this, "chance");
      const duration = getText.call(this, "duration");
      return `Ваши атаки c ${chance}% шансом могут оглушить противника на ${duration} секунды`;
    },
    data: {
      chance: [6, 7, 8, 9, 10],
      duration: [2, 2, 2, 2, 2],
    },
    trigger: "afterInitiatorAttack",
    fn(hero: IHero) {
      if (this.level === 1) {
        registerTalent(this, activeTalent, this.trigger!);
        function activeTalent(this: talentType, hero: IHero, target: IHero | IEnemy) {
          const data = this.data;
          const level = this.level;
          const chance = getRandom(1, 100);
          console.log(chance, "chance");
          if (chance <= data.chance[level]) {
            console.log("Оглушен");
            goStun(target, data.duration[level]);
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
      const cooldown = getText.call(this, "cooldown");
      const healValue = getText.call(this, "healValue");
      const healPercent = getText.call(this, "healPercent");
      return `Каждые ${cooldown} секунд в бою, вы воостанавливаете ${healValue} ед. здоровья + ${healPercent}% от максимального запаса здоровья `;
    },
    data: {
      healValue: [40, 55, 70, 85, 100],
      healPercent: [1, 2, 3, 4, 5],
      cooldown: [6, 6, 6, 6, 6],
    },
    trigger: "inBeginFight",
    fn(hero: IHero) {
      if (this.level === 1) {
        registerTalent(this, activeTalent, this.trigger!);
        function activeTalent(this: talentType, hero: IHero, target: IHero | IEnemy) {
          console.log("inBeginFight");
          const data = this.data;
          const level = this.level;
          const timeoutId = setInterval(() => {
            if (!target.status.death && !hero.status.death) {
              const heal = data.healValue[level] + getPercent(hero.getters.getMaxHp(), data.healPercent[level]);
              console.log("heal talent", heal);
              hero.getHeal(heal);
            } else {
              clearInterval(timeoutId);
            }
          }, data.cooldown[level] * 1000);
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
      return `Увеличивает получаемый опыт на ${text}%`;
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
      return `Увеличивает получаемое золото на ${text}%`;
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

function registerTalent(talent: talentType, fn: Function, trigger: keyof TypeSkillTrigger) {
  registerSkill(fn.bind(talent), trigger);
}

function getText(this: talentType, value: string) {
  if (this.level === 0) {
    return this.data[value][this.level];
  }
  return this.data[value][this.level - 1];
}
function getValue(talent: talentType) {
  if (talent.level === 1) {
    return talent.data.value[talent.level - 1];
  }
  return talent.data.value[talent.level - 1] - talent.data.value[talent.level - 2];
}

export function getTalent(hero: IHero): talentType {
  const arrTalents = ALL_TALENTS.filter((item) => item.level !== 5);
  const indexRandomTalent = getRandom(0, arrTalents.length - 1);
  const nameTalent = arrTalents[indexRandomTalent].name;
  const findedTalent = ALL_TALENTS.find((item) => item.name === nameTalent);
  if (findedTalent) {
    findedTalent.level += 1;
    findedTalent.fn(hero);
  }

  return findedTalent as talentType;
}
