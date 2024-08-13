import { heroBaseStats } from "../types/hero.types";

const ALL_HEROES = ["boxer", "programmer", "cook", "hairdresser"] as const;

const STATS_BOXER: heroBaseStats = {
  img: "/src/assets/boxer.png",
  name: "Боксер",
  power: 55,
  agility: 40,
  intellect: 15,
  attack: 130,
  def: 12,
  maxHp: 1000,
  attackSpeed: 0.45,
  powerSkill: 0,
};
const STATS_PROGRAMMER: heroBaseStats = {
  img: "/src/assets/hero/programmist.png",
  name: "Программист",
  power: 20,
  agility: 35,
  intellect: 75,
  attack: 100,
  def: 10,
  maxHp: 1000,
  attackSpeed: 0.4,
  powerSkill: 10,
};
const STATS_COOK: heroBaseStats = {
  img: "/src/assets/hero/cook.png",
  name: "Повар",
  power: 50,
  agility: 30,
  intellect: 40,
  attack: 105,
  def: 18,
  maxHp: 1200,
  attackSpeed: 0.3,
  powerSkill: 0,
};
const STATS_HAIRDRESSER: heroBaseStats = {
  img: "/src/assets/hero/hairdresser.png",
  name: "Парикмахер",
  power: 30,
  agility: 70,
  intellect: 25,
  attack: 105,
  def: 9,
  maxHp: 1050,
  attackSpeed: 0.5,
  powerSkill: 0,
};

export { ALL_HEROES, STATS_PROGRAMMER, STATS_COOK, STATS_BOXER, STATS_HAIRDRESSER };
