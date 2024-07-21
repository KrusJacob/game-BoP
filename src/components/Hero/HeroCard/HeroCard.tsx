import { PiSwordLight } from "react-icons/pi";
import { IHero, heroSkills } from "../../../types/hero.types";
import { MdShield } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { GiBrain, GiMuscleUp, GiSpinningSword, GiWalkingBoot } from "react-icons/gi";

import styles from "./hero.module.css";

import Button from "@/components/UI/Button/Button";
import Badge from "@/components/UI/Badge/Badge";
import { IEnemy, enemySkills } from "@/types/enemy.types";
import HeroStat from "./HeroStat";
import { useState } from "react";
import { useGameStore } from "@/store/gameStore";
import { HeroClass } from "@/constants/class";
import Tooltip from "@/components/UI/Tooltip/Tooltip";

interface Props {
  hero: IHero | IEnemy;
  isChoosed?: boolean;
  chooseHero?: (hero: IHero) => void;
}

//https://www.pngitem.com/pimgs/m/240-2409533_hero-silhouette-free-png-transparent-png.png

const HeroCard = ({ hero, chooseHero, isChoosed }: Props) => {
  // const heroLevel = useGameStore((state) => state.hero?.level.value);

  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <img src={hero.baseStats.img} alt={hero.type} />
        <div className={styles.name}>{hero.baseStats.name}</div>
        {isChoosed && (
          <div className={styles.level}>
            <Tooltip title={hero instanceof HeroClass ? `${hero.level.exp} / ${hero.level.expToNextLevel}` : ""}>
              <Badge>{hero.level.value}</Badge>
            </Tooltip>
          </div>
        )}
      </div>
      <div>
        <HeroStat Icon={FaHeart} value={hero.baseStats.maxHp}>
          Здоровье
        </HeroStat>
        <HeroStat Icon={GiMuscleUp} value={hero.baseStats.power}>
          Cила
        </HeroStat>
        <HeroStat Icon={GiWalkingBoot} value={hero.baseStats.agility}>
          Ловкость
        </HeroStat>
        <HeroStat Icon={GiBrain} value={hero.baseStats.intellect}>
          Интеллект
        </HeroStat>
        <HeroStat Icon={PiSwordLight} value={hero.baseStats.attack}>
          Атака
        </HeroStat>
        <HeroStat Icon={MdShield} value={hero.baseStats.def}>
          Защита
        </HeroStat>
        <HeroStat Icon={GiSpinningSword} value={hero.baseStats.attackSpeed}>
          Скорость атаки
        </HeroStat>
        <SkillList skills={hero.skills} />
      </div>
      {chooseHero && hero instanceof HeroClass && <Button onClick={() => chooseHero(hero)}>Выбрать</Button>}
    </div>
  );
};

const SkillList = ({ skills }: { skills: heroSkills | enemySkills }) => {
  const [title, setTitle] = useState("");

  return (
    <div className={styles.skillList}>
      {title && <div className={styles.skillTitle}>{title}</div>}
      {skills.data.map((item, i) => (
        <div
          onMouseEnter={() => setTitle("Описание способности. В разработке...")}
          onMouseLeave={() => setTitle("")}
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
