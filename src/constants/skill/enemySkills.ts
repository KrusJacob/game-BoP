import { enemySkills } from "@/types/enemy.types";
import { CHANCE_CRITICAL_DAMAGE, CHANCE_EVADE } from "../setup";

export const SKILLS_ROGUE: enemySkills[] = [
  {
    label: function () {
      return `Описание способности! В разработке...`;
    },
    img: "/src/assets/skill/lock.png",
    value: {},
  },
  {
    label: function () {
      return `Описание способности. В разработке...`;
    },
    img: "/src/assets/skill/lock.png",
    value: {},
  },
  {
    label: function () {
      return `Описание способности. В разработке...`;
    },
    img: "/src/assets/skill/lock.png",
    value: {},
  },
  {
    label: function () {
      return `Шанс критического удара: ${this.value?.chanceCritDamage}%, Шанс уклонения: ${this.value?.chanceEvade}% `;
    },
    img: "/src/assets/skill/chances.png",
    value: {
      chanceCritDamage: CHANCE_CRITICAL_DAMAGE,
      chanceEvade: CHANCE_EVADE,
    },
  },
];

export const SKILLS_BEAST: enemySkills[] = [
  {
    label: function () {
      return `Описание способности. В разработке...`;
    },
    img: "/src/assets/skill/lock.png",
    value: {},
  },
  {
    label: function () {
      return `Описание способности. В разработке...`;
    },
    img: "/src/assets/skill/lock.png",
    value: {},
  },
  {
    label: function () {
      return `Описание способности. В разработке...`;
    },
    img: "/src/assets/skill/lock.png",
    value: {},
  },
  {
    label: function () {
      return `Шанс критического удара: ${this.value?.chanceCritDamage}%, Шанс уклонения: ${this.value?.chanceEvade}% `;
    },
    img: "/src/assets/skill/chances.png",
    value: {
      chanceCritDamage: CHANCE_CRITICAL_DAMAGE,
      chanceEvade: CHANCE_EVADE,
    },
  },
];

export const SKILLS_GNOME: enemySkills[] = [
  {
    label: function () {
      return `Описание способности. В разработке...`;
    },
    img: "/src/assets/skill/lock.png",
    value: {},
  },
  {
    label: function () {
      return `Описание способности. В разработке...`;
    },
    img: "/src/assets/skill/lock.png",
    value: {},
  },
  {
    label: function () {
      return `Описание способности. В разработке...`;
    },
    img: "/src/assets/skill/lock.png",
    value: {},
  },
  {
    label: function () {
      return `Шанс критического удара: ${this.value?.chanceCritDamage}%, Шанс уклонения: ${this.value?.chanceEvade}% `;
    },
    img: "/src/assets/skill/chances.png",
    value: {
      chanceCritDamage: CHANCE_CRITICAL_DAMAGE,
      chanceEvade: CHANCE_EVADE,
    },
  },
];

export const SKILLS_GOBLIN: enemySkills[] = [
  {
    label: function () {
      return `Описание способности. В разработке...`;
    },
    img: "/src/assets/skill/lock.png",
    value: {},
  },
  {
    label: function () {
      return `Описание способности. В разработке...`;
    },
    img: "/src/assets/skill/lock.png",
    value: {},
  },
  {
    label: function () {
      return `Описание способности. В разработке...`;
    },
    img: "/src/assets/skill/lock.png",
    value: {},
  },
  {
    label: function () {
      return `Шанс критического удара: ${this.value?.chanceCritDamage}%, Шанс уклонения: ${this.value?.chanceEvade}% `;
    },
    img: "/src/assets/skill/chances.png",
    value: {
      chanceCritDamage: CHANCE_CRITICAL_DAMAGE,
      chanceEvade: CHANCE_EVADE,
    },
  },
];
