import { bagItemType } from "@/types/shop.types";
import HeroBagItem from "../HeroBag/HeroBagItem";
import styles from "./styles.module.css";
import { useGameStore } from "@/store/gameStore";
import { useState } from "react";

const PanelActiveItems = () => {
  const [usedItem, setIsedItem] = useState(false);
  const hero = useGameStore((state) => state.hero);
  const enemy = useGameStore((state) => state.enemy);

  if (!hero) {
    return null;
  }

  const onUseItem = (item: bagItemType) => {
    if (!item.empty) {
      item.fn(hero, enemy);
      setIsedItem(!usedItem);
    }
  };

  return (
    <div className={styles.heroBag}>
      {hero.resources.bagActivePanel.map((item, i) => {
        return (
          <div key={i} onClick={() => onUseItem(item)}>
            <HeroBagItem item={item} />
          </div>
        );
      })}
    </div>
  );
};

export default PanelActiveItems;
