import { IAttackInfo } from "@/types/hero.types";
import styles from "./styles.module.css";
import React, { memo } from "react";
import cn from "classnames";
import { motion } from "framer-motion";
import { BsLightningFill } from "react-icons/bs";
import { PiSpiralLight } from "react-icons/pi";

const TextItem = memo(({ item }: { item: IAttackInfo }) => {
  // console.log("TextItem");
  return (
    <motion.div
      initial={{ x: item.type === "hero" ? "-100%" : "100%" }}
      animate={{ x: 0 }}
      className={cn(styles.textItem, {
        [styles.textHero]: item.type === "hero",
        [styles.textEnemy]: item.type === "enemy",
      })}
    >
      <p>{item.isMiss ? "Промах" : <TextInfo item={item} />}</p>
    </motion.div>
  );
});

const TextInfo = ({ item }: { item: IAttackInfo }) => {
  if (item.isStunned) {
    return (
      <>
        Оглушен
        <PiSpiralLight color="gold" />
      </>
    );
  }
  if (item.type === "hero") {
    return (
      <>
        Вы нанесли {item.damage}
        {item.isCritical && <BsLightningFill />} урона;
      </>
    );
  }
  if (item.type === "enemy") {
    return (
      <>
        Противник нанес {item.damage}
        {item.isCritical && <BsLightningFill />} урона;
      </>
    );
  }
};

export default TextItem;
