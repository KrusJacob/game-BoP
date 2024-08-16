import { attackInfo } from "@/types/hero.types";
import styles from "./styles.module.css";
import React, { memo } from "react";
import cn from "classnames";
import { motion } from "framer-motion";
import { BsLightningFill } from "react-icons/bs";

const TextItem = memo(({ item }: { item: attackInfo }) => {
  return (
    <motion.div
      initial={{ x: item.type === "hero" ? "-100%" : "100%" }}
      animate={{ x: 0 }}
      className={cn(styles.textItem, {
        [styles.textHero]: item.type === "hero",
        [styles.textEnemy]: item.type === "enemy",
      })}
    >
      <p>
        {item.isEvade ? (
          "Промах"
        ) : (
          <>
            {item.type === "hero" ? `Вы нанесли ` : `Противник нанес `}
            <span>{item.damage}</span>
            {item.isCritical && <BsLightningFill />}
            {" урона"}
          </>
        )}
      </p>
    </motion.div>
  );
});

export default TextItem;
