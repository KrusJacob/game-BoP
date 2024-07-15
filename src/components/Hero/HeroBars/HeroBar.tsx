import { IHero } from "@/types/hero.types";
import BarrierBar from "./BarrierBar";
import HPBar from "./HPBar";
import styles from "./styles.module.css";
import cn from "classnames";
import { IEnemy } from "@/types/enemy.types";

interface Props {
  isEnemy?: boolean;
  value: number;
  max: number;
}

const HeroBar = ({ isEnemy, value, max }: Props) => {
  return (
    <div
      className={cn(styles.fullBar, {
        [styles.enemy]: isEnemy,
      })}
    >
      <HPBar value={value} max={max} />
      {/* {target.barrier > 0 && <BarrierBar target={target} />} */}
    </div>
  );
};

export default HeroBar;
