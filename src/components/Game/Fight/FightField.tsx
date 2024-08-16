import Button from "@/components/UI/Button/Button";
import styles from "./styles.module.css";
import { fight, searchEnemy } from "@/constants/fn";

import { useGameStore } from "@/store/gameStore";
import { IEnemy } from "@/types/enemy.types";
import { useEffect, useState } from "react";

import { EnemyClass } from "@/constants/class";
import { TabsWithFight } from "../GameField/GameField";
import FoundEnemies from "./FoundEnemies";
import { IHero } from "@/types/hero.types";
import OverLay from "@/layout/OverLay";
import { BiSolidCoinStack } from "react-icons/bi";
import { GiFlowerEmblem } from "react-icons/gi";
import HeroPanel from "@/components/Hero/HeroPanel/HeroPanel";
import LocationList from "../Location/LocationList";
import { locationItem } from "@/types/location.types";
import { motion } from "framer-motion";
import TextList from "@/components/Text/TextList";

const FightField = ({ onSetTab }: { onSetTab: (tab: TabsWithFight) => void }) => {
  const [isFight, setFight] = useState(false);
  const [isLocationSelected, setLocationSelected] = useState(false);
  const [enemies, setEnemies] = useState<IEnemy[]>([]);
  const { hero, enemy, setHero, setEnemy } = useGameStore((state) => state);

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

  const onClickSkill = () => {
    // skillTrigger.active[0].call(hero?.skills, hero, enemy);
  };

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
          <HeroPanel hero={hero} enemy={enemy} onClickSkill={onClickSkill} />
        </>
      )}
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
  const [isBtnEnable, setBtnEnable] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setBtnEnable(true);

      return () => clearTimeout(timeout);
    }, 500);
  }, []);

  return (
    <OverLay>
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={styles.enemyDownWrapper}
      >
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
          disabled={!isBtnEnable}
          onClick={() => {
            onSetTab("Главная");
            setEnemy(null);
          }}
        >
          OK
        </Button>
      </motion.div>
    </OverLay>
  );
};

export default FightField;
