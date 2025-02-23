import cn from "classnames";
import styles from "./styles.module.css";
import { useGameStore } from "@/store/gameStore";
import { IEnemy } from "@/types/enemy.types";
import Button from "@/components/UI/Button/Button";

import { clearEnemySkills, registerAllEnemySkills } from "@/constants/skill/enemy";
import { useSkillTextStore } from "@/store/skillTextStore";

interface Props {
  enemies: IEnemy[];
  disabled: boolean;
  onEnemySelected: () => void;
}

const FoundEnemies = ({ enemies, disabled, onEnemySelected }: Props) => {
  const { enemy, setEnemy } = useGameStore((state) => state);
  const addSkill = useSkillTextStore((state) => state.addEnemySkill);

  const onSetEnemy = (enemy: IEnemy) => {
    enemy.update = function () {
      setEnemy(this);
    };
    clearEnemySkills();
    registerAllEnemySkills(enemy.skills);
    enemy.update();
    enemy.pushSkillText = function (text: string) {
      addSkill(text);
    };
  };

  return (
    <div className={styles.foundEnemies}>
      {enemies.length !== 0 && (
        <div className={styles.enemies}>
          {enemies.map((enemyItem, i) => (
            <img
              className={cn(styles.enemy, {
                [styles.active]: enemyItem.name === enemy?.name,
                [styles.hide]: enemyItem.name !== enemy?.name && enemy,
                [styles.enemy_2]: enemyItem.name.slice(-1) === "2",
                [styles.enemy_3]: enemyItem.name.slice(-1) === "3",
                [styles.enemy_4]: enemyItem.name.slice(-1) === "4",
                [styles.enemy_5]: enemyItem.name.slice(-1) === "5",
                [styles.enemy_legend]: enemyItem.name.slice(-1) === "L",
              })}
              key={i}
              onClick={() => onSetEnemy(enemyItem)}
              src={enemyItem.baseStats.img}
              alt={enemyItem.name}
            />
          ))}
        </div>
      )}
      <Button disabled={disabled} onClick={onEnemySelected} size="big">
        {enemy ? "Начать бой" : "Выберете врага"}
      </Button>
    </div>
  );
};

export default FoundEnemies;
