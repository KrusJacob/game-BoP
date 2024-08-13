import cn from "classnames";
import styles from "./styles.module.css";
import { Dispatch, SetStateAction } from "react";
import { typeStatItem } from "./HeroStatList";

interface Props {
  item: typeStatItem;
  value: number;
  totalPoint: number;
  setTotalPoint: Dispatch<SetStateAction<number>>;
  point: number;
  setPoint: Dispatch<SetStateAction<number>>;
}

const HeroStatItem = ({ item, value, totalPoint, setTotalPoint, point, setPoint }: Props) => {
  const { className, Icon, name } = item;

  const hadlerIncPoint = () => {
    setPoint(point + 1);
    setTotalPoint(totalPoint - 1);
  };
  const hadlerDecPoint = () => {
    setPoint(point - 1);
    setTotalPoint(totalPoint + 1);
  };

  return (
    <div className={cn(styles.statItem, className)}>
      <Icon size={60} />
      <p>{name}</p>
      <div className={styles.statValue}>
        {value}
        {point > 0 && <span> + {point}</span>}
      </div>
      <div>
        <button disabled={point <= 0} onClick={() => hadlerDecPoint()}>
          -
        </button>
        <button disabled={totalPoint <= 0} onClick={() => hadlerIncPoint()}>
          +
        </button>
      </div>
    </div>
  );
};

export default HeroStatItem;
