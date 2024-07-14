import { motion } from "framer-motion";
import HeroBar from "./HeroBar";
import styles from "./styles.module.css";
import { useHeroContext } from "@/context/HeroContext";

const WrapperBar = () => {
  const { enemy, hero } = useHeroContext();

  return (
    <div className={styles.wrapper}>
      <HeroBar target={hero} />

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
