import { useGameStore } from "@/store/gameStore";
import BarrierBar from "./BarrierBar";
import EnergyBar from "./EnergyBar";
import HPBar from "./HPBar";
import styles from "./styles.module.css";
import cn from "classnames";

interface Props {
  isEnemy?: boolean;
  value: number;
  max: number;
  barrier: number;
}

const HeroBar = () => {
  const heroHP = useGameStore((state) => state.hero?.HP);
  const heroMaxHP = useGameStore((state) => state.hero?.getters.getMaxHp());
  const heroBarrier = useGameStore((state) => state.hero!.barrier);
  const heroEnergy = useGameStore((state) => state.hero?.energy.value);
  const heroMaxEnergy = useGameStore((state) => state.hero?.energy.max);

  console.log("render HeroBar");
  return (
    <div>
      <div className={styles.full_HPBar}>
        <HPBar value={heroHP || 0} max={heroMaxHP || 0} />
        {heroBarrier > 0 && <BarrierBar barrier={heroBarrier} max={heroMaxHP || 0} />}
      </div>
      <EnergyBar />
    </div>
  );
};

export default HeroBar;
