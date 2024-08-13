import cn from "classnames";
import styles from "./styles.module.css";
import { useGameStore } from "@/store/gameStore";
import { IEnemy } from "@/types/enemy.types";
import Button from "@/components/UI/Button/Button";

interface Props {
  enemies: IEnemy[];
  disabled: boolean;
  onGoFight: () => void;
}

const FoundEnemies = ({ enemies, disabled, onGoFight }: Props) => {
  const { enemy, setEnemy } = useGameStore((state) => state);

  const onSetEnemy = (enemy: IEnemy) => {
    enemy.update = function () {
      setEnemy(this);
    };
    enemy.update();
  };

  return (
    <div className={styles.foundEnemies}>
      {enemies.length !== 0 && (
        <div className={styles.enemies}>
          {enemies.map((enemyItem, i) => (
            <img
              className={cn(styles.enemy, {
                [styles.active]: enemyItem.type === enemy?.type,
                [styles.hide]: enemyItem.type !== enemy?.type && enemy,
                [styles.enemy_2]: enemyItem.type.slice(-1) === "2",
                [styles.enemy_3]: enemyItem.type.slice(-1) === "3",
                [styles.enemy_4]: enemyItem.type.slice(-1) === "4",
                [styles.enemy_5]: enemyItem.type.slice(-1) === "5",
              })}
              key={i}
              onClick={() => onSetEnemy(enemyItem)}
              src={enemyItem.baseStats.img}
              alt={enemyItem.type}
            />
          ))}
        </div>
      )}
      <Button disabled={disabled} onClick={onGoFight} size="big">
        {enemy ? "Начать бой" : "Выберете врага"}
      </Button>
    </div>
  );
};

export default FoundEnemies;
