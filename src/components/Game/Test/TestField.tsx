import Button from "@/components/UI/Button/Button";
import styles from "./styles.module.css";
import { fight } from "@/constants/fn";
import { heroType } from "@/types/hero.types";
import { useGameStore } from "@/store/gameStore";
import { enemyType } from "@/types/enemy.types";
import { EnemyClass, HeroClass } from "@/constants/class";

const TestField = () => {
  const { hero, enemy, setHero, setEnemy } = useGameStore((state) => state);

  const onSetEnemy = (enemy: heroType | enemyType) => {
    if (enemy !== "boxer" && enemy !== "programmer" && enemy !== "cook" && enemy !== "hairdresser") {
      const newEnemy = new EnemyClass(enemy);
      setEnemy(newEnemy);
    } else {
      const newEnemy = new HeroClass(enemy);
      setEnemy(newEnemy);
    }
  };

  const onGoFight = () => {
    if (enemy && hero) {
      // hero.barrier += hero.baseStats.maxHp;
      fight(hero, enemy);
    }
  };

  return (
    <div className={styles.testField}>
      <div>
        <Button
          onClick={() => {
            if (hero) {
              hero?.level.incExp(100);
              setHero(hero);
            }
          }}
        >
          Дать 100 опыта
        </Button>
      </div>
      <div>
        <p>Тест против:</p>
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
      </div>
      <div>
        <p>Бой против:</p>
        <div>
          <Button size="small" onClick={() => onSetEnemy("rogue")}>
            Разбойник 1
          </Button>
          <Button size="small" onClick={() => onSetEnemy("rogue_2")}>
            Разбойник 2
          </Button>
          <Button size="small" onClick={() => onSetEnemy("rogue_3")}>
            Разбойник 3
          </Button>
          <Button size="small" onClick={() => onSetEnemy("rogue_4")}>
            Разбойник 4
          </Button>
        </div>
      </div>
      <Button disabled={!hero || !enemy} onClick={onGoFight} size="big">
        Начать бой
      </Button>
    </div>
  );
};

export default TestField;
