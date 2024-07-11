import { heroBaseStats } from "../types/hero.types";

const ALL_HEROES = ["boxer", "programmer", "cook", "hairdresser"] as const;

const STATS_BOXER: heroBaseStats = {
  img: "/src/assets/hero/boxer.jfif",
  name: "Боксер",
  power: 70,
  agility: 45,
  intellect: 15,
  attack: 140,
  def: 13,
  maxHp: 1200,
  attackSpeed: 1.1,
};
const STATS_PROGRAMMER: heroBaseStats = {
  img: "/src/assets/hero/programmist.jfif",
  name: "Программист",
  power: 20,
  agility: 40,
  intellect: 90,
  attack: 100,
  def: 8,
  maxHp: 1000,
  attackSpeed: 1,
};
const STATS_COOK: heroBaseStats = {
  img: "/src/assets/hero/cook.jfif",
  name: "Повар",
  power: 50,
  agility: 50,
  intellect: 50,
  attack: 110,
  def: 18,
  maxHp: 1400,
  attackSpeed: 0.8,
};
const STATS_HAIRDRESSER: heroBaseStats = {
  img: "/src/assets/hero/hairdresser.jfif",
  name: "Парикмахер",
  power: 30,
  agility: 80,
  intellect: 30,
  attack: 100,
  def: 6,
  maxHp: 1100,
  attackSpeed: 1.35,
};

export { ALL_HEROES, STATS_PROGRAMMER, STATS_COOK, STATS_BOXER, STATS_HAIRDRESSER };
