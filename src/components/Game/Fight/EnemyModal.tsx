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
import TalentItem from "../Talent/TalentItem";
import { useBattleTextStore } from "@/store/battleTextStore";
import { TbSquareRoundedPlusFilled } from "react-icons/tb";

interface Props {
  onSetTab: (tab: TabsWithFight) => void;
  setEnemy: (enemy: IEnemy | IHero | null) => void;
  enemy: IEnemy | null;
}

const EnemyModal = ({ onSetTab, setEnemy, enemy }: Props) => {
  const [isBtnEnable, setBtnEnable] = useState(false);
  const clearText = useBattleTextStore((state) => state.clearText);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setBtnEnable(true);
    }, 500);

    return () => {
      clearText();
      clearTimeout(timeout);
    };
  }, []);

  return (
    <OverLay>
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "backInOut", delay: 0.2 }}
        className={styles.enemyDownWrapper}
      >
        <h3>Вы победили!</h3>
        {enemy && (
          <div className={styles.resources}>
            <div>
              <p>+ {HERO_REWARD.exp} Опыта</p>
              <p>
                + {HERO_REWARD.gold} <BiSolidCoinStack />
              </p>
              <p>
                + {HERO_REWARD.parameterPoints} <TbSquareRoundedPlusFilled />
              </p>
              <p>
                + {HERO_REWARD.skillPoints} <GiFlowerEmblem />
              </p>
            </div>

            {HERO_REWARD.talent && (
              <div className={styles.talent}>
                <p>Получен талант</p>
                <TalentItem item={HERO_REWARD.talent} />
              </div>
            )}
          </div>
        )}
        <Button
          disabled={!isBtnEnable}
          onClick={() => {
            onSetTab("Главная");
            setEnemy(null);
            HERO_REWARD.talent = null;
          }}
        >
          OK
        </Button>
      </motion.div>
    </OverLay>
  );
};

export default EnemyModal;
