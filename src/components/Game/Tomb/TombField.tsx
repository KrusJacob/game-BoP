import { ENEMIES_TO_TOBM } from "@/constants/enemies";
import styles from "./styles.module.css";
import TombItem from "./TombItem";
import { useGameStore } from "@/store/gameStore";
import { IEnemy } from "@/types/enemy.types";
import img from "@assets/bg_tomb.jpg";

const TombField = () => {
  const { setEnemy, hero } = useGameStore((state) => state);

  const onSetEnemy = (enemy: IEnemy) => {
    setEnemy(enemy);
  };

  return (
    <div className={styles.tombField}>
      <img className={styles.bg} src={img} alt={img} />
      <div className={styles.tombList}>
        {ENEMIES_TO_TOBM.map((item) => (
          <TombItem onSetEnemy={onSetEnemy} heroResources={hero!.resources} key={item.name} item={item} />
        ))}
      </div>
    </div>
  );
};

export default TombField;
