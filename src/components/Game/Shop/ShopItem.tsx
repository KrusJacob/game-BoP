import cn from "classnames";
import styles from "./styles.module.css";
import Tooltip from "@/components/UI/Tooltip/Tooltip";
import { shopItemType } from "@/types/shop.types";
import { BiSolidCoinStack } from "react-icons/bi";

const ShopItem = ({ item, onClick }: { item: shopItemType; onClick: (item: shopItemType) => void }) => {
  return (
    <div onClick={() => onClick(item)} className={cn(styles.shopItem)}>
      <Tooltip anchor="bot" title={`${item.name}`} descr={item.descr()}>
        <img src={item.img} alt={item.name} />
        <span>
          {item.cost} <BiSolidCoinStack />
        </span>
      </Tooltip>
    </div>
  );
};

export default ShopItem;
