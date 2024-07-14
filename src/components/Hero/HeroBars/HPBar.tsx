import TextBar from "./TextBar";
import styles from "./styles.module.css";

const HPBar = ({ hp }: { hp: number }) => {
  return (
    <div className={styles.HPBar}>
      <TextBar hp={hp} />
    </div>
  );
};

export default HPBar;
