import { useEffect, useRef } from "react";
import TextBar from "./TextBar";
import styles from "./styles.module.css";
import { IHero } from "@/types/hero.types";

const HPBar = ({ target }: { target: IHero }) => {
  const ref = useRef<HTMLDivElement>(null);

  const calcHP = (bar: HTMLDivElement, target: IHero) => {
    // @ts-ignore
    const factor = bar.parentNode!.clientWidth / target.baseStats.maxHp;
    const res = factor * target.HP;
    bar.style.width = `${res}px`;
  };

  useEffect(() => {
    if (ref.current) {
      calcHP(ref.current, target);
    }
  }, []);

  return (
    <div ref={ref} className={styles.HPBar}>
      <TextBar hp={target.HP} />
    </div>
  );
};

export default HPBar;
