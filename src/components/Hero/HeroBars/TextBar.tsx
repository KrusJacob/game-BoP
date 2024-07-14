import styles from "./styles.module.css";

const TextBar = ({ hp }: { hp: number }) => {
  console.log("textBar");
  return <div className={styles.textBar}>{hp}</div>;
};

export default TextBar;
