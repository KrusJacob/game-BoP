import { motion } from "framer-motion";
import HeroBar from "./HeroBar";
import styles from "./styles.module.css";
import { useGameStore } from "@/store/gameStore";
import { IHero } from "@/types/hero.types";
import { IEnemy } from "@/types/enemy.types";

interface Props {
  hero: IHero;
  enemy: IHero | IEnemy | null;
}

const WrapperBar = ({ hero, enemy }: Props) => {
  const heroHP = useGameStore((state) => state.hero?.HP);
  const heroMaxHP = useGameStore((state) => state.hero?.baseStats.maxHp);
  const enemyHP = useGameStore((state) => state.enemy?.HP);
  const enemyMaxHP = useGameStore((state) => state.enemy?.baseStats.maxHp);

  return (
    <div className={styles.wrapper}>
      {hero && <HeroBar value={heroHP || 0} max={heroMaxHP || 0} />}
      {enemy && (
        <>
          <motion.span
            animate={{ opacity: [1, 0.4, 1], scale: [1.5, 1.2, 1.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            VS
          </motion.span>
          <HeroBar value={enemyHP || 0} max={enemyMaxHP || 0} isEnemy />
        </>
      )}
    </div>
  );
};

export default WrapperBar;
