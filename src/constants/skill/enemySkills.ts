import { enemySkills } from "@/types/enemy.types";
import { CHANCE_CRITICAL_DAMAGE, CHANCE_EVADE } from "../setup";

export const SKILLS_ROGUE: enemySkills[] = [
  {
    label: "",
    descr: function () {
      return `Описание способности! В разработке...`;
    },
    img: "/src/assets/skill/lock.png",
    data: {},
  },
  {
    label: "",
    descr: function () {
      return `Описание способности. В разработке...`;
    },
    img: "/src/assets/skill/lock.png",
    data: {},
  },
  {
    label: "",
    descr: function () {
      return `Описание способности. В разработке...`;
    },
    img: "/src/assets/skill/lock.png",
    data: {},
  },
  {
    label: "Техника боя",
    descr: function () {
      return `Шанс критического удара: ${this.data?.chanceCritDamage}%, Шанс уклонения: ${this.data?.chanceEvade}% `;
    },
    img: "/src/assets/skill/chances.png",
    data: {
      chanceCritDamage: CHANCE_CRITICAL_DAMAGE,
      chanceEvade: CHANCE_EVADE,
    },
  },
];

export const SKILLS_BEAST: enemySkills[] = [
  {
    label: "",
    descr: function () {
      return `Описание способности. В разработке...`;
    },
    img: "/src/assets/skill/lock.png",
    data: {},
  },
  {
    label: "",
    descr: function () {
      return `Описание способности. В разработке...`;
    },
    img: "/src/assets/skill/lock.png",
    data: {},
  },
  {
    label: "",
    descr: function () {
      return `Описание способности. В разработке...`;
    },
    img: "/src/assets/skill/lock.png",
    data: {},
  },
  {
    label: "Техника боя",
    descr: function () {
      return `Шанс критического удара: ${this.data?.chanceCritDamage}%, Шанс уклонения: ${this.data?.chanceEvade}% `;
    },
    img: "/src/assets/skill/chances.png",
    data: {
      chanceCritDamage: CHANCE_CRITICAL_DAMAGE,
      chanceEvade: CHANCE_EVADE,
    },
  },
];

export const SKILLS_GNOME: enemySkills[] = [
  {
    label: "",
    descr: function () {
      return `Описание способности. В разработке...`;
    },
    img: "/src/assets/skill/lock.png",
    data: {},
  },
  {
    label: "",
    descr: function () {
      return `Описание способности. В разработке...`;
    },
    img: "/src/assets/skill/lock.png",
    data: {},
  },
  {
    label: "",
    descr: function () {
      return `Описание способности. В разработке...`;
    },
    img: "/src/assets/skill/lock.png",
    data: {},
  },
  {
    label: "Техника боя",
    descr: function () {
      return `Шанс критического удара: ${this.data?.chanceCritDamage}%, Шанс уклонения: ${this.data?.chanceEvade}% `;
    },
    img: "/src/assets/skill/chances.png",
    data: {
      chanceCritDamage: CHANCE_CRITICAL_DAMAGE + 1,
      chanceEvade: CHANCE_EVADE + 1,
    },
  },
];

export const SKILLS_GOBLIN: enemySkills[] = [
  {
    label: "",
    descr: function () {
      return `Описание способности. В разработке...`;
    },
    img: "/src/assets/skill/lock.png",
    data: {},
  },
  {
    label: "",
    descr: function () {
      return `Описание способности. В разработке...`;
    },
    img: "/src/assets/skill/lock.png",
    data: {},
  },
  {
    label: "",
    descr: function () {
      return `Описание способности. В разработке...`;
    },
    img: "/src/assets/skill/lock.png",
    data: {},
  },
  {
    label: "",
    descr: function () {
      return `Шанс критического удара: ${this.data?.chanceCritDamage}%, Шанс уклонения: ${this.data?.chanceEvade}% `;
    },
    img: "/src/assets/skill/chances.png",
    data: {
      chanceCritDamage: CHANCE_CRITICAL_DAMAGE + 1,
      chanceEvade: CHANCE_EVADE + 1,
    },
  },
];
export const SKILLS_NAGA: enemySkills[] = [
  {
    label: "",
    descr: function () {
      return `Описание способности. В разработке...`;
    },
    img: "/src/assets/skill/lock.png",
    data: {},
  },
  {
    label: "",
    descr: function () {
      return `Описание способности. В разработке...`;
    },
    img: "/src/assets/skill/lock.png",
    data: {},
  },
  {
    label: "",
    descr: function () {
      return `Описание способности. В разработке...`;
    },
    img: "/src/assets/skill/lock.png",
    data: {},
  },
  {
    label: "",
    descr: function () {
      return `Шанс критического удара: ${this.data?.chanceCritDamage}%, Шанс уклонения: ${this.data?.chanceEvade}% `;
    },
    img: "/src/assets/skill/chances.png",
    data: {
      chanceCritDamage: CHANCE_CRITICAL_DAMAGE + 2,
      chanceEvade: CHANCE_EVADE + 2,
    },
  },
];
export const SKILLS_SEA_MONSTER: enemySkills[] = [
  {
    label: "",
    descr: function () {
      return `Описание способности. В разработке...`;
    },
    img: "/src/assets/skill/lock.png",
    data: {},
  },
  {
    label: "",
    descr: function () {
      return `Описание способности. В разработке...`;
    },
    img: "/src/assets/skill/lock.png",
    data: {},
  },
  {
    label: "",
    descr: function () {
      return `Описание способности. В разработке...`;
    },
    img: "/src/assets/skill/lock.png",
    data: {},
  },
  {
    label: "",
    descr: function () {
      return `Шанс критического удара: ${this.data?.chanceCritDamage}%, Шанс уклонения: ${this.data?.chanceEvade}% `;
    },
    img: "/src/assets/skill/chances.png",
    data: {
      chanceCritDamage: CHANCE_CRITICAL_DAMAGE,
      chanceEvade: CHANCE_EVADE,
    },
  },
];
export const SKILLS_GOLDEN_PIG: enemySkills[] = [
  {
    label: "Полностью из золота?",
    descr: function () {
      return `Поговаривают что она вся состоит из чистого золота...`;
    },
    img: "/src/assets/skill/enemies/golden-pig_1.png",
    data: {},
  },
  {
    label: "",
    descr: function () {
      return `Описание способности. В разработке...`;
    },
    img: "/src/assets/skill/lock.png",
    data: {},
  },
  {
    label: "",
    descr: function () {
      return `Описание способности. В разработке...`;
    },
    img: "/src/assets/skill/lock.png",
    data: {},
  },
  {
    label: "",
    descr: function () {
      return `Шанс критического удара: ${this.data?.chanceCritDamage}%, Шанс уклонения: ${this.data?.chanceEvade}% `;
    },
    img: "/src/assets/skill/chances.png",
    data: {
      chanceCritDamage: 0,
      chanceEvade: 0,
    },
  },
];
export const SKILLS_GNOME_TRADER: enemySkills[] = [
  {
    label: "Добрая душа",
    descr: function () {
      return `Добрый гном-торговец готов поделится с вами частью своего богатства`;
    },
    img: "/src/assets/skill/enemies/gnome-trader_1.png",
    data: {},
  },
  {
    label: "",
    descr: function () {
      return `Описание способности. В разработке...`;
    },
    img: "/src/assets/skill/lock.png",
    data: {},
  },
  {
    label: "",
    descr: function () {
      return `Описание способности. В разработке...`;
    },
    img: "/src/assets/skill/lock.png",
    data: {},
  },
  {
    label: "",
    descr: function () {
      return `Шанс критического удара: ${this.data?.chanceCritDamage}%, Шанс уклонения: ${this.data?.chanceEvade}% `;
    },
    img: "/src/assets/skill/chances.png",
    data: {
      chanceCritDamage: 0,
      chanceEvade: 0,
    },
  },
];
