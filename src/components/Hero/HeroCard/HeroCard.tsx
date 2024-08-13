import { PiSwordLight } from "react-icons/pi";
import { IHero, heroSkills } from "../../../types/hero.types";
import { MdShield } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { GiBrain, GiMuscleUp, GiSpinningSword, GiWalkingBoot, GiWizardStaff } from "react-icons/gi";

import styles from "./hero.module.css";

import Button from "@/components/UI/Button/Button";
import Badge from "@/components/UI/Badge/Badge";
import { IEnemy, enemySkills } from "@/types/enemy.types";
import HeroStat from "./HeroStat";
import { useState } from "react";

import { HeroClass } from "@/constants/class";
import Tooltip from "@/components/UI/Tooltip/Tooltip";
import { useGameStore } from "@/store/gameStore";

interface Props {
  hero: IHero | IEnemy;
  isChoosed?: boolean;
  chooseHero?: (hero: IHero) => void;
}

function getImgUrl(name: string) {
  return new URL(`${name}`, import.meta.url).href;
}

//https://www.pngitem.com/pimgs/m/240-2409533_hero-silhouette-free-png-transparent-png.png

const HeroCard = ({ hero, chooseHero, isChoosed }: Props) => {
  const power = useGameStore((state) => state.hero?.incStats.power);
  const agility = useGameStore((state) => state.hero?.incStats.agility);
  const intellect = useGameStore((state) => state.hero?.incStats.intellect);
  const exp = useGameStore((state) => state.hero?.level.exp);

  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <img src={hero.baseStats.img} alt={hero.type} />
        <div className={styles.name}>{hero.baseStats.name}</div>
        {isChoosed && (
          <div className={styles.level}>
            <Tooltip title={hero instanceof HeroClass ? `${exp} / ${hero.level.expToNextLevel}` : ""}>
              <Badge>{hero.level.value}</Badge>
            </Tooltip>
          </div>
        )}
      </div>
      <div>
        <HeroStat Icon={FaHeart} value={hero.getters.getMaxHp()}>
          Здоровье
        </HeroStat>
        <HeroStat Icon={GiMuscleUp} value={hero.getters.getPower()}>
          Cила
        </HeroStat>
        <HeroStat Icon={GiWalkingBoot} value={hero.getters.getAgility()}>
          Ловкость
        </HeroStat>
        <HeroStat Icon={GiBrain} value={hero.getters.getIntellect()}>
          Интеллект
        </HeroStat>
        <HeroStat Icon={PiSwordLight} value={hero.getters.getAttack()}>
          Атака
        </HeroStat>
        <HeroStat Icon={MdShield} value={hero.getters.getDef()}>
          Защита
        </HeroStat>
        <HeroStat Icon={GiSpinningSword} value={hero.getters.getAttackSpeed()}>
          Скорость атаки
        </HeroStat>
        <HeroStat
          title={"Влияет на урон способностей и исцеление"}
          Icon={GiWizardStaff}
          value={hero.getters.getPowerSkill()}
        >
          Сила умений
        </HeroStat>
        <SkillList skills={hero.skills} />
      </div>
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
