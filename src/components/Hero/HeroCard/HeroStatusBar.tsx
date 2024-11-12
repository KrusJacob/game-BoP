import { FaRegSnowflake, FaSkull } from "react-icons/fa";
import { PiSpiralLight } from "react-icons/pi";
import styles from "./hero.module.css";
import { IHero } from "@/types/hero.types";
import { useGameStore } from "@/store/gameStore";
import Tooltip from "@/components/UI/Tooltip/Tooltip";
import { ImDroplet } from "react-icons/im";
import { IoSkullSharp } from "react-icons/io5";

const HeroStatusBar = ({ type }: { type: "hero" | "enemy" }) => {
  const isStun = useGameStore((state) => state[type]?.status.stun.isStun);
  const isFreeze = useGameStore((state) => state[type]?.status.isFreeze);
  const isPoisoned = useGameStore((state) => state[type]?.status.isPoisoned);
  const isBleeded = useGameStore((state) => state[type]?.status.isBleeded);
  const virusStack = useGameStore((state) => state[type]?.status.virus.stack);

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
      {isBleeded && (
        <Tooltip title="Кровотечение" size="small">
          <ImDroplet color="red" />
        </Tooltip>
      )}
      {Boolean(virusStack) && (
        <Tooltip title="Вирус" size="small">
          <IoSkullSharp color="#BAC6C2" />
          <span className={styles.stack}>{virusStack}</span>
        </Tooltip>
      )}
    </div>
  );
};

export default HeroStatusBar;
