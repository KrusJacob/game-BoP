import { PiSwordLight } from "react-icons/pi";
import { IHero } from "../../../types/hero.types";
import { MdShield } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { GiBrain, GiMuscleUp, GiSpinningSword, GiWalkingBoot } from "react-icons/gi";

import styles from "./hero.module.css";

import Button from "@/components/UI/Button/Button";
import Badge from "@/components/UI/Badge/Badge";
import Tooltip from "@/components/UI/Tooltip/Tooltip";

interface Props {
  hero: IHero;
  isChoosed?: boolean;
  chooseHero?: (hero: IHero) => void;
}

//https://www.pngitem.com/pimgs/m/240-2409533_hero-silhouette-free-png-transparent-png.png

const HeroCard = ({ hero, chooseHero, isChoosed }: Props) => {
  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <img src={hero.baseStats.img} alt={hero.type} />
        <div className={styles.name}>{hero.baseStats.name}</div>
        {isChoosed && (
          <div className={styles.level}>
            <Badge>{hero.level}</Badge>
          </div>
        )}
      </div>
      <div>
        <p className={styles.stats}>
          <FaHeart />
          <span>Здоровье:</span>
          {hero.baseStats.maxHp}
        </p>
        <p className={styles.stats}>
          <GiMuscleUp />
          <span>Cила:</span>
          {hero.baseStats.power}
        </p>
        <p className={styles.stats}>
          <GiWalkingBoot />
          <span>Ловкость:</span>
          {hero.baseStats.agility}
        </p>
        <p className={styles.stats}>
          <GiBrain />
          <span>Интеллект:</span> {hero.baseStats.intellect}
        </p>
        <p className={styles.stats}>
          <PiSwordLight /> <span>Атака:</span>
          {hero.baseStats.attack}
        </p>
        <p className={styles.stats}>
          <MdShield /> <span>Защита:</span>
          {hero.baseStats.def}
        </p>
        <p className={styles.stats}>
          <GiSpinningSword /> <span>Скорость атаки:</span>
          {hero.baseStats.attackSpeed}
        </p>
        <div className={styles.skillList}>
          {hero.skills.data.map((item, i) => (
            <div className={styles.skillItem} key={i}>
              <Tooltip title="Описание способности. В разработке...">
                <img src={item.img} alt={item.img} />
              </Tooltip>
            </div>
          ))}
        </div>
      </div>
      {chooseHero && <Button onClick={() => chooseHero(hero)}>Выбрать</Button>}
    </div>
  );
};

export default HeroCard;
