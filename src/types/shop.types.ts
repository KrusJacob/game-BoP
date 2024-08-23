export interface shopItemType {
  id: number;
  name: string;
  quantity: number;
  img: string;
  cost: number;
  data: Record<string, any>;
  descr: () => string;
  fn: Function;
}

export interface bagItemType extends shopItemType {
  bagSlotId: number;
  empty: boolean;
  isActiveBag: boolean;
  isMoved: boolean;
}
