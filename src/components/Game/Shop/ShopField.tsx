import { useGameStore } from "@/store/gameStore";

import ShopList from "./ShopList";
import styles from "./styles.module.css";
import img from "@assets/bg_shop.jpg";
import { useState } from "react";
import ShopSelectItem from "./ShopSelectItem";
import { shopItemType } from "@/types/shop.types";
import { byeShopItem } from "@/constants/shop/actions";
import ShopHeader from "./ShopHeader";
import HeroBagList from "@/components/Hero/HeroBag/HeroBagList";

const ShopField = () => {
  const [update, setUpdate] = useState(false);
  const heroResources = useGameStore((state) => state.hero?.resources);
  const [selectItem, setSelectItem] = useState<shopItemType>();

  const onSelectItem = (item: shopItemType) => {
    setSelectItem(item !== selectItem ? item : undefined);
  };

  const onByeItem = () => {
    if (heroResources && selectItem) {
      const isSuccess = byeShopItem(heroResources, selectItem);
      if (isSuccess) {
        setUpdate(!update);
      }
    }
  };

  return (
    <div className={styles.shopField}>
      <img className={styles.bg} src={img} alt={img} />
      <ShopHeader />
      <div className={styles.shopWrapper}>
        <ShopList onSelectItem={onSelectItem} />
        <ShopSelectItem item={selectItem} onByeItem={onByeItem} />
      </div>
      {heroResources && <HeroBagList resources={heroResources} />}
    </div>
  );
};

export default ShopField;
