import { bagItemType } from "@/types/shop.types";
import styles from "./styles.module.css";
import { Tooltip } from "react-tooltip";
// import Tooltip from "@/components/UI/Tooltip/Tooltip";
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
    <>
      <div
        data-tooltip-id={`bag-${item.name}`}
        onDoubleClick={(e) => onClick(e)}
        onContextMenu={(e) => onClick(e)}
        className={styles.bagItem}
      >
        {!item.empty && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <span>{item.quantity}</span>
              <img src={item.img} alt={item.name} />
            </motion.div>
            <Tooltip
              style={{ fontSize: "1rem", maxWidth: "320px" }}
              z-index={1000}
              place="top-end"
              id={`bag-${item.name}`}
            >
              <p style={{ fontWeight: 700, marginBottom: 4 }}>
                {item.name} ({item.quantity})
              </p>
              <p>{item.descr()}</p>
            </Tooltip>
          </>
        )}
      </div>
    </>
  );
};

export default HeroBagItem;
