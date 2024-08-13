import Button from "@/components/UI/Button/Button";
import styles from "./styles.module.css";
import { useGameStore } from "@/store/gameStore";
import img from "@assets/bg_home.jpg";
import { BiSolidCoinStack } from "react-icons/bi";
import { GiFlowerEmblem } from "react-icons/gi";
import Tooltip from "@/components/UI/Tooltip/Tooltip";
import { TabsWithFight } from "../GameField/GameField";
import { TbSquareRoundedPlusFilled } from "react-icons/tb";

const HomeField = ({ onSetTab }: { onSetTab: (tab: TabsWithFight) => void }) => {
  const heroResources = useGameStore((state) => state.hero?.resources);

  const onGoWay = () => {
    onSetTab("Бой");
  };

  return (
    <div className={styles.homeField}>
      <>
        <img src={img} alt={img} />
        <div className={styles.header}>
          <Tooltip size="small" title="Золото">
            <BiSolidCoinStack />
            {heroResources?.gold}
          </Tooltip>

          <Tooltip size="small" title="Очки характеристик">
            <TbSquareRoundedPlusFilled />
            {heroResources?.parameterPoints}
          </Tooltip>

          <Tooltip size="small" title="Очки навыков">
            <GiFlowerEmblem />
            {heroResources?.skillPoints}
          </Tooltip>
        </div>
        <Button className={styles.castle}>В Замок</Button>
        <Button onClick={onGoWay} className={styles.way}>
          В Путь
        </Button>
        <Button className={styles.tomb}>В Гробницу</Button>
      </>
    </div>
  );
};

export default HomeField;
