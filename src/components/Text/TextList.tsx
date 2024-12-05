import styles from "./styles.module.css";
import TextItem from "./TextItem";
import { useBattleTextStore } from "@/store/battleTextStore";
import { memo } from "react";

const TextList = memo(() => {
  const battleText = useBattleTextStore((state) => state.battleText);
  // console.log("render TextList", battleText.length);
  return (
    <div className={styles.textList}>
      {battleText.map((item, i) => {
        if (10 + i - battleText.length > 0) {
          return <TextItem key={i} item={item} />;
        }
      })}
    </div>
  );
});

export default TextList;
