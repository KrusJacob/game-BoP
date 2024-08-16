import { IHero, heroSkills } from "@/types/hero.types";
import styles from "./styles.module.css";
import HeroBagItem from "../HeroBag/HeroBagItem";
import { bagItemType } from "@/types/shop.types";
import { IEnemy } from "@/types/enemy.types";

interface Props {
  hero: IHero;
  enemy: IHero | IEnemy;
  onClickSkill: () => void;
}

const HeroPanel = ({ hero, enemy, onClickSkill }: Props) => {
  // const skillCooldown = heroSkills[0].value.count;

  const onUseItem = (item: bagItemType) => {
    if (!item.empty) {
      console.log("item", item);
      item.fn(hero, enemy);
    }
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
        {hero.resources.bagActivePanel.map((item, i) => {
          return (
            <div key={i} onClick={() => onUseItem(item)}>
              <HeroBagItem item={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HeroPanel;
