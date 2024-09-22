import cn from "classnames";
import styles from "./styles.module.css";
import { UpSkill } from "@/types/skill.types";

interface Props {
  item: UpSkill;
  onClick: (item: UpSkill) => void;
}

const SkillItem = ({ item, onClick }: Props) => {
  return (
    <div
      onClick={() => onClick(item)}
      className={cn(styles.skillitem, {
        [styles.open]: item.open,
        [styles.full]: item.currentPoint === item.maxPoints,
      })}
    >
      <img src={item.img} alt={item.name} />
      <span>
        {item.currentPoint}/{item.maxPoints}
      </span>
    </div>
  );
};

export default SkillItem;
