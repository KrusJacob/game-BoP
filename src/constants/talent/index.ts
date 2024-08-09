import { IHero } from "@/types/hero.types";
import { talentType } from "@/types/talent.types";
import { getRandom } from "@/utils/getRandom";

export const ALL_TALENTS: talentType[] = [
  {
    name: "Грозный натиск",
    img: "/src/assets/talent/attack.png",
    level: 0,

    descr: function () {
      const text = getTextValue.call(this);
      return `Увеличивает атаку героя на ${text}`;
    },
    data: {
      value: [10, 18, 26, 34, 42],
    },
    fn(hero: IHero) {
      hero.setters.incAttack(this.data.value[this.level - 1]);
    },
  },
  {
    name: "Несокрушимость",
    img: "/src/assets/talent/def.png",
    level: 0,

    descr: function () {
      const text = getTextValue.call(this);
      return `Увеличивает защиту героя на ${text}`;
    },
    data: {
      value: [8, 15, 22, 28, 34],
    },
    fn(hero: IHero) {
      hero.setters.incDef(this.data.value[this.level - 1]);
    },
  },
  {
    name: "Жизненные ресурсы",
    img: "/src/assets/talent/maxHp.png",
    level: 0,

    descr: function () {
      const text = getTextValue.call(this);
      return `Увеличивает максимальный запас героя на ${text}`;
    },
    data: {
      value: [150, 290, 430, 570, 700],
    },
    fn(hero: IHero) {
      hero.setters.incMaxHp(this.data.value[this.level - 1]);
    },
  },
  {
    name: "Сила гиганта",
    img: "/src/assets/talent/power.png",
    level: 0,

    descr: function () {
      const text = getTextValue.call(this);
      return `Увеличивает силу героя на ${text}`;
    },
    data: {
      value: [10, 18, 26, 32, 40],
    },
    fn(hero: IHero) {
      hero.setters.incPower(this.data.value[this.level - 1]);
    },
  },
  {
    name: "Проворность",
    img: "/src/assets/talent/agility.png",
    level: 0,

    descr: function () {
      const text = getTextValue.call(this);
      return `Увеличивает ловкость героя на ${text}`;
    },
    data: {
      value: [10, 18, 26, 32, 40],
    },
    fn(hero: IHero) {
      hero.setters.incAgility(this.data.value[this.level - 1]);
    },
  },
  {
    name: "Концетрация мыслей",
    img: "/src/assets/talent/intellect.png",
    level: 0,

    descr: function () {
      const text = getTextValue.call(this);
      return `Увеличивает интеллект героя на ${text}`;
    },
    data: {
      value: [10, 18, 26, 32, 40],
    },
    fn(hero: IHero) {
      hero.setters.incIntellect(this.data.value[this.level - 1]);
    },
  },
  {
    name: "Небесный шквал",
    img: "/src/assets/talent/attackSpeed.png",
    level: 0,

    descr: function () {
      const text = getTextValue.call(this);
      return `Увеличивает скорость атаки героя на ${text}`;
    },
    data: {
      value: [0.15, 0.24, 0.33, 0.42, 0.51],
    },
    fn(hero: IHero) {
      hero.setters.incAttackSpeed(this.data.value[this.level - 1]);
    },
  },
  {
    name: "Наставление магии",
    img: "/src/assets/talent/powerSkill.png",
    level: 0,
    descr: function () {
      const text = getTextValue.call(this);
      return `Увеличивает силу умений героя на ${text}`;
    },
    data: {
      value: [10, 18, 26, 32, 40],
    },
    fn(hero: IHero) {
      hero.setters.incPowerSkill(this.data.value[this.level - 1]);
    },
  },
  {
    name: "Изворотливость",
    img: "/src/assets/talent/chanceEvade.png",
    level: 0,
    descr: function () {
      const text = getTextValue.call(this);
      return `Увеличивает шанс уклонения героя на ${text}`;
    },
    data: {
      value: [4, 6, 8, 10, 12],
    },
    fn(hero: IHero) {
      hero.setters.incChanceEvade(this.data.value[this.level - 1]);
    },
  },
  {
    name: "Смертельные выпады",
    img: "/src/assets/talent/chanceCritDamage.png",
    level: 0,
    descr: function () {
      const text = getTextValue.call(this);
      return `Увеличивает шанс критического удара героя на ${text}`;
    },
    data: {
      value: [4, 6, 8, 10, 12],
    },
    fn(hero: IHero) {
      hero.setters.incChanceCritDamage(this.data.value[this.level - 1]);
    },
  },
  {
    name: "Разлом обороны",
    img: "/src/assets/talent/ignoreDef.png",
    level: 0,
    descr: function () {
      const text = getTextValue.call(this);
      return `Ваши атаки игнорируют ${text}% защиты противника`;
    },
    data: {
      value: [14, 25, 33, 41, 50],
    },
    fn(hero: IHero) {
      hero.setters.incIgnoreDef(this.data.value[this.level - 1]);
    },
  },
];

function getTextValue(this: talentType) {
  return this.level === 0 ? this.data.value[this.level] : this.data.value[this.level - 1];
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

  //   if (ALL_TALENTS[indexTalent].unlock) {
  //     ALL_TALENTS[indexTalent].level += 1;
  //   } else {
  //     ALL_TALENTS[indexTalent].unlock = true;
  //   }

  console.log(arrTalents[indexTalent].name);
}
