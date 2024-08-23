import styles from "./styles.module.css";
import { useGameStore } from "@/store/gameStore";
import { IEnemy } from "@/types/enemy.types";
import { useState } from "react";
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

const FightField = ({ onSetTab }: { onSetTab: (tab: TabsWithFight) => void }) => {
  const [isFight, setFight] = useState(false);
  const [isLocationSelected, setLocationSelected] = useState(false);
  const [enemies, setEnemies] = useState<IEnemy[]>([]);
  const { hero, enemy, setEnemy } = useGameStore((state) => state);

  console.log("FightField");

  const onGoFight = () => {
    if (enemy && hero) {
      fight(hero, enemy);
      setFight(true);
    }
  };

  const onSelectLocation = (locationName: locationItem["name"]) => {
    const enemies = searchEnemy(locationName);
    const enemy_1 = new EnemyClass(enemies[0]);
    const enemy_2 = new EnemyClass(enemies[1]);
    setEnemies([enemy_1, enemy_2]);
    setLocationSelected(true);
  };

  // const onClickSkill = () => {
  //   skillTrigger.active[0].call(hero?.skills, hero, enemy);
  // };

  if (!hero) {
    return null;
  }

  return (
    <div className={styles.fightField}>
      {!isLocationSelected && (
        <LocationList onSelectLocation={onSelectLocation} heroLevel={hero.level.value || 0} />
      )}
      {isLocationSelected && !isFight && (
        <FoundEnemies disabled={!hero || !enemy} enemies={enemies} onGoFight={onGoFight} />
      )}
      {isFight && enemy && (
        <>
          <TextList />
          <HeroPanel hero={hero} enemy={enemy} />
        </>
      )}
      {enemy?.status.death && (
        <EnemyModal onSetTab={onSetTab} setEnemy={setEnemy} enemy={enemy instanceof EnemyClass ? enemy : null} />
      )}
    </div>
  );
};

export default FightField;
