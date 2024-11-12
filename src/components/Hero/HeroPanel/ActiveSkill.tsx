import { TbHexagonLetterE } from "react-icons/tb";
import styles from "./styles.module.css";
import { useGameStore } from "@/store/gameStore";
import { useCallback } from "react";
import { skillHeroTrigger } from "@/constants/skill/heroes";

const ActiveSkill = () => {
  const { hero } = useGameStore((state) => state);
  const enemy = useGameStore((state) => state.enemy);

  if (!hero) {
    return null;
  }

  const onClickSkill = useCallback(() => {
    if (hero.energy.value >= hero.skills[0].data.costEnergy) {
      skillHeroTrigger.active[0].call(hero?.skills, hero, enemy);
      hero.energy.value -= hero.skills[0].data.costEnergy;
    }
  }, []);

  return (
    <div className={styles.heroSkills}>
      <button
        disabled={hero.energy.value < hero.skills[0].data.costEnergy}
        onClick={onClickSkill}
        className={styles.heroSkill}
      >
        <img src={hero.skills[0].img} alt="" />
      </button>
      <p className={styles.skillCost}>
        {hero.skills[0].data.costEnergy} <TbHexagonLetterE style={{ marginLeft: 2 }} size={20} />
      </p>
    </div>
  );
};

export default ActiveSkill;
