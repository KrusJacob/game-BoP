import { motion } from "framer-motion";
import HeroBar from "./HeroBar";
import styles from "./styles.module.css";

const WrapperBar = () => {
  return (
    <div className={styles.wrapper}>
      <HeroBar />
      <motion.span
        animate={{ opacity: [1, 0.4, 1], scale: [1.5, 1.2, 1.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        VS
      </motion.span>
      <HeroBar isEnemy />
    </div>
  );
};

export default WrapperBar;
