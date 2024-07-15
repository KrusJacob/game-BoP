import Button from "@/components/UI/Button/Button";
import styles from "./styles.module.css";

import { HeroClass, fight } from "@/constants/fn";
import { heroType } from "@/types/hero.types";
import { useEffect } from "react";
import { useGameStore } from "@/store/gameStore";

const HomeField = () => {
  const { hero, enemy, setHero, setEnemy } = useGameStore((state) => state);

  const onSetEnemy = (enemy: heroType) => {
    const newEnemy = new HeroClass(enemy);
    setEnemy(newEnemy);
  };

  const onGoFight = () => {
    if (enemy && hero) {
      // hero.barrier += hero.baseStats.maxHp;
      fight(hero, enemy, setHero, setEnemy);
    }
  };

  return (
    <div className={styles.homeField}>
      <p>бой против:</p>
      <div>
        <Button size="small" onClick={() => onSetEnemy("boxer")}>
          Боксер
        </Button>
        <Button size="small" onClick={() => onSetEnemy("cook")}>
          Повар
        </Button>
        <Button size="small" onClick={() => onSetEnemy("hairdresser")}>
          Парикмахер
        </Button>
        <Button size="small" onClick={() => onSetEnemy("programmer")}>
          Программист
        </Button>
      </div>
      <Button disabled={!hero || !enemy} onClick={onGoFight} size="big">
        Начать бой
      </Button>
    </div>
  );
};

export default HomeField;
