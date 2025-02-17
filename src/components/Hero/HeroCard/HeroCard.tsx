import { IHero, heroSkills } from "../../../types/hero.types";
import styles from "./hero.module.css";
import Button from "@/components/UI/Button/Button";
import Badge from "@/components/UI/Badge/Badge";
import { IEnemy, enemySkills } from "@/types/enemy.types";
import { useState } from "react";
import { HeroClass } from "@/constants/class";
import Tooltip from "@/components/UI/Tooltip/Tooltip";
import { useGameStore } from "@/store/gameStore";
import HeroStatusBar from "./HeroStatusBar";
import HeroStatList from "./HeroStatList";
import SkillText from "./SkillText";

interface Props {
  hero: IHero | IEnemy;
  isChoosed?: boolean;
  chooseHero?: (hero: IHero) => void;
}

const HeroCard = ({ hero, chooseHero, isChoosed }: Props) => {
  const exp = useGameStore((state) => state.hero?.level.exp);

  // console.log("HeroCard");

  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <SkillText type={hero.type} />
        <HeroStatusBar type={hero instanceof HeroClass ? "hero" : "enemy"} />
        <img src={hero.baseStats.img} alt={hero.name} />
        <div className={styles.name}>{hero.baseStats.name}</div>
        {isChoosed && (
          <div className={styles.level}>
            <Tooltip title={hero instanceof HeroClass ? `${exp} / ${hero.level.expToNextLevel}` : ""}>
              <Badge>{hero.level.value}</Badge>
            </Tooltip>
          </div>
        )}
      </div>

      <SkillList skills={hero.skills} />
      <HeroStatList hero={hero} />

      {chooseHero && hero instanceof HeroClass && <Button onClick={() => chooseHero(hero)}>Выбрать</Button>}
    </div>
  );
};

const SkillList = ({ skills }: { skills: heroSkills[] | enemySkills[] }) => {
  const [label, setLabel] = useState("");
  const [descr, setDescr] = useState("");

  return (
    <div className={styles.skillList}>
      {descr && (
        <div className={styles.skillTitle}>
          <p>{label}</p>
          <span>{descr}</span>
        </div>
      )}
      {skills.map((item, i) => (
        <div
          onMouseEnter={() => {
            setLabel(item.label);
            setDescr(item.descr());
          }}
          onMouseLeave={() => setDescr("")}
          className={styles.skillItem}
          key={i}
        >
          <img src={item.img} alt={item.img} />
        </div>
      ))}
    </div>
  );
};

export default HeroCard;
