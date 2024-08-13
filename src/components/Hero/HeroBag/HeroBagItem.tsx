import { bagItemType } from "@/types/shop.types";
import styles from "./styles.module.css";
import Tooltip from "@/components/UI/Tooltip/Tooltip";

const HeroBagItem = ({ item }: { item: bagItemType }) => {
  return (
    <div className={styles.bagItem}>
      {!item.empty && (
        <Tooltip title={`${item.name} (${item.quantity} шт.)`} descr={item.descr()}>
          <span>{item.quantity}</span>
          <img src={item.img} alt={item.name} />
        </Tooltip>
      )}
    </div>
  );
};

export default HeroBagItem;
