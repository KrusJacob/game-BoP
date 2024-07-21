import { heroSkills } from "@/types/hero.types";
import styles from "./styles.module.css";

const HeroPanel = ({ heroSkills }: { heroSkills: heroSkills }) => {
  return (
    <div className={styles.heroPanel}>
      <div className={styles.heroSkills}>
        <div className={styles.heroSkill}>
          <img src={heroSkills.data[0].img} alt="" />
        </div>
      </div>
      <div className={styles.heroBag}>
        {[...Array(3).keys()].map((item) => (
          <div key={item}></div>
        ))}
      </div>
    </div>
  );
};

export default HeroPanel;
