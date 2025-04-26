import { IHero } from "@/types/hero.types";
import { shopItemType } from "@/types/shop.types";
import { bagItemType } from "@/types/shop.types";
import { EMPTY_BAG_SLOT } from "../bag/bag";

export function decreaseQuantity(resources: IHero["resources"], bagSlotId: number) {
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
  const isSuccess = addItemToBag(resources, item);
  if (isSuccess) {
    resources.gold -= item.cost;
  }
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
