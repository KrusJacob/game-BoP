import { ReactNode } from "react";
import { IconType } from "react-icons";
import styles from "./hero.module.css";
import { useGameStore } from "@/store/gameStore";

interface Props {
  Icon: IconType;
  children: ReactNode;
  value?: number;
  title?: string;
}

const HeroStat = ({ Icon, children, value, title }: Props) => {
  return (
    <div title={title} className={styles.stats}>
      <Icon />
      <span>{children}:</span>
      {value}
    </div>
  );
};

export default HeroStat;
