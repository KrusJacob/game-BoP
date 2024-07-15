import { useEffect, useRef } from "react";
import TextBar from "./TextBar";
import styles from "./styles.module.css";
import { IHero } from "@/types/hero.types";
import { useGameStore } from "@/store/gameStore";
import { calcWidthBar } from "@/utils/calcWidthBar";
import { IEnemy } from "@/types/enemy.types";

interface Props {
  value: number;
  max: number;
}

const HPBar = ({ value, max }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      calcWidthBar(ref.current, max, value);
    }
  }, [value]);

  return (
    <div ref={ref} className={styles.HPBar}>
      <TextBar hp={value} />
    </div>
  );
};

export default HPBar;
