import BarrierBar from "./BarrierBar";
import HPBar from "./HPBar";
import styles from "./styles.module.css";
import cn from "classnames";

interface Props {
  isEnemy?: boolean;
  hp: number;
  barrier: number;
}

const HeroBar = ({ isEnemy, hp, barrier }: Props) => {
  return (
    <div
      className={cn(styles.fullBar, {
        [styles.enemy]: isEnemy,
      })}
    >
      <HPBar hp={hp} />
      {barrier > 0 && <BarrierBar barrier={barrier} />}
    </div>
  );
};

export default HeroBar;
