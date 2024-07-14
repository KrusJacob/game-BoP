import { IHero } from "@/types/hero.types";
import BarrierBar from "./BarrierBar";
import HPBar from "./HPBar";
import styles from "./styles.module.css";
import cn from "classnames";

interface Props {
  isEnemy?: boolean;
  target: IHero;
}

const HeroBar = ({ isEnemy, target }: Props) => {
  return (
    <div
      className={cn(styles.fullBar, {
        [styles.enemy]: isEnemy,
      })}
    >
      <HPBar target={target} />
      {target.barrier > 0 && <BarrierBar target={target} />}
    </div>
  );
};

export default HeroBar;
