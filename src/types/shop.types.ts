export interface shopItemType {
  id: number;
  name: string;
  img: string;
  cost: number;
  data: Record<string, any>;
  descr: () => string;
  fn: Function;
}

export interface bagItemType extends shopItemType {
  bagSlotId: number;
  quantity: number;
  empty: boolean;
  isActiveBag: boolean;
}