import { motion } from "framer-motion";
import HeroBar from "./HeroBar";
import styles from "./styles.module.css";
import { useGameStore } from "@/store/gameStore";

const WrapperBar = () => {
  const hero = useGameStore((state) => state.hero);
  const enemy = useGameStore((state) => state.enemy);

  return (
    <div className={styles.wrapper}>
      {hero && <HeroBar target={hero} />}

      {enemy && (
        <>
          <motion.span
            animate={{ opacity: [1, 0.4, 1], scale: [1.5, 1.2, 1.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            VS
          </motion.span>
          <HeroBar target={enemy} isEnemy />
        </>
      )}
    </div>
  );
};

export default WrapperBar;
