import React, { useState } from "react";
import styles from "./styles.module.css";
import LocationList from "./LocationList";
import { locationItem } from "@/types/location.types";
import { searchEnemy } from "@/constants/enemies";
import { EnemyClass } from "@/constants/class";
import { useGameStore } from "@/store/gameStore";
import { TabsWithFight } from "../GameField/GameField";
import { IEnemy } from "@/types/enemy.types";
import FoundEnemies from "../Fight/FoundEnemies";
import HeroPanel from "@/components/Hero/HeroPanel/HeroPanel";

const LocationField = ({ onSetTab }: { onSetTab: (tab: TabsWithFight) => void }) => {
  const [enemies, setEnemies] = useState<IEnemy[]>([]);
  const [isLocationSelected, setLocationSelected] = useState(false);
  const { hero, enemy, setEnemy } = useGameStore((state) => state);

  const onSelectLocation = (locationName: locationItem["name"]) => {
    const enemies = searchEnemy(locationName);
    const enemy_1 = new EnemyClass(enemies[0]);
    const enemy_2 = new EnemyClass(enemies[1]);
    setEnemies([enemy_1, enemy_2]);
    setLocationSelected(true);
  };

  const onEnemySelected = () => {
    onSetTab("Бой");
  };

  if (!hero) {
    return null;
  }

  return (
    <div className={styles.locationField}>
      {!isLocationSelected && (
        <LocationList onSelectLocation={onSelectLocation} heroLevel={hero.level.value || 0} />
      )}
      {isLocationSelected && (
        <FoundEnemies disabled={!hero || !enemy} enemies={enemies} onEnemySelected={onEnemySelected} />
      )}
    </div>
  );
};

export default LocationField;
