import { heroBaseStats } from "@/types/hero.types";

const STATS_BOXER: heroBaseStats = {
  img: "/assets/hero/boxer.png",
  name: "Боксер",
  power: 55,
  agility: 35,
  intellect: 15,
  attack: 125,
  def: 12,
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
  intellect: 50,
  attack: 95,
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
const STATS_PRIEST: heroBaseStats = {
  img: "/assets/hero/priest.png",
  name: "Cвященник",
  power: 40,
  agility: 20,
  intellect: 55,
  attack: 75,
  def: 8,
  magicDef: 10,
  maxHp: 1100,
  attackSpeed: 0.4,
  powerSkill: 0,
};

export { STATS_PROGRAMMER, STATS_COOK, STATS_BOXER, STATS_HAIRDRESSER, STATS_PRIEST };
