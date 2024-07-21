import Button from "@/components/UI/Button/Button";
import styles from "./styles.module.css";
import { fight, searchEnemy } from "@/constants/fn";

import { useGameStore } from "@/store/gameStore";
import { IEnemy } from "@/types/enemy.types";
import { useEffect, useState } from "react";
import { ENEMIES_TO_WAY } from "@/constants/enemy";
import { EnemyClass } from "@/constants/class";
import { TabsWithFight } from "../GameField/GameField";
import FoundEnemies from "./FoundEnemies";
import { IHero } from "@/types/hero.types";
import OverLay from "@/layout/OverLay";
import { BiSolidCoinStack } from "react-icons/bi";
import { GiFlowerEmblem } from "react-icons/gi";
import HeroPanel from "@/components/Hero/HeroPanel/HeroPanel";

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

  const onGoFight = () => {
    if (enemy && hero) {
      fight(hero, enemy, setHero, setEnemy);
      setFight(true);
    }
  };

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
      {isFight && hero && <HeroPanel heroSkills={hero?.skills} />}
      {enemy?.status.death && (
        <EnemyDown onSetTab={onSetTab} setEnemy={setEnemy} enemy={enemy instanceof EnemyClass ? enemy : null} />
      )}
    </div>
  );
};

interface Props {
  onSetTab: (tab: TabsWithFight) => void;
  setEnemy: (enemy: IEnemy | IHero | null) => void;
  enemy: IEnemy | null;
}

const EnemyDown = ({ onSetTab, setEnemy, enemy }: Props) => {
  return (
    <OverLay>
      <div className={styles.enemyDownWrapper}>
        <h3>Вы победили!</h3>
        {enemy && (
          <div className={styles.resources}>
            <p>+ {enemy.resources.exp} Опыта</p>
            <p>
              + {enemy.resources.gold} <BiSolidCoinStack />
            </p>
            <p>
              + {enemy.resources.skillPoints} <GiFlowerEmblem />
            </p>
          </div>
        )}
        <Button
          onClick={() => {
            onSetTab("Главная");
            setEnemy(null);
          }}
        >
          OK
        </Button>
      </div>
    </OverLay>
  );
};

export default FightField;
