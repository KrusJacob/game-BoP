import { useEffect, useRef } from "react";
import styles from "./styles.module.css";
import { IHero } from "@/types/hero.types";
import { calcWidthBar } from "@/utils/calcWidthBar";
import { IEnemy } from "@/types/enemy.types";

const BarrierBar = ({ barrier, max }: { barrier: number; max: number }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      // calcHP(ref.current, target);
      calcWidthBar(ref.current, max, barrier);
    }
  }, [barrier]);

  return <div ref={ref} className={styles.barrierBar}></div>;
};

export default BarrierBar;
