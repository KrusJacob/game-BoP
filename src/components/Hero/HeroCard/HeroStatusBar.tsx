import { FaRegSnowflake, FaSkull } from "react-icons/fa";
import { PiSpiralLight } from "react-icons/pi";
import styles from "./hero.module.css";
import { useGameStore } from "@/store/gameStore";
import Tooltip from "@/components/UI/Tooltip/Tooltip";
import { ImDroplet } from "react-icons/im";
import { IoSkullSharp } from "react-icons/io5";
import { FaHeartCrack } from "react-icons/fa6";

const HeroStatusBar = ({ type }: { type: "hero" | "enemy" }) => {
  const isStun = useGameStore((state) => state[type]?.status.stun.isStun);
  const isFreeze = useGameStore((state) => state[type]?.status.isFreeze);
  const isPoisoned = useGameStore((state) => state[type]?.status.isPoisoned);
  const isBleeded = useGameStore((state) => state[type]?.status.isBleeded);
  const virusStack = useGameStore((state) => state[type]?.status.virus.stack);
  const severeWoundStack = useGameStore((state) => state[type]?.status.severeWound.stack);

  return (
    <div className={styles.statusBar}>
      {isStun && (
        <div className={styles.statusBarItem}>
          <Tooltip title="Оглушение" size="small">
            <PiSpiralLight color="gold" />
          </Tooltip>
        </div>
      )}
      {isFreeze && (
        <div className={styles.statusBarItem}>
          <Tooltip title="Охлаждение" size="small">
            <FaRegSnowflake color="#93D1DF" />
          </Tooltip>
        </div>
      )}
      {isPoisoned && (
        <div className={styles.statusBarItem}>
          <Tooltip title="Отравление" size="small">
            <FaSkull color="green" />
          </Tooltip>
        </div>
      )}
      {isBleeded && (
        <div className={styles.statusBarItem}>
          <Tooltip title="Кровотечение" size="small">
            <ImDroplet color="red" />
          </Tooltip>
        </div>
      )}
      {Boolean(severeWoundStack) && (
        <div className={styles.statusBarItem}>
          <Tooltip title="Тяжелое ранение" size="small">
            <FaHeartCrack color="orange" />
            <span className={styles.stack}>{severeWoundStack}</span>
          </Tooltip>
        </div>
      )}
      {Boolean(virusStack) && (
        <div className={styles.statusBarItem}>
          <Tooltip title="Вирус" size="small">
            <IoSkullSharp color="#BAC6C2" />
            <span className={styles.stack}>{virusStack}</span>
          </Tooltip>
        </div>
      )}
    </div>
  );
};

export default HeroStatusBar;
