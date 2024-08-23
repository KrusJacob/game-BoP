import styles from "./styles.module.css";
import { Tooltip } from "react-tooltip";

const SkillField = () => {
  return (
    <div className={styles.skillField}>
      <p data-tooltip-id="my-tooltip">Навыки. В разработке...</p>
      <Tooltip id="my-tooltip">Навыки. В разработке...</Tooltip>
    </div>
  );
};

export default SkillField;
