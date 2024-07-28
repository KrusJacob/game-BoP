import { heroBaseStats } from "../types/hero.types";

const ALL_HEROES = ["boxer", "programmer", "cook", "hairdresser"] as const;

const STATS_BOXER: heroBaseStats = {
  img: "/src/assets/hero/boxer.png",
  name: "Боксер",
  power: 70,
  agility: 45,
  intellect: 15,
  attack: 135,
  def: 13,
  maxHp: 1200,
  attackSpeed: 0.9,
};
const STATS_PROGRAMMER: heroBaseStats = {
  img: "/src/assets/hero/programmist.png",
  name: "Программист",
  power: 20,
  agility: 40,
  intellect: 90,
  attack: 100,
  def: 10,
  maxHp: 1000,
  attackSpeed: 0.8,
};
const STATS_COOK: heroBaseStats = {
  img: "/src/assets/hero/cook.png",
  name: "Повар",
  power: 50,
  agility: 50,
  intellect: 50,
  attack: 115,
  def: 22,
  maxHp: 1450,
  attackSpeed: 0.65,
};
const STATS_HAIRDRESSER: heroBaseStats = {
  img: "/src/assets/hero/hairdresser.png",
  name: "Парикмахер",
  power: 30,
  agility: 80,
  intellect: 30,
  attack: 105,
  def: 8,
  maxHp: 1100,
  attackSpeed: 1.15,
};

export { ALL_HEROES, STATS_PROGRAMMER, STATS_COOK, STATS_BOXER, STATS_HAIRDRESSER };
