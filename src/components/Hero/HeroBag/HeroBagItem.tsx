import { bagItemType } from "@/types/shop.types";
import styles from "./styles.module.css";
import Tooltip from "@/components/UI/Tooltip/Tooltip";
import { motion } from "framer-motion";

interface Props {
  item: bagItemType;
  onClickItem?: (item: bagItemType) => void;
}
const HeroBagItem = ({ item, onClickItem = () => {} }: Props) => {
  const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    onClickItem(item);
  };

  return (
    <div onDoubleClick={(e) => onClick(e)} onContextMenu={(e) => onClick(e)} className={styles.bagItem}>
      {!item.empty && (
        <Tooltip title={`${item.name} (${item.quantity})`} descr={item.descr()}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <span>{item.quantity}</span>
            <motion.img src={item.img} alt={item.name} />
          </motion.div>
        </Tooltip>
      )}
    </div>
  );
};

export default HeroBagItem;
