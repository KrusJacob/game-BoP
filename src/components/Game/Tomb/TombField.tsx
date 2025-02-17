import { ENEMIES_TO_TOBM } from "@/constants/enemies";
import styles from "./styles.module.css";
import TombItem from "./TombItem";
import { useGameStore } from "@/store/gameStore";
import { IEnemy, enemyToTomb } from "@/types/enemy.types";
import img from "@assets/bg_tomb.jpg";
import { TabsWithFight } from "../GameField/GameField";
import Button from "@/components/UI/Button/Button";
import { useState } from "react";
import { clearEnemySkills, registerAllEnemySkills } from "@/constants/skill/enemy";
import { useSkillTextStore } from "@/store/skillTextStore";

const TombField = ({ onSetTab }: { onSetTab: (tab: TabsWithFight) => void }) => {
  const { setEnemy, hero, enemy } = useGameStore((state) => state);
  const addSkill = useSkillTextStore((state) => state.addEnemySkill);
  const [tombEnemy, setTombEnemy] = useState<enemyToTomb>({} as enemyToTomb);

  if (!hero) {
    return null;
  }

  const onSetEnemy = (enemy: IEnemy, item: enemyToTomb) => {
    setEnemy(enemy);
    setTombEnemy(item);
  };

  const onGoFight = () => {
    tombEnemy.defeated = true;

    if (enemy) {
      enemy.update = function () {
        setEnemy(this);
      };
      enemy.pushSkillText = function (text: string) {
        addSkill(text);
      };
      clearEnemySkills();
      registerAllEnemySkills(enemy.skills);
    }
    onSetTab("Бой");
  };

  return (
    <div className={styles.tombField}>
      <img className={styles.bg} src={img} alt={img} />
      <p style={{ marginTop: 10, marginLeft: 10 }}>
        Шкала для разблокировки босса увеличивается в зависимости какого типа врага вы убили
      </p>
      <div className={styles.tombList}>
        {ENEMIES_TO_TOBM.map((item) => (
          <TombItem
            onSetEnemy={onSetEnemy}
            tombProgress={hero.statistics.tombProgress}
            key={item.name}
            item={item}
          />
        ))}
      </div>
      <Button disabled={!enemy} className={styles.tombBtn} onClick={onGoFight}>
        Бой
      </Button>
    </div>
  );
};

export default TombField;
