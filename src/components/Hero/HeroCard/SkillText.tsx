import { useEffect, useState } from "react";
import cn from "classnames";
import styles from "./hero.module.css";
import { ISkillText, useSkillTextStore } from "@/store/skillTextStore";
import { heroType } from "@/types/hero.types";

const SkillText = ({ type }: { type: heroType }) => {
  if (type === "hero") {
    const skillText = useSkillTextStore((store) => store.skillText);
    const removeSkill = useSkillTextStore((store) => store.removeSkill);

    return <TextBattleList list={skillText} removeSkill={removeSkill} />;
  }
  if (type === "enemy") {
    const skillText = useSkillTextStore((store) => store.enemySkillText);
    const removeSkill = useSkillTextStore((store) => store.removeEnemySkill);

    return <TextBattleList list={skillText} removeSkill={removeSkill} isEnemy />;
  }
};

const TextBattleList = ({
  list,
  removeSkill,
  isEnemy = false,
}: {
  list: ISkillText[];
  removeSkill: (i: number) => void;
  isEnemy?: boolean;
}) => {
  return (
    <div
      className={cn(styles.textBattle, {
        [styles.isEnemy]: isEnemy,
      })}
    >
      {list.map((item, i) => (
        <TextBattleItem text={item.text} key={i} onRemove={() => removeSkill(i)} />
      ))}
    </div>
  );
};

const TextBattleItem = ({ text, onRemove }: { text: string; onRemove: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onRemove]);

  return <p>{text}</p>;
};

export default SkillText;
