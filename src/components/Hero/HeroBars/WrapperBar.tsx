import { motion } from "framer-motion";
import HeroBar from "./HeroBar";
import styles from "./styles.module.css";
import { useHeroContext } from "@/context/HeroContext";

const WrapperBar = () => {
  const { enemy, hero } = useHeroContext();

  return (
    <div className={styles.wrapper}>
      <HeroBar hp={hero.HP} barrier={hero.barrier} />

      {enemy && (
        <>
          <motion.span
            animate={{ opacity: [1, 0.4, 1], scale: [1.5, 1.2, 1.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            VS
          </motion.span>
          <HeroBar hp={enemy?.HP || 0} barrier={enemy?.barrier} isEnemy />
        </>
      )}
    </div>
  );
};

export default WrapperBar;
