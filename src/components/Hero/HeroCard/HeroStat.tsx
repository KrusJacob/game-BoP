import React, { ReactNode } from "react";
import { IconType } from "react-icons";
import styles from "./hero.module.css";
import Tooltip from "@/components/UI/Tooltip/Tooltip";

interface Props {
  Icon: IconType;
  children: ReactNode;
  value: number;
}

const HeroStat = ({ Icon, children, value }: Props) => {
  return (
    <div className={styles.stats}>
      <Icon />
      <span>{children}:</span>
      {value}
    </div>
  );
};

export default HeroStat;
