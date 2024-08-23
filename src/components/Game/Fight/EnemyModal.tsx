import Button from "@/components/UI/Button/Button";
import OverLay from "@/layout/OverLay";
import { IEnemy } from "@/types/enemy.types";
import { IHero } from "@/types/hero.types";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { BiSolidCoinStack } from "react-icons/bi";
import { GiFlowerEmblem } from "react-icons/gi";
import { TabsWithFight } from "../GameField/GameField";
import styles from "./styles.module.css";
import { HERO_REWARD } from "@/constants/resources";

interface Props {
  onSetTab: (tab: TabsWithFight) => void;
  setEnemy: (enemy: IEnemy | IHero | null) => void;
  enemy: IEnemy | null;
}

const EnemyModal = ({ onSetTab, setEnemy, enemy }: Props) => {
  const [isBtnEnable, setBtnEnable] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setBtnEnable(true);

      return () => clearTimeout(timeout);
    }, 500);
  }, []);

  return (
    <OverLay>
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "backInOut" }}
        className={styles.enemyDownWrapper}
      >
        <h3>Вы победили!</h3>
        {enemy && (
          <div className={styles.resources}>
            <p>+ {HERO_REWARD.exp} Опыта</p>
            <p>
              + {HERO_REWARD.gold} <BiSolidCoinStack />
            </p>
            <p>
              + {HERO_REWARD.skillPoints} <GiFlowerEmblem />
            </p>
            {HERO_REWARD.drop && (
              <p>
                + {HERO_REWARD.drop?.value} {HERO_REWARD.drop.label}
              </p>
            )}
          </div>
        )}
        <Button
          disabled={!isBtnEnable}
          onClick={() => {
            onSetTab("Главная");
            setEnemy(null);
          }}
        >
          OK
        </Button>
      </motion.div>
    </OverLay>
  );
};

export default EnemyModal;
