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
    <li title={title} className={styles.stat}>
      <Icon />
      <span>{children}:</span>
      {value}
    </li>
  );
};

export default HeroStat;
