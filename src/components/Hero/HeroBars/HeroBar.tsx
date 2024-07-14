import HPBar from "./HPBar";
import styles from "./styles.module.css";
import cn from "classnames";

interface Props {
  isEnemy?: boolean;
}

const HeroBar = ({ isEnemy }: Props) => {
  return (
    <div
      className={cn(styles.fullBar, {
        [styles.enemy]: isEnemy,
      })}
    >
      <HPBar />
    </div>
  );
};

export default HeroBar;
