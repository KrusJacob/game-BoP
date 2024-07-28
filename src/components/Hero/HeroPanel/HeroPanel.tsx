import { heroSkills } from "@/types/hero.types";
import styles from "./styles.module.css";
import { skillTrigger } from "@/constants/fn";

const HeroPanel = ({ heroSkills, onClickSkill }: { heroSkills: heroSkills[]; onClickSkill: () => void }) => {
  // const skillCooldown = heroSkills[0].value.count;

  return (
    <div className={styles.heroPanel}>
      <div className={styles.heroSkills}>
        <button disabled={true} onClick={onClickSkill} className={styles.heroSkill}>
          <img src={heroSkills[0].img} alt="" />
        </button>
        {/* {skillCooldown > 0 && <span>{skillCooldown}</span>} */}
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
