import Button from "@/components/UI/Button/Button";
import TalentField from "../Talent/TalentField";
import styles from "./styles.module.css";
import { useState } from "react";
import SkillField from "../Skill/SkillField";
import ShopField from "../Shop/ShopField";
import HomeField from "../Home/HomeField";
import TestField from "../Test/TestField";
import FightField from "../Fight/FightField";
import HeroField from "../Hero/HeroField";
import TombField from "../Tomb/TombField";
import LocationField from "../Location/LocationField";

const GameField = () => {
  return (
    <div className={styles.gameField}>
      <Tabs />
    </div>
  );
};

//

type TabsField = "Главная" | "Герой" | "Навыки" | "Таланты" | "Maгазин" | "Test";
interface ITabsBtn {
  label: TabsField;
}
const TabsBtns: ITabsBtn[] = [
  {
    label: "Главная",
  },
  {
    label: "Герой",
  },
  {
    label: "Навыки",
  },
  {
    label: "Таланты",
  },
  {
    label: "Maгазин",
  },
  // {
  //   label: "Test",
  // },
];

export type TabsWithFight = TabsField | "Локация" | "Бой" | "Гробница";

const Tabs = () => {
  const [tab, setTab] = useState<TabsWithFight>("Главная");

  const onChangeTab = (label: TabsField) => {
    setTab(label);
  };

  const onSetTab = (tab: TabsWithFight) => {
    setTab(tab);
  };

  return (
    <>
      <div className={styles.tabs}>
        {TabsBtns.map((btn) => (
          <Button
            className={tab === btn.label ? styles.active : ""}
            disabled={tab === "Бой" || tab === "Локация"}
            onClick={() => onChangeTab(btn.label)}
            key={btn.label}
            size="small"
          >
            {btn.label}
          </Button>
        ))}
      </div>
      {tab === "Главная" && <HomeField onSetTab={onSetTab} />}
      {tab === "Герой" && <HeroField />}
      {tab === "Таланты" && <TalentField />}
      {tab === "Навыки" && <SkillField />}
      {tab === "Maгазин" && <ShopField />}
      {tab === "Test" && <TestField />}
      {tab === "Бой" && <FightField onSetTab={onSetTab} />}
      {tab === "Локация" && <LocationField onSetTab={onSetTab} />}
      {tab === "Гробница" && <TombField onSetTab={onSetTab} />}
    </>
  );
};

export default GameField;
