import { useGameStore } from "@/store/gameStore";
import BarrierBar from "./BarrierBar";
import EnergyBar from "./EnergyBar";
import HPBar from "./HPBar";
import styles from "./styles.module.css";
import cn from "classnames";

const EnemyBar = () => {
  const enemyHP = useGameStore((state) => state.enemy?.HP);
  const enemyMaxHP = useGameStore((state) => state.enemy?.getters.getMaxHp());
  const enemyBarrier = useGameStore((state) => state.enemy!.barrier);
  const enemyEnergy = useGameStore((state) => state.enemy?.energy.value);
  const enemyMaxEnergy = useGameStore((state) => state.enemy?.energy.max);

  console.log("render EnemyBar");

  return (
    <div className={styles.enemy}>
      <div className={cn(styles.full_HPBar)}>
        <HPBar value={enemyHP || 0} max={enemyMaxHP || 0} />
        {enemyBarrier > 0 && <BarrierBar barrier={enemyBarrier} max={enemyMaxHP || 0} />}
      </div>
      {/* <EnergyBar value={enemyEnergy || 0} max={enemyMaxEnergy || 0} /> */}
    </div>
  );
};

export default EnemyBar;
