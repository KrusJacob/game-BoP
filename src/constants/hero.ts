import { heroBaseStats } from "../types/hero.types";

const ALL_HEROES = ["boxer", "programmer", "cook", "hairdresser"] as const;

const STATS_BOXER: heroBaseStats = {
  img: "/src/assets/hero/boxer.png",
  name: "Боксер",
  power: 60,
  agility: 40,
  intellect: 15,
  attack: 135,
  def: 13,
  maxHp: 1000,
  attackSpeed: 0.5,
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
  attack: 115,
  def: 20,
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
  attackSpeed: 0.6,
  powerSkill: 0,
};

export { ALL_HEROES, STATS_PROGRAMMER, STATS_COOK, STATS_BOXER, STATS_HAIRDRESSER };
