import Button from "@/components/UI/Button/Button";
import styles from "./styles.module.css";
import { useHeroContext } from "@/context/HeroContext";
import { HeroClass, fight } from "@/constants/fn";
import { heroType } from "@/types/hero.types";

const HomeField = () => {
  const { hero, setEnemy } = useHeroContext();

  const onGoFight = (enemy: heroType) => {
    const newEnemy = new HeroClass(enemy);
    setEnemy(newEnemy);
    fight(hero, newEnemy);
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
