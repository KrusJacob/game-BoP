import { motion } from "framer-motion";
import HeroBar from "./HeroBar";
import styles from "./styles.module.css";
import { useGameStore } from "@/store/gameStore";
import { IHero } from "@/types/hero.types";
import { IEnemy } from "@/types/enemy.types";
import EnemyBar from "./EnemyBar";

interface Props {
  hero: IHero;
  enemy: IHero | IEnemy | null;
}

const WrapperBar = () => {
  // const heroHP = useGameStore((state) => state.hero?.HP);
  // const heroMaxHP = useGameStore((state) => state.hero?.getters.getMaxHp());
  // const heroBarrier = useGameStore((state) => state.hero?.barrier);
  // const enemyHP = useGameStore((state) => state.enemy?.HP);
  // const enemyMaxHP = useGameStore((state) => state.enemy?.getters.getMaxHp());
  const enemy = useGameStore((state) => state.enemy);

  // console.log("render WrapperBar");

  return (
    <div className={styles.wrapper}>
      <HeroBar />
      {enemy && (
        <>
          <motion.span
            animate={{ opacity: [1, 0.4, 1], scale: [1.5, 1.2, 1.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            VS
          </motion.span>
          <EnemyBar />
        </>
      )}
    </div>
  );
};

export default WrapperBar;
