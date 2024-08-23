import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { IEnemy, enemiesToTomb, enemyName } from "@/types/enemy.types";
import { EnemyClass } from "@/constants/class";
import Button from "@/components/UI/Button/Button";
import lockImg from "@assets/enemy/lock.png";
import { heroResources } from "@/types/hero.types";

interface Props {
  heroResources: heroResources;
  item: enemiesToTomb;
  onSetEnemy: (enemy: IEnemy) => void;
}

const TombItem = ({ item, onSetEnemy, heroResources }: Props) => {
  const [enemy, setEnemy] = useState<IEnemy>();

  useEffect(() => {
    const enemy = new EnemyClass(item.name);
    setEnemy(enemy);
  }, []);

  const heroResource = heroResources.drop[item.resource.type];
  const lock = heroResource === 0;

  return (
    <div className={styles.tombItemWrapper}>
      <div className={styles.tombItem}>
        <p>{lock ? "???" : enemy?.baseStats.name}</p>
        <img src={lock ? lockImg : enemy?.baseStats.img} alt={item.name}></img>
      </div>
      <div className={styles.info}>
        <p>
          {heroResources.drop[item.resource.type]}/{item.resource.value[0]} {item.resource.label}
        </p>
        {enemy && (
          <Button disabled={heroResource < item.resource.value[0]} onClick={() => onSetEnemy(enemy)} size="small">
            Призвать
          </Button>
        )}
      </div>
    </div>
  );
};

export default TombItem;
