import styles from "./styles.module.css";
import { useGameStore } from "@/store/gameStore";
import { IEnemy } from "@/types/enemy.types";
import { useCallback, useEffect, useState } from "react";
import { EnemyClass } from "@/constants/class";
import { TabsWithFight } from "../GameField/GameField";
import FoundEnemies from "./FoundEnemies";
import HeroPanel from "@/components/Hero/HeroPanel/HeroPanel";
import LocationList from "../Location/LocationList";
import { locationItem } from "@/types/location.types";
import TextList from "@/components/Text/TextList";
import EnemyModal from "./EnemyModal";
import { fight } from "@/constants/func/fight";
import { searchEnemy } from "@/constants/enemies";
import { skillHeroTrigger } from "@/constants/skill/heroes";

const FightField = ({ onSetTab }: { onSetTab: (tab: TabsWithFight) => void }) => {
  const [isFight, setFight] = useState(false);
  const { hero, enemy, setEnemy } = useGameStore((state) => state);

  // console.log("render FightField");

  if (!hero || !enemy) {
    return null;
  }

  useEffect(() => {
    fight(hero, enemy);
    setFight(true);
  }, []);

  return (
    <div className={styles.fightField}>
      {isFight && (
        <>
          <TextList />
          <HeroPanel />
        </>
      )}
      {enemy?.status.death && (
        <EnemyModal onSetTab={onSetTab} setEnemy={setEnemy} enemy={enemy instanceof EnemyClass ? enemy : null} />
      )}
    </div>
  );
};

export default FightField;
