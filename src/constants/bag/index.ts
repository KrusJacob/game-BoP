import { bagItemType } from "@/types/shop.types";

export const EMPTY_BAG_SLOT: bagItemType = {
  id: 0,
  name: "",
  empty: true,
  img: "",
  cost: 0,
  data: {},
  descr: () => "",
  quantity: 0,
  fn: () => {},
};

export const ALL_BAG_ITEMS: Array<bagItemType> = Array(16)
  .fill(EMPTY_BAG_SLOT)
  .map((item, i) => ({ ...item, id: i }));
