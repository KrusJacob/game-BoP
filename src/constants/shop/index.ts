import { IHero } from "@/types/hero.types";
import { shopItemType } from "@/types/shop.types";
import { bagItemType } from "@/types/shop.types";
import { EMPTY_BAG_SLOT } from "../bag";

export const ALL_SHOP_ITEMS: shopItemType[] = [
  {
    id: 0,
    name: "Пузырек лечебного зелья",
    img: "/src/assets/shop/heal_potion_1.png",
    cost: 250,
    descr: function () {
      const text = this.data.value;
      return `Исцеляет героя на ${text} единиц здоровья`;
    },
    data: {
      value: 250,
    },
    fn: function () {},
  },
  {
    id: 1,
    name: "Флакон лечебного зелья",
    img: "/src/assets/shop/heal_potion_2.png",
    cost: 400,

    descr: function () {
      const text = this.data.value;
      return `Исцеляет героя на ${text} единиц здоровья`;
    },
    data: {
      value: 700,
    },
    fn: function () {},
  },
  {
    id: 2,
    name: "Бутыль лечебного зелья",
    img: "/src/assets/shop/heal_potion_3.png",
    cost: 700,

    descr: function () {
      const text = this.data.value;
      return `Исцеляет героя на ${text} единиц здоровья`;
    },
    data: {
      value: 1250,
    },
    fn: function () {},
  },
  {
    id: 3,
    name: "Бутылка зелья",
    img: "/src/assets/shop/heal_potion_2.png",
    cost: 45,

    descr: function () {
      const text = this.data.value;
      return `Исцеляет героя на ${text} единиц здоровья`;
    },
    data: {
      value: 400,
    },
    fn: function (hero: IHero) {
      hero.getHeal(this.data.value);
      const itemIndex = hero.resources.bag.findIndex((item) => item.name === this.name);
      if (itemIndex >= 0) {
        if (hero.resources.bag[itemIndex].quantity > 1) {
          hero.resources.bag[itemIndex].quantity -= 1;
        } else {
          hero.resources.bag[itemIndex] = EMPTY_BAG_SLOT;
        }
      }
    },
  },
  {
    id: 4,
    name: "Бутыль  зелья",
    img: "/src/assets/shop/heal_potion_1.png",
    cost: 20,

    descr: function () {
      const text = this.data.value;
      return `Исцеляет героя на ${text} единиц здоровья`;
    },
    data: {
      value: 200,
    },
    fn: function (hero: IHero) {
      hero.getHeal(this.data.value);
      if (hero.resources.bag[this.id].quantity > 1) {
        hero.resources.bag[this.id].quantity -= 1;
      } else {
        hero.resources.bag[this.id] = EMPTY_BAG_SLOT;
      }
      // const itemIndex = hero.resources.bag[.findIndex((item) => item.name === this.name)];
      // if (itemIndex >= 0) {
      //   if (hero.resources.bag[itemIndex].quantity > 1) {
      //     hero.resources.bag[itemIndex].quantity -= 1;
      //   } else {
      //     hero.resources.bag[itemIndex] = EMPTY_BAG_SLOT;
      //   }
      // }
    },
  },
];

export function byeShopItem(resources: IHero["resources"], item: shopItemType) {
  if (resources.gold < item.cost) {
    console.log("нету монет");
    return false;
  }
  console.log("купилось");
  resources.gold -= item.cost;
  const bagItem = { ...item, quantity: 1, empty: false };

  for (let i = 0; i < resources.bag.length; i++) {
    if (resources.bag[i].name === bagItem.name) {
      resources.bag[i].quantity += 1;
      return true;
    }
    if (resources.bag[i].empty) {
      resources.bag[i] = { ...bagItem, id: i };
      return true;
    }
  }
  return false;
}
