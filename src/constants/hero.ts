import { heroBaseStats } from "../types/hero.types";

const ALL_HEROES = ["boxer", "programmer", "cook", "hairdresser"] as const;

const STATS_BOXER: heroBaseStats = {
  img: "/assets/boxer.png",
  name: "Боксер",
  power: 55,
  agility: 35,
  intellect: 15,
  attack: 130,
  def: 11,
  magicDef: 0,
  maxHp: 1000,
  attackSpeed: 0.4,
  powerSkill: 0,
};
const STATS_PROGRAMMER: heroBaseStats = {
  img: "/assets/hero/programmist.png",
  name: "Программист",
  power: 25,
  agility: 25,
  intellect: 65,
  attack: 105,
  def: 10,
  magicDef: 0,
  maxHp: 1000,
  attackSpeed: 0.4,
  powerSkill: 0,
};
const STATS_COOK: heroBaseStats = {
  img: "/assets/hero/cook.png",
  name: "Повар",
  power: 50,
  agility: 20,
  intellect: 55,
  attack: 100,
  def: 14,
  magicDef: 0,
  maxHp: 1150,
  attackSpeed: 0.4,
  powerSkill: 0,
};
const STATS_HAIRDRESSER: heroBaseStats = {
  img: "/assets/hero/hairdresser.png",
  name: "Парикмахер",
  power: 30,
  agility: 65,
  intellect: 30,
  attack: 100,
  def: 9,
  magicDef: 0,
  maxHp: 1050,
  attackSpeed: 0.4,
  powerSkill: 0,
};

export { ALL_HEROES, STATS_PROGRAMMER, STATS_COOK, STATS_BOXER, STATS_HAIRDRESSER };
