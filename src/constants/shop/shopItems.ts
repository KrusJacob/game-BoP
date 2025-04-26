import { IHero } from "@/types/hero.types";
import { shopItemType } from "@/types/shop.types";
import { bagItemType } from "@/types/shop.types";
import { IEnemy } from "@/types/enemy.types";
import { goBleedDmg, goPosionDmg, goFreeze, goStun, goDarkCurse } from "../func/effects";
import { goPureDamage } from "../skill/utils";
import { decreaseQuantity } from "../shop/actions";

export const ALL_SHOP_ITEMS: shopItemType[] = [
  {
    id: 1,
    name: "Пузырек лечебного зелья",
    img: "/assets/shop/heal_potion_1.png",
    cost: 230,
    quantity: 1,
    descr: function () {
      const text = this.data.value;
      return `Исцеляет героя на ${text} единиц здоровья`;
    },
    data: {
      value: 350,
    },
    fn: function (this: bagItemType, hero: IHero) {
      hero.getHeal(this.data.value);
      decreaseQuantity(hero.resources, this.bagSlotId);
    },
  },
  {
    id: 2,
    name: "Флакон лечебного зелья",
    img: "/assets/shop/heal_potion_2.png",
    cost: 460,
    quantity: 1,
    descr: function () {
      const text = this.data.value;
      return `Исцеляет героя на ${text} единиц здоровья`;
    },
    data: {
      value: 725,
    },
    fn: function (this: bagItemType, hero: IHero) {
      hero.getHeal(this.data.value);
      decreaseQuantity(hero.resources, this.bagSlotId);
    },
  },
  {
    id: 3,
    name: "Бутыль лечебного зелья",
    img: "/assets/shop/heal_potion_3.png",
    cost: 900,
    quantity: 1,
    descr: function () {
      const text = this.data.value;
      return `Исцеляет героя на ${text} единиц здоровья`;
    },
    data: {
      value: 1450,
    },
    fn: function (this: bagItemType, hero: IHero) {
      hero.getHeal(this.data.value);
      decreaseQuantity(hero.resources, this.bagSlotId);
    },
  },
  {
    id: 4,
    name: "Кирпич",
    img: "/assets/shop/brick.png",
    cost: 580,
    quantity: 1,
    descr: function () {
      const text = this.data.duration;
      return `Оглушает врага на ${text} секунд`;
    },
    data: {
      duration: 5,
    },
    fn: function (this: bagItemType, hero: IHero, enemy: IHero | IEnemy) {
      goStun(enemy, this.data.duration);
      decreaseQuantity(hero.resources, this.bagSlotId);
    },
  },
  {
    id: 5,
    name: "Зелье заморозки",
    img: "/assets/shop/freeze_potion.png",
    cost: 350,
    quantity: 1,
    descr: function () {
      const text = this.data.value;
      return `Снижает скорость атаки врага на ${text}% на ${this.data.duration} секунд `;
    },
    data: {
      value: 70,
      duration: 5,
    },
    fn: function (this: bagItemType, hero: IHero, enemy: IHero | IEnemy) {
      goFreeze(enemy, this.data.value, this.data.duration);
      decreaseQuantity(hero.resources, this.bagSlotId);
    },
  },
  {
    id: 6,
    name: "Зелье c ядом",
    img: "/assets/shop/posion_potion.png",
    cost: 360,
    quantity: 1,
    descr: function () {
      const text = this.data.value;
      return `Отравляет врага, нанося ему ${text} урона в секунду ядом в течении ${this.data.duration} cекунд`;
    },
    data: {
      value: 90,
      duration: 7,
    },
    fn: function (this: bagItemType, hero: IHero, enemy: IHero | IEnemy) {
      goPosionDmg(hero, enemy, this.data.value, this.data.duration);
      decreaseQuantity(hero.resources, this.bagSlotId);
    },
  },
  {
    id: 7,
    name: "Зелье ярости",
    img: "/assets/shop/rage_potion.png",
    cost: 850,
    quantity: 1,
    descr: function () {
      const text = this.data.value;
      return `Увеличивает урон и скорость атаки героя на ${text}% на ${this.data.duration} секунд`;
    },
    data: {
      value: 40,
      duration: 6,
    },
    fn: function (this: bagItemType, hero: IHero) {
      hero.buffs.incDamage(this.data.value, this.data.duration);
      hero.buffs.incAttackSpeed(this.data.value, this.data.duration);

      decreaseQuantity(hero.resources, this.bagSlotId);
    },
  },
  {
    id: 8,
    name: "Зелье оглушения",
    img: "/assets/shop/stun_potion.png",
    cost: 800,
    quantity: 1,
    descr: function () {
      const text = this.data.duration;
      return `Оглушает врага на ${text} секунд`;
    },
    data: {
      duration: 8,
    },
    fn: function (this: bagItemType, hero: IHero, enemy: IHero | IEnemy) {
      goStun(enemy, this.data.duration);
      decreaseQuantity(hero.resources, this.bagSlotId);
    },
  },
  {
    id: 9,
    name: "Зелье удушения",
    img: "/assets/shop/potion.png",
    cost: 650,
    quantity: 1,
    descr: function () {
      const text = this.data.value;
      return `Отравляет врага, нанося ему ${text} урона в секунду кровотечением в течении ${this.data.duration} cекунд`;
    },
    data: {
      value: 130,
      duration: 10,
    },
    fn: function (this: bagItemType, hero: IHero, enemy: IHero | IEnemy) {
      // goPosionDmg(hero, enemy, this.data.value, this.data.duration);
      goBleedDmg(hero, enemy, this.data.value, this.data.duration);
      decreaseQuantity(hero.resources, this.bagSlotId);
    },
  },
  {
    id: 10,
    name: "Зелье смерти",
    img: "/assets/shop/death_potion.png",
    cost: 950,
    quantity: 1,
    descr: function () {
      const modifierDamage = this.data.modifierDamage;
      return `Наносит врагу ${modifierDamage}% чистого урона от его макс.запаса здоровья и накадывает 4 слоя "Темное проклятие" на ${this.data.duration} секунд. (Каждый слой снижает получаемое исцеление на 20%)`;
    },
    data: {
      modifierDamage: 15,
      stack: 4,
      duration: 15,
    },
    fn: function (this: bagItemType, hero: IHero, enemy: IHero | IEnemy) {
      goPureDamage(hero, enemy, (enemy.getters.getMaxHp() * this.data.modifierDamage) / 100);
      goDarkCurse(enemy, this.data.stack, this.data.duration);
      decreaseQuantity(hero.resources, this.bagSlotId);
    },
  },
];
