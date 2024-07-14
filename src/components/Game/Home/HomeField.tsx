import Button from "@/components/UI/Button/Button";
import styles from "./styles.module.css";
import { useHeroContext } from "@/context/HeroContext";
import { HeroClass, fight } from "@/constants/fn";
import { heroType } from "@/types/hero.types";
import { useEffect } from "react";

const HomeField = () => {
  const { hero, setEnemy, enemy } = useHeroContext();

  useEffect(() => {
    const newEnemy = new HeroClass("boxer");
    setEnemy(newEnemy);
  }, []);

  const onGoFight = (aenemy: heroType) => {
    // const newEnemy = new HeroClass(enemy);
    if (enemy) {
      hero.attack(enemy);
      setEnemy(enemy);
    }

    // fight(hero, newEnemy);
  };

  return (
    <div className={styles.homeField}>
      <p>бой против:</p>
      <Button size="small" onClick={() => onGoFight("boxer")}>
        Боксер
      </Button>
      <Button size="small" onClick={() => onGoFight("cook")}>
        Повар
      </Button>
      <Button size="small" onClick={() => onGoFight("hairdresser")}>
        Парикмахер
      </Button>
      <Button size="small" onClick={() => onGoFight("programmer")}>
        Программист
      </Button>
    </div>
  );
};

export default HomeField;
