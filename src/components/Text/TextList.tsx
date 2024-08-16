import { ALL_TEXT } from "@/constants/text";
import styles from "./styles.module.css";
import TextItem from "./TextItem";

const TextList = () => {
  return (
    <div className={styles.textList}>
      {ALL_TEXT.map((item, i) => {
        if (10 + i - ALL_TEXT.length > 0) {
          return <TextItem key={i} item={item} />;
        }
      })}
    </div>
  );
};

export default TextList;
