import { shopItemType } from "@/types/shop.types";
import styles from "./styles.module.css";
import Button from "@/components/UI/Button/Button";
import { AnimatePresence, motion } from "framer-motion";

const ShopSelectItem = ({ item, onByeItem }: { item: shopItemType | undefined; onByeItem: () => void }) => {
  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ x: "110%" }}
          exit={{ x: "110%" }}
          animate={{ x: 0 }}
          transition={{ ease: "backOut" }}
          className={styles.shopSelectItem}
        >
          <div className={styles.info}>
            <img src={item.img} alt={item.name} />
            <div>
              <p>{item.cost} золото</p>
              <Button onClick={onByeItem}>Купить</Button>
            </div>
          </div>
          <div>
            <p className={styles.name}>{item.name}</p>
            <p className={styles.descr}>{item.descr()}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ShopSelectItem;
