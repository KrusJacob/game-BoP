import { useGameStore } from "@/store/gameStore";

import ShopList from "./ShopList";
import styles from "./styles.module.css";
import img from "@assets/bg_shop.jpg";
import { heroResources } from "@/types/hero.types";
import { useState } from "react";
import { motion } from "framer-motion";
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
import ShopSelectItem from "./ShopSelectItem";
import { shopItemType } from "@/types/shop.types";
import { byeShopItem } from "@/constants/shop";
import ShopHeader from "./ShopHeader";
import Tooltip from "@/components/UI/Tooltip/Tooltip";
import React from "react";
import HeroBagItem from "@/components/Hero/HeroBag/HeroBagItem";

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

  console.log("ShopField");

  return (
    <div className={styles.shopField}>
      <img className={styles.bg} src={img} alt={img} />
      <ShopHeader />
      <div className={styles.shopWrapper}>
        <ShopList onSelectItem={onSelectItem} />
        <ShopSelectItem item={selectItem} onByeItem={onByeItem} />
      </div>
      {heroResources && <BagOfHero resources={heroResources} />}
    </div>
  );
};

const BagOfHero = ({ resources }: { resources: heroResources }) => {
  const [isOpen, setOpen] = useState(false);
  const bagHero = useGameStore((state) => state.hero?.resources.bag);

  console.log(resources, "bag");

  if (!bagHero) {
    return null;
  }

  return (
    <motion.div
      exit={{ bottom: "-30%" }}
      initial={{ bottom: "-30%" }}
      animate={{ bottom: isOpen ? 0 : "-30%" }}
      className={styles.bag}
    >
      <p className={styles.bagAnchor} onClick={() => setOpen(!isOpen)}>
        <MdOutlineKeyboardDoubleArrowUp style={{ transform: isOpen ? "rotate(180deg)" : "none" }} />
        Инвентарь героя
        <MdOutlineKeyboardDoubleArrowUp style={{ transform: isOpen ? "rotate(180deg)" : "none" }} />
      </p>
      <div className={styles.bagList}>
        {bagHero.map((item, i) => (
          <HeroBagItem item={item} key={i} />
        ))}
      </div>
    </motion.div>
  );
};

export default ShopField;
