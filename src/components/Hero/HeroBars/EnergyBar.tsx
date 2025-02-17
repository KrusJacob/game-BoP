import { useGameStore } from "@/store/gameStore";
import styles from "./styles.module.css";
import { useEffect, useRef } from "react";
import { calcWidthBar } from "@/utils/calcWidthBar";
import { TbHexagonLetterE } from "react-icons/tb";
import { heroEnergy } from "@/types/hero.types";

const EnergyBar = () => {
  const enemy = useGameStore((state) => state.enemy);
  const value = useGameStore((state) => state.hero!.energy.value);
  const max = useGameStore((state) => state.hero!.energy.max);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      calcWidthBar(ref.current, max, value);
    }
  }, [value, max]);

  return (
    <div className={styles.energyWrapper}>
      <div className={styles.full_energyBar}>
        <div ref={ref} className={styles.energyBar}></div>
      </div>
      <span>
        {value} / {max}
        <TbHexagonLetterE style={{ marginLeft: 8 }} size={20} />
      </span>
    </div>
  );
};

export default EnergyBar;
