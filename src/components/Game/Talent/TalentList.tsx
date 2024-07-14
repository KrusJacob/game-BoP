import TalentItem from "./TalentItem";
import styles from "./styles.module.css";

const TalentList = () => {
  return (
    <div className={styles.talentList}>
      {[...Array(24).keys()].map((item) => (
        <TalentItem key={item} />
      ))}
    </div>
  );
};

export default TalentList;
