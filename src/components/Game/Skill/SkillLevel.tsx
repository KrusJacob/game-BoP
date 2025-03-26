import cn from "classnames";
import styles from "./styles.module.css";
import SkillItem from "./SkillItem";
import { AllSkillLevels, TypeMainStat, UpSkill } from "@/types/skill.types";
import Tooltip from "@/components/UI/Tooltip/Tooltip";
import { BiSolidLockAlt } from "react-icons/bi";
import { useSkillUpgradeStore } from "@/store/skillUpgradeStore";

interface Props {
  tab: TypeMainStat;
  incPoint: (item: UpSkill) => void;
  level: AllSkillLevels;
}

const SkillLevel = ({ tab, incPoint, level }: Props) => {
  const upgradeSkills = useSkillUpgradeStore((state) => state.upgradeSkills);
  return (
    <div
      className={cn(styles.skillLevel, {
        [styles.skillLevelOpen]: upgradeSkills[tab].openLevels.includes(level),
      })}
    >
      {upgradeSkills[tab][level].map((item: UpSkill) => (
        <Tooltip
          key={item.name}
          title={item.name}
          descr={item.descr ? item.descr().current : ""}
          descr2={item.descr ? item.descr().next : ""}
        >
          <SkillItem onClick={incPoint} item={item} />
        </Tooltip>
      ))}
      {!upgradeSkills[tab].openLevels.includes(level) && (
        <span>
          <BiSolidLockAlt /> Вложите больше очков навыков
        </span>
      )}
    </div>
  );
};

export default SkillLevel;
