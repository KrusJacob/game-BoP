import { useGameStore } from "@/store/gameStore";
import { heroResources } from "@/types/hero.types";
import { motion } from "framer-motion";
import { useState } from "react";
import { MdArrowBack, MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
import HeroBagItem from "./HeroBagItem";
import styles from "./styles.module.css";
import { moveBagItem } from "@/constants/shop/actions";
import { bagItemType } from "@/types/shop.types";
import { PiMouseRightClickFill } from "react-icons/pi";

const HeroBagList = ({ resources }: { resources: heroResources }) => {
  const [update, setUpdate] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const bag = useGameStore((state) => state.hero?.resources.bag);
  const bagActivePanel = useGameStore((state) => state.hero?.resources.bagActivePanel);

  const onClickItem = (item: bagItemType) => {
    if (!item.empty) {
      moveBagItem(resources, item);
      setUpdate(!update);
    }
  };

  if (!bag || !bagActivePanel) {
    return null;
  }

  return (
    <motion.div
      exit={{ bottom: "-262px" }}
      initial={{ bottom: "-262px" }}
      animate={{ bottom: isOpen ? 0 : "-262px" }}
      className={styles.bag}
    >
      <p className={styles.bagAnchor} onClick={() => setOpen(!isOpen)}>
        <MdOutlineKeyboardDoubleArrowUp style={{ transform: isOpen ? "rotate(180deg)" : "none" }} />
        Инвентарь героя
        <MdOutlineKeyboardDoubleArrowUp style={{ transform: isOpen ? "rotate(180deg)" : "none" }} />
      </p>
      <div className={styles.bagList}>
        {bagActivePanel.map((item, i) => (
          <HeroBagItem onClickItem={onClickItem} item={item} key={i} />
        ))}
        <p className={styles.info}>
          Кликните на предмет 2 раза или ПКМ <PiMouseRightClickFill />, чтобы перенести его в карман
        </p>
      </div>
      <div className={styles.bagList}>
        {bag.map((item, i) => (
          <HeroBagItem onClickItem={onClickItem} item={item} key={i} />
        ))}
      </div>
    </motion.div>
  );
};

export default HeroBagList;
