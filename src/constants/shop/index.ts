import { IHero } from "@/types/hero.types";
import { shopItemType } from "@/types/shop.types";
import { bagItemType } from "@/types/shop.types";
import { EMPTY_BAG_SLOT } from "../bag";
import { IEnemy } from "@/types/enemy.types";
import { goBleedDmg, goPosionDmg, goFreeze, goStun } from "../func/fight";

export const ALL_SHOP_ITEMS: shopItemType[] = [
  {
    id: 0,
    name: "Пузырек лечебного зелья",
    img: "/src/assets/shop/heal_potion_1.png",
    cost: 200,
    quantity: 1,
    descr: function () {
      const text = this.data.value;
      return `Исцеляет героя на ${text} единиц здоровья`;
    },
    data: {
      value: 300,
    },
    fn: function (this: bagItemType, hero: IHero) {
      hero.getHeal(this.data.value);
      decreaseQuantity(hero.resources, this.bagSlotId);
    },
  },
  {
    id: 1,
    name: "Флакон лечебного зелья",
    img: "/src/assets/shop/heal_potion_2.png",
    cost: 400,
    quantity: 1,
    descr: function () {
      const text = this.data.value;
      return `Исцеляет героя на ${text} единиц здоровья`;
    },
    data: {
      value: 625,
    },
    fn: function (this: bagItemType, hero: IHero) {
      hero.getHeal(this.data.value);
      decreaseQuantity(hero.resources, this.bagSlotId);
    },
  },
  {
    id: 2,
    name: "Бутыль лечебного зелья",
    img: "/src/assets/shop/heal_potion_3.png",
    cost: 800,
    quantity: 1,
    descr: function () {
      const text = this.data.value;
      return `Исцеляет героя на ${text} единиц здоровья`;
    },
    data: {
      value: 1250,
    },
    fn: function (this: bagItemType, hero: IHero) {
      hero.getHeal(this.data.value);
      decreaseQuantity(hero.resources, this.bagSlotId);
    },
  },
  {
    id: 3,
    name: "Кирпич",
    img: "/src/assets/shop/brick.png",
    cost: 575,
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
    id: 3,
    name: "Зелье заморозки",
    img: "/src/assets/shop/freeze_potion.png",
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
    id: 3,
    name: "Зелье c ядом",
    img: "/src/assets/shop/posion_potion.png",
    cost: 340,
    quantity: 1,
    descr: function () {
      const text = this.data.value;
      return `Отравляет врага, нанося ему ${text} урона в секунду в течении ${this.data.duration} cекунд`;
    },
    data: {
      value: 75,
      duration: 8,
    },
    fn: function (this: bagItemType, hero: IHero, enemy: IHero | IEnemy) {
      goPosionDmg(hero, enemy, this.data.value, this.data.duration);
      decreaseQuantity(hero.resources, this.bagSlotId);
    },
  },
  {
    id: 3,
    name: "Зелье ярости",
    img: "/src/assets/shop/rage_potion.png",
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
    id: 3,
    name: "Зелье оглушения",
    img: "/src/assets/shop/stun_potion.png",
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
    id: 3,
    name: "Зелье смерти (!)",
    img: "/src/assets/shop/death_potion.png",
    cost: 9999,
    quantity: 1,
    descr: function () {
      const text = this.data.value;
      return `Никто никогда не осмеливался купить это зелье...`;
    },
    data: {},
    fn: function (this: bagItemType, hero: IHero) {},
  },
];

function decreaseQuantity(resources: IHero["resources"], bagSlotId: number) {
  if (resources.bagActivePanel[bagSlotId].quantity > 1) {
    resources.bagActivePanel[bagSlotId].quantity -= 1;
  } else {
    resources.bagActivePanel[bagSlotId] = EMPTY_BAG_SLOT;
  }
}

export function byeShopItem(resources: IHero["resources"], item: shopItemType) {
  if (resources.gold < item.cost) {
    return false;
  }
  resources.gold -= item.cost;
  const isSuccess = addItemToBag(resources, item);
  return isSuccess;
}

export function addItemToBag(resources: IHero["resources"], item: shopItemType | bagItemType, place = "begin") {
  const bagItem = { ...item, quantity: item.quantity, empty: false, isActiveBag: false };

  for (let i = 0; i < resources.bag.length; i++) {
    let index = place === "begin" ? i : resources.bag.length - i - 1;
    if (resources.bag[index].name === bagItem.name) {
      resources.bag[index].quantity += bagItem.quantity;
      return true;
    }
    if (resources.bag[index].empty) {
      resources.bag[index] = { ...bagItem, bagSlotId: i, isMoved: place === "begin" ? true : false };
      return true;
    }
  }
  return false;
}

export function moveBagItem(resources: IHero["resources"], item: bagItemType) {
  const itemIsActvePanel = item.isActiveBag;
  if (itemIsActvePanel) {
    moveFromActivePanel(resources, item);
  } else {
    moveToActivePanel(resources, item);
  }
}

function moveToActivePanel(resources: IHero["resources"], bagItem: bagItemType) {
  if (!bagItem.isMoved) {
    return;
  }
  const indexSameItem = resources.bagActivePanel.findIndex((item) => item.name === bagItem.name);
  if (indexSameItem >= 0) {
    resources.bagActivePanel[indexSameItem].quantity += bagItem.quantity;
    resources.bag[bagItem.bagSlotId] = EMPTY_BAG_SLOT;
  } else {
    const indexItem = resources.bagActivePanel.findIndex((item) => item.empty);
    if (indexItem >= 0) {
      resources.bagActivePanel[indexItem] = { ...bagItem, isActiveBag: true, bagSlotId: indexItem };
      resources.bag[bagItem.bagSlotId] = EMPTY_BAG_SLOT;
    }
  }
}
function moveFromActivePanel(resources: IHero["resources"], bagItem: bagItemType) {
  const indexItem = resources.bag.findIndex((item) => item.empty);
  if (indexItem >= 0) {
    resources.bag[indexItem] = { ...bagItem, isActiveBag: false, bagSlotId: indexItem };
    resources.bagActivePanel[bagItem.bagSlotId] = EMPTY_BAG_SLOT;
  }
}
