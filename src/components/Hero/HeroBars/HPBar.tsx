import { useEffect, useRef } from "react";
import TextBar from "./TextBar";
import styles from "./styles.module.css";
import { IHero } from "@/types/hero.types";
import { useGameStore } from "@/store/gameStore";
import { calcWidthBar } from "@/utils/calcWidthBar";

const HPBar = ({ target }: { target: IHero }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      calcWidthBar(ref.current, target.baseStats.maxHp, target.HP);
    }
  }, [target]);

  return (
    <div ref={ref} className={styles.HPBar}>
      <TextBar hp={target.HP} />
    </div>
  );
};

export default HPBar;
