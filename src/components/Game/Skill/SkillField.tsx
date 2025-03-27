import Tooltip from "@/components/UI/Tooltip/Tooltip";
import styles from "./styles.module.css";
import cn from "classnames";
import { GiFlowerEmblem } from "react-icons/gi";
import { useGameStore } from "@/store/gameStore";
import { useState } from "react";
import SkillLevel from "./SkillLevel";
import { useSkillUpgradeStore } from "@/store/skillUpgradeStore";
import { UpSkill } from "@/types/skill.types";

const arr: Tabs[] = [
  {
    label: "Cила",
    name: "power",
  },
  {
    label: "Ловкость",
    name: "agility",
  },
  {
    label: "Интеллект",
    name: "intellect",
  },
];
type typeTab = "power" | "agility" | "intellect";
interface Tabs {
  name: typeTab;
  label: string;
}

const SkillField = () => {
  const [tab, setTab] = useState<typeTab>("power");
  const hero = useGameStore((state) => state.hero);
  const { upgradeSkills, setUpgradeSkills } = useSkillUpgradeStore((state) => state);

  if (!hero) {
    return null;
  }

  const incPoint = (item: UpSkill) => {
    if (item.open && item.currentPoint < item.maxPoints && hero.resources.skillPoints > 0) {
      item.inc(upgradeSkills);
      item.fn(hero);
      hero.resources.skillPoints -= 1;
      setUpgradeSkills(upgradeSkills);
      hero.update();
    }
  };

  return (
    <div className={styles.skillField}>
      <div className={styles.header}>
        <Tooltip size="small" title="Очки навыков">
          <GiFlowerEmblem /> {hero.resources.skillPoints}
        </Tooltip>
      </div>
      <div className={styles.contol}>
        {arr.map((item) => (
          <button
            className={cn({
              [styles.active]: tab === item.name,
              [styles[item.name]]: true,
            })}
            key={item.name}
            onClick={() => setTab(item.name)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className={styles.skillWrapper}>
        <div className={styles.skillList}>
          <p className={styles.title}>Вложено очков навыков: {upgradeSkills[tab].totalPoint}</p>
          <SkillLevel incPoint={incPoint} tab={tab} level="level_1" />
          <SkillLevel incPoint={incPoint} tab={tab} level="level_2" />
          <SkillLevel incPoint={incPoint} tab={tab} level="level_3" />
          <SkillLevel incPoint={incPoint} tab={tab} level="level_4" />
          <SkillLevel incPoint={incPoint} tab={tab} level="level_5" />
          {/* <div style={{ height: "85px", width: "100%", backgroundColor: "black" }}></div> */}
        </div>
      </div>
    </div>
  );
};

export default SkillField;
