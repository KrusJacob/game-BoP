import styles from "./styles.module.css";
import { useGameStore } from "@/store/gameStore";
import { useState } from "react";
import HeroStatList from "./HeroStatList";

const HeroField = () => {
  const hero = useGameStore((state) => state.hero);
  const [totalPoint, setTotalPoint] = useState(hero?.resources.parameterPoints || 0);

  const getFinishPoints = (value: any) => {
    if (hero) {
      if (value.powerPoint > 0) hero.setters.incPower(value.powerPoint);
      if (value.agilityPoint > 0) hero.setters.incAgility(value.agilityPoint);
      if (value.intellectPoint > 0) hero.setters.incIntellect(value.intellectPoint);
      hero.resources.parameterPoints -= value.powerPoint + value.agilityPoint + value.intellectPoint;
      hero.update();
    }
  };

  return (
    <div className={styles.heroField}>
      <p className={styles.title}>{hero?.level.value} Уровень</p>
      <p className={styles.points}>У вас имеется {totalPoint} очков характеристик</p>
      {hero && (
        <HeroStatList
          totalPoint={totalPoint}
          setTotalPoint={setTotalPoint}
          hero={hero}
          getFinishPoints={getFinishPoints}
        />
      )}
      <div className={styles.info}>
        <p>Сила - влияет на максимальный запас здоровья</p>
        <p>Ловкость - влияет на скорость атаки</p>
        <p>Интеллект - влияет на силу умений</p>
      </div>
    </div>
  );
};

export default HeroField;
