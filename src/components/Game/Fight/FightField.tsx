import Button from "@/components/UI/Button/Button";
import styles from "./styles.module.css";
import { fight, searchEnemy } from "@/constants/fn";
import cn from "classnames";

import { useGameStore } from "@/store/gameStore";
import { IEnemy } from "@/types/enemy.types";
import { useEffect, useState } from "react";
import { ENEMIES_TO_WAY } from "@/constants/enemy";
import { EnemyClass } from "@/constants/class";
import { TabsWithFight } from "../GameField/GameField";

const FightField = ({ onSetTab }: { onSetTab: (tab: TabsWithFight) => void }) => {
  const [isFight, setFight] = useState(false);
  const [enemies, setEnemies] = useState<IEnemy[]>([]);
  const { hero, enemy, setHero, setEnemy } = useGameStore((state) => state);

  useEffect(() => {
    const enemies = searchEnemy(ENEMIES_TO_WAY);
    const enemy_1 = new EnemyClass(enemies[0]);
    const enemy_2 = new EnemyClass(enemies[1]);
    setEnemies([enemy_1, enemy_2]);
  }, []);

  useEffect(() => {
    if (enemy && enemy?.HP <= 0) {
      onSetTab("Главная");
      setEnemy(null);
    }
  }, [enemy?.HP]);

  const onGoFight = () => {
    if (enemy && hero) {
      fight(hero, enemy, setHero, setEnemy);
      setFight(true);
    }
  };
  console.log("render 1");

  return (
    <div className={styles.fightField}>
      {!isFight && (
        <>
          <FoundEnemies enemies={enemies} />
          <Button disabled={!hero || !enemy} onClick={onGoFight} size="big">
            {enemy ? "Начать бой" : "Выберете врага"}
          </Button>
        </>
      )}
    </div>
  );
};

const FoundEnemies = ({ enemies }: { enemies: IEnemy[] }) => {
  const { enemy, setEnemy } = useGameStore((state) => state);
  return (
    <div>
      {enemies.length !== 0 && (
        <div className={styles.enemies}>
          {enemies.map((enemyItem, i) => (
            <img
              className={cn(styles.enemy, {
                [styles.active]: enemyItem.type === enemy?.type,
                [styles.hide]: enemyItem.type !== enemy?.type && enemy,
              })}
              key={i}
              onClick={() => setEnemy(enemyItem)}
              src={enemyItem.baseStats.img}
              alt={enemyItem.type}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FightField;
