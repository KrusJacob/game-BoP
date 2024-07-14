import { useEffect, useRef } from "react";
import styles from "./styles.module.css";
import { IHero } from "@/types/hero.types";
import { calcWidthBar } from "@/utils/calcWidthBar";

const BarrierBar = ({ target }: { target: IHero }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      // calcHP(ref.current, target);
      calcWidthBar(ref.current, target.baseStats.maxHp, target.barrier);
    }
  }, [target]);

  return <div ref={ref} className={styles.barrierBar}></div>;
};

export default BarrierBar;
