import { useEffect, useRef } from "react";
import styles from "./styles.module.css";
import { calcWidthBar } from "@/utils/calcWidthBar";

const BarrierBar = ({ barrier, max }: { barrier: number; max: number }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      calcWidthBar(ref.current, max, barrier);
    }
  }, [barrier]);

  return <div ref={ref} className={styles.barrierBar}></div>;
};

export default BarrierBar;
