import { useEffect, useState } from "react";
import styles from "./hero.module.css";
import { useSkillTextStore } from "@/store/skillTextStore";

const SkillText = () => {
  //   const { battleText, removeSkill } = useSkill();
  const { skillText, removeSkill } = useSkillTextStore();
  return (
    <div className={styles.textBattle}>
      {skillText.map((item, i) => (
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
