import { IHero, heroSkills } from "@/types/hero.types";
import styles from "./styles.module.css";
import HeroBagItem from "../HeroBag/HeroBagItem";
import { bagItemType } from "@/types/shop.types";

const HeroPanel = ({ hero, onClickSkill }: { hero: IHero; onClickSkill: () => void }) => {
  // const skillCooldown = heroSkills[0].value.count;

  const onUseItem = (item: bagItemType) => {
    item.fn(hero);
  };

  return (
    <div className={styles.heroPanel}>
      <div className={styles.heroSkills}>
        <button disabled={true} onClick={onClickSkill} className={styles.heroSkill}>
          <img src={hero.skills[0].img} alt="" />
        </button>
        {/* {skillCooldown > 0 && <span>{skillCooldown}</span>} */}
      </div>
      <div className={styles.heroBag}>
        {hero.resources.bag.map((item, i) => {
          if (i < 3) {
            return (
              <div key={i} onClick={() => onUseItem(item)}>
                <HeroBagItem item={item} />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default HeroPanel;
