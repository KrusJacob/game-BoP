import TalentList from "./TalentList";
import styles from "./styles.module.css";
import img from "@assets/bg_talent.jpg";

const TalentField = () => {
  return (
    <div className={styles.talentField}>
      <img src={img} alt={img} />
      <div className={styles.talentWrapper}>
        <TalentList />
        <div className={styles.info}>
          <p>Герой получает случайный талант за каждый уровень</p>
          <span>Каждый талант может улучшаться до 5 раз</span>
        </div>
      </div>
    </div>
  );
};

export default TalentField;
