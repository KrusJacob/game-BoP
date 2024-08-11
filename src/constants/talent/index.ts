import { IHero } from "@/types/hero.types";
import { talentType } from "@/types/talent.types";
import { getRandom } from "@/utils/getRandom";

export const ALL_TALENTS: talentType[] = [
  {
    name: "Грозный натиск",
    img: "/src/assets/talent/attack.png",
    level: 0,

    descr: function () {
      const text = getText.call(this);
      return `Увеличивает атаку героя на ${text}`;
    },
    data: {
      value: [0, 14, 25, 36, 47, 58],
    },
    fn(hero: IHero) {
      hero.setters.incAttack(getValue(this));
    },
  },
  {
    name: "Несокрушимость",
    img: "/src/assets/talent/def.png",
    level: 0,

    descr: function () {
      const text = getText.call(this);
      return `Увеличивает защиту героя на ${text}`;
    },
    data: {
      value: [0, 10, 18, 26, 32, 40],
    },
    fn(hero: IHero) {
      hero.setters.incDef(getValue(this));
    },
  },
  {
    name: "Жизненные ресурсы",
    img: "/src/assets/talent/maxHp.png",
    level: 0,

    descr: function () {
      const text = getText.call(this);
      return `Увеличивает максимальный запас героя на ${text}`;
    },
    data: {
      value: [0, 180, 330, 480, 630, 780],
    },
    fn(hero: IHero) {
      hero.setters.incMaxHp(getValue(this));
    },
  },
  {
    name: "Сила гиганта",
    img: "/src/assets/talent/power.png",
    level: 0,

    descr: function () {
      const text = getText.call(this);
      return `Увеличивает силу героя на ${text}`;
    },
    data: {
      value: [0, 14, 25, 36, 47, 58],
    },
    fn(hero: IHero) {
      hero.setters.incPower(getValue(this));
    },
  },
  {
    name: "Проворность",
    img: "/src/assets/talent/agility.png",
    level: 0,

    descr: function () {
      const text = getText.call(this);
      return `Увеличивает ловкость героя на ${text}`;
    },
    data: {
      value: [0, 14, 25, 36, 47, 58],
    },
    fn(hero: IHero) {
      hero.setters.incAgility(getValue(this));
    },
  },
  {
    name: "Концетрация мыслей",
    img: "/src/assets/talent/intellect.png",
    level: 0,

    descr: function () {
      const text = getText.call(this);
      return `Увеличивает интеллект героя на ${text}`;
    },
    data: {
      value: [0, 14, 25, 36, 47, 58],
    },
    fn(hero: IHero) {
      hero.setters.incIntellect(getValue(this));
    },
  },
  {
    name: "Небесный шквал",
    img: "/src/assets/talent/attackSpeed.png",
    level: 0,

    descr: function () {
      const text = getText.call(this);
      return `Увеличивает скорость атаки героя на ${text}`;
    },
    data: {
      value: [0, 0.16, 0.27, 0.38, 0.49, 0.6],
    },
    fn(hero: IHero) {
      hero.setters.incAttackSpeed(getValue(this));
    },
  },
  {
    name: "Наставление магии",
    img: "/src/assets/talent/powerSkill.png",
    level: 0,
    descr: function () {
      const text = getText.call(this);
      return `Увеличивает силу умений героя на ${text}`;
    },
    data: {
      value: [0, 12, 20, 28, 36, 45],
    },
    fn(hero: IHero) {
      hero.setters.incPowerSkill(getValue(this));
    },
  },
  {
    name: "Изворотливость",
    img: "/src/assets/talent/chanceEvade.png",
    level: 0,
    descr: function () {
      const text = getText.call(this);
      return `Увеличивает шанс уклонения героя на ${text}`;
    },
    data: {
      value: [0, 4, 6, 8, 10, 12],
    },
    fn(hero: IHero) {
      hero.setters.incChanceEvade(getValue(this));
    },
  },
  {
    name: "Смертельные выпады",
    img: "/src/assets/talent/chanceCritDamage.png",
    level: 0,
    descr: function () {
      const text = getText.call(this);
      return `Увеличивает шанс критического удара героя на ${text}`;
    },
    data: {
      value: [0, 4, 6, 8, 10, 12],
    },
    fn(hero: IHero) {
      hero.setters.incChanceCritDamage(getValue(this));
    },
  },
  {
    name: "Разлом обороны",
    img: "/src/assets/talent/ignoreDef.png",
    level: 0,
    descr: function () {
      const text = getText.call(this);
      return `Ваши атаки игнорируют ${text}% защиты противника`;
    },
    data: {
      value: [0, 14, 25, 33, 41, 50],
    },
    fn(hero: IHero) {
      hero.setters.incIgnoreDef(getValue(this));
    },
  },
];

function getText(this: talentType) {
  return this.data.value[this.level];
}
function getValue(talent: talentType) {
  return talent.data.value[talent.level] - talent.data.value[talent.level - 1];
}

export function getTalent(hero: IHero) {
  const arrTalents = ALL_TALENTS.filter((item) => item.level !== 5);
  const indexTalent = getRandom(0, arrTalents.length - 1);
  const nameTalent = arrTalents[indexTalent].name;
  const findedTalent = ALL_TALENTS.find((item) => item.name === nameTalent);
  if (findedTalent) {
    findedTalent.level += 1;
    findedTalent.fn(hero);
  }

  console.log(arrTalents[indexTalent].name);
}
