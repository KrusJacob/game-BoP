import BarrierBar from "./BarrierBar";
import HPBar from "./HPBar";
import styles from "./styles.module.css";
import cn from "classnames";

interface Props {
  isEnemy?: boolean;
  value: number;
  max: number;
  barrier: number;
}

const HeroBar = ({ isEnemy, value, max, barrier }: Props) => {
  return (
    <div
      className={cn(styles.fullBar, {
        [styles.enemy]: isEnemy,
      })}
    >
      <HPBar value={value} max={max} />
      {barrier > 0 && <BarrierBar barrier={barrier} max={max} />}
    </div>
  );
};

export default HeroBar;
