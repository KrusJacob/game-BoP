import { FaRegSnowflake, FaSkull } from "react-icons/fa";
import { PiSpiralLight } from "react-icons/pi";
import styles from "./hero.module.css";
import { IHero } from "@/types/hero.types";
import { useGameStore } from "@/store/gameStore";
import Tooltip from "@/components/UI/Tooltip/Tooltip";

const HeroStatusBar = ({ type }: { type: "hero" | "enemy" }) => {
  const isStun = useGameStore((state) => state[type]?.status.isStun);
  const isFreeze = useGameStore((state) => state[type]?.status.isFreeze);
  const isPoisoned = useGameStore((state) => state[type]?.status.isPoisoned);
  return (
    <div className={styles.statusBar}>
      {isStun && (
        <Tooltip title="Оглушение" size="small">
          <PiSpiralLight color="gold" />
        </Tooltip>
      )}
      {isFreeze && (
        <Tooltip title="Охлаждение" size="small">
          <FaRegSnowflake color="#93D1DF" />
        </Tooltip>
      )}
      {isPoisoned && (
        <Tooltip title="Отравление" size="small">
          <FaSkull color="green" />
        </Tooltip>
      )}
    </div>
  );
};

export default HeroStatusBar;
