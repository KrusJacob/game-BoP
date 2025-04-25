import { bagItemType } from "@/types/shop.types";

export const EMPTY_BAG_SLOT: bagItemType = {
  id: 0,
  bagSlotId: 0,
  name: "",
  empty: true,
  img: "",
  cost: 0,
  data: {},
  descr: () => "",
  quantity: 0,
  fn: () => {},
  isActiveBag: false,
};

export const ALL_BAG_ITEMS: Array<bagItemType> = Array(16)
  .fill(EMPTY_BAG_SLOT)
  .map((item, i) => ({ ...item, bagSlotId: i }));

export const ACTIVE_BAG_PANEL: Array<bagItemType> = Array(3)
  .fill(EMPTY_BAG_SLOT)
  .map((item, i) => ({ ...item, bagSlotId: i }));
