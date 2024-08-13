import Tooltip from "@/components/UI/Tooltip/Tooltip";
import styles from "./styles.module.css";
import { BiSolidCoinStack } from "react-icons/bi";
import { useGameStore } from "@/store/gameStore";
import { useEffect } from "react";

const ShopHeader = () => {
  const goldHero = useGameStore((state) => state.hero?.resources.gold);

  return (
    <div className={styles.header}>
      <span>
        <Tooltip anchor="rigth" size="small" title="Золото">
          <BiSolidCoinStack />
          {goldHero}
        </Tooltip>
      </span>
    </div>
  );
};

export default ShopHeader;
