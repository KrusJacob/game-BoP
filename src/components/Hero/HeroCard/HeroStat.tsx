import React, { ReactNode } from "react";
import { IconType } from "react-icons";
import styles from "./hero.module.css";

interface Props {
  Icon: IconType;
  children: ReactNode;
  value: number;
}

const HeroStat = ({ Icon, children, value }: Props) => {
  return (
    <p className={styles.stats}>
      <Icon />
      <span>{children}:</span>
      {value}
    </p>
  );
};

export default HeroStat;
