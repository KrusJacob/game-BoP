import { IHero } from "@/types/hero.types";
import styles from "./styles.module.css";
import { memo } from "react";
import PanelActiveItems from "./PanelActiveItems";
import ActiveSkill from "./ActiveSkill";

interface Props {
  hero: IHero;
  onClickSkill?: () => void;
}

const HeroPanel = memo(() => {
  return (
    <div className={styles.heroPanel}>
      <ActiveSkill />
      <PanelActiveItems />
    </div>
  );
});

export default HeroPanel;
