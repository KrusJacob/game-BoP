import { talentType } from "@/types/talent.types";
import cn from "classnames";
import styles from "./styles.module.css";
import Tooltip from "@/components/UI/Tooltip/Tooltip";

const TalentItem = ({ item }: { item: talentType }) => {
  return (
    <div
      className={cn(styles.talentItem, {
        [styles.active]: item.level > 0,
        [styles.level_1]: item.level === 1,
        [styles.level_2]: item.level === 2,
        [styles.level_3]: item.level === 3,
        [styles.level_4]: item.level === 4,
        [styles.level_5]: item.level === 5,
      })}
    >
      <Tooltip
        title={`${item.name} ур.${item.level}`}
        descr={item.descr ? item.descr().current : ""}
        descr2={item.descr ? item.descr().next : ""}
      >
        <img src={item.img} alt={item.name} />
      </Tooltip>
    </div>
  );
};

export default TalentItem;
