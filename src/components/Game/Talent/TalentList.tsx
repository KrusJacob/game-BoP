import { ALL_TALENTS } from "@/constants/talent";
import TalentItem from "./TalentItem";
import styles from "./styles.module.css";

const TalentList = () => {
  return (
    <div className={styles.talentList}>
      {ALL_TALENTS.map((item) => (
        <TalentItem key={item.name} item={item} />
      ))}
    </div>
  );
};

export default TalentList;
