import TalentList from "./TalentList";
import styles from "./styles.module.css";

const TalentField = () => {
  return (
    <div className={styles.talentField}>
      <TalentList />
      <div className={styles.info}>
        <p>Герой получает случайный талант за каждый уровень</p>
        <span>Каждый талант может улучшаться до 5 раз</span>
      </div>
    </div>
  );
};

export default TalentField;
