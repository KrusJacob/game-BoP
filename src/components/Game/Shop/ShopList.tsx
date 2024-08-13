import { shopItemType } from "@/types/shop.types";
import ShopItem from "./ShopItem";
import styles from "./styles.module.css";
import { ALL_SHOP_ITEMS } from "@/constants/shop";
import { memo } from "react";

const ShopList = memo(({ onSelectItem }: { onSelectItem: (item: shopItemType) => void }) => {
  console.log("list");
  return (
    <div className={styles.shopList}>
      {ALL_SHOP_ITEMS.map((item) => (
        <ShopItem onClick={onSelectItem} key={item.name} item={item} />
      ))}
    </div>
  );
});

export default ShopList;
