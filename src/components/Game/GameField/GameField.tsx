import Button from "@/components/UI/Button/Button";
import TalentField from "../Talent/TalentField";
import styles from "./styles.module.css";
import { useState } from "react";
import SkillField from "../Skill/SkillField";
import ShopField from "../Shop/ShopField";
import HomeField from "../Home/HomeField";
import TestField from "../Test/TestField";
import FightField from "../Fight/FightField";

const GameField = () => {
  return (
    <div className={styles.gameField}>
      <Tabs />
    </div>
  );
};

//

type TabsField = "Главная" | "Навыки" | "Таланты" | "Maгазин" | "Test";
interface ITabsBtn {
  label: TabsField;
}
const TabsBtns: ITabsBtn[] = [
  {
    label: "Главная",
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
  {
    label: "Test",
  },
];

export type TabsWithFight = TabsField | "Бой";

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
          <Button disabled={tab === "Бой"} onClick={() => onChangeTab(btn.label)} key={btn.label} size="small">
            {btn.label}
          </Button>
        ))}
      </div>
      {tab === "Главная" && <HomeField onSetTab={onSetTab} />}
      {tab === "Таланты" && <TalentField />}
      {tab === "Навыки" && <SkillField />}
      {tab === "Maгазин" && <ShopField />}
      {tab === "Test" && <TestField />}
      {tab === "Бой" && <FightField onSetTab={onSetTab} />}
    </>
  );
};

export default GameField;
