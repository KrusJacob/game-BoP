import TalentList from "./TalentList";
import styles from "./styles.module.css";

const TalentField = () => {
  return (
    <div className={styles.talentField}>
      <TalentList />
    </div>
  );
};

export default TalentField;
