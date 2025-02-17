import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import { IEnemy, enemyToTomb, enemyType } from "@/types/enemy.types";
import cn from "classnames";
import { EnemyClass } from "@/constants/class";
import Button from "@/components/UI/Button/Button";
import lockImg from "@assets/enemy/lock.png";
import { tombProgress } from "@/types/hero.types";
import { calcWidthBar } from "@/utils/calcWidthBar";

interface Props {
  tombProgress: tombProgress;
  item: enemyToTomb;
  onSetEnemy: (enemy: IEnemy, item: enemyToTomb) => void;
}

const TombItem = ({ item, onSetEnemy, tombProgress }: Props) => {
  const [enemy, setEnemy] = useState<IEnemy>();
  const ref = useRef<HTMLDivElement>(null);
  const tombEnemy = item.name.replace(/_\d/gm, "") as enemyType;
  const heroProgress = Math.min(tombProgress[tombEnemy], item.value);
  const progressText = Math.round((heroProgress / item.value) * 100);

  // console.log(heroProgress);

  useEffect(() => {
    const enemy = new EnemyClass(item.name);
    setEnemy(enemy);
  }, []);

  useEffect(() => {
    if (ref.current) {
      calcWidthBar(ref.current, item.value, heroProgress);
    }
  }, [item.value, heroProgress]);

  const lock = item.value > heroProgress;

  return (
    <div
      className={cn(styles.tombItemWrapper, {
        [styles.defeated]: item.defeated,
      })}
    >
      <div className={styles.tombItem}>
        <img src={lock ? lockImg : enemy?.baseStats.img} alt={item.name}></img>
      </div>
      <div className={styles.info}>
        <p className={styles.progressText}>{item.defeated ? "Побежден" : `${progressText}%`}</p>
        <div className={styles.full_progressBar}>
          <div ref={ref} className={styles.progressBar}></div>
        </div>

        {enemy && (
          <Button
            disabled={lock || item.defeated}
            onClick={() => {
              onSetEnemy(enemy, item);
            }}
            size="small"
          >
            {lock ? "???" : enemy?.baseStats.name}
          </Button>
        )}
      </div>
    </div>
  );
};

export default TombItem;
