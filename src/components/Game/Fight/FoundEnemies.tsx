import cn from "classnames";
import styles from "./styles.module.css";
import { useGameStore } from "@/store/gameStore";
import { IEnemy } from "@/types/enemy.types";

const FoundEnemies = ({ enemies }: { enemies: IEnemy[] }) => {
  const { enemy, setEnemy } = useGameStore((state) => state);
  return (
    <div>
      {enemies.length !== 0 && (
        <div className={styles.enemies}>
          {enemies.map((enemyItem, i) => (
            <img
              className={cn(styles.enemy, {
                [styles.active]: enemyItem.type === enemy?.type,
                [styles.hide]: enemyItem.type !== enemy?.type && enemy,
              })}
              key={i}
              onClick={() => setEnemy(enemyItem)}
              src={enemyItem.baseStats.img}
              alt={enemyItem.type}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FoundEnemies;
