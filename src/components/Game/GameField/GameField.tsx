import Button from "@/components/UI/Button/Button";
import TalentField from "../Talent/TalentField";
import styles from "./styles.module.css";
import { useState } from "react";
import SkillField from "../Skill/SkillField";
import ShopField from "../Shop/ShopField";
import HomeField from "../Home/HomeField";

const GameField = () => {
  return (
    <div className={styles.gameFiled}>
      <Tabs />
    </div>
  );
};

//

type TabsField = "Главная" | "Навыки" | "Таланты" | "Maгазин";
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
];

const Tabs = () => {
  const [tab, setTab] = useState<TabsField>("Главная");

  const onChangeTab = (label: TabsField) => {
    setTab(label);
  };

  return (
    <>
      <div className={styles.tabs}>
        {TabsBtns.map((btn) => (
          <Button onClick={() => onChangeTab(btn.label)} key={btn.label} size="small">
            {btn.label}
          </Button>
        ))}
      </div>
      {tab === "Главная" && <HomeField />}
      {tab === "Таланты" && <TalentField />}
      {tab === "Навыки" && <SkillField />}
      {tab === "Maгазин" && <ShopField />}
    </>
  );
};

export default GameField;
