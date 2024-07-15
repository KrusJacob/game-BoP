import Button from "@/components/UI/Button/Button";
import styles from "./styles.module.css";

import { EnemyClass, HeroClass, fight } from "@/constants/fn";
import { heroType } from "@/types/hero.types";
import { useEffect } from "react";
import { useGameStore } from "@/store/gameStore";
import { enemyType } from "@/types/enemy.types";

import img from "@assets/bg_home.jpg";
import { BiSolidCoinStack } from "react-icons/bi";
import { GiFlowerEmblem } from "react-icons/gi";
import Tooltip from "@/components/UI/Tooltip/Tooltip";

const HomeField = () => {
  const hero = useGameStore((state) => state.hero);

  // const onSetEnemy = (enemy: heroType | enemyType) => {
  //   if (enemy !== "boxer" && enemy !== "programmer" && enemy !== "cook" && enemy !== "hairdresser") {
  //     const newEnemy = new EnemyClass(enemy);
  //     setEnemy(newEnemy);
  //   } else {
  //     const newEnemy = new HeroClass(enemy);
  //     setEnemy(newEnemy);
  //   }
  // };

  // const onGoFight = () => {
  //   if (enemy && hero) {
  //     // hero.barrier += hero.baseStats.maxHp;
  //     fight(hero, enemy, setHero, setEnemy);
  //   }
  // };

  return (
    <div className={styles.homeField}>
      <>
        <img src={img} alt={img} />
        <div className={styles.header}>
          <Tooltip size="small" title="Золото">
            <BiSolidCoinStack />
            {hero?.resources.gold}
          </Tooltip>

          <Tooltip size="small" title="Очки навыков">
            <GiFlowerEmblem />
            {hero?.resources.skillPoints}
          </Tooltip>
        </div>
        <Button className={styles.castle}>В Замок</Button>
        <Button className={styles.way}>В путь</Button>
        <Button className={styles.tomb}>В Гробницу</Button>
      </>
    </div>
  );
};

export default HomeField;
