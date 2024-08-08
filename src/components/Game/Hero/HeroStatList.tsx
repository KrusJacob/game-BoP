import styles from "./styles.module.css";
import HeroStatItem from "./HeroStatItem";
import { GiBrain, GiMuscleUp, GiWalkingBoot } from "react-icons/gi";
import { Dispatch, SetStateAction, useState } from "react";
import { IHero } from "@/types/hero.types";
import { IconType } from "react-icons";
import Button from "@/components/UI/Button/Button";

const statsList: typeStatItem[] = [
  {
    name: "Сила",
    Icon: GiMuscleUp,
    className: styles.power,
    // key: "power",
  },
  {
    name: "Ловкость",
    Icon: GiWalkingBoot,
    className: styles.agility,
    // key: "agility",
  },
  {
    name: "Интеллект",
    Icon: GiBrain,
    className: styles.intellect,
    // key: "intellect",
  },
];

export interface typeStatItem {
  name: string;
  Icon: IconType;
  className: string;
  //   key: string;
}

interface Props {
  totalPoint: number;
  setTotalPoint: Dispatch<SetStateAction<number>>;
  hero: IHero;
  getFinishPoints: (value: any) => void;
}

const HeroStatList = ({ totalPoint, setTotalPoint, hero, getFinishPoints }: Props) => {
  const [powerPoint, setPowerPoint] = useState(0);
  const [agilityPoint, setAgilityPoint] = useState(0);
  const [intellectPoint, setIntellectPoint] = useState(0);

  const onSubmit = () => {
    getFinishPoints({ powerPoint, agilityPoint, intellectPoint });
    setPowerPoint(0);
    setAgilityPoint(0);
    setIntellectPoint(0);
  };

  return (
    <>
      <div className={styles.statWpapper}>
        <HeroStatItem
          item={statsList[0]}
          value={hero.getters.getPower()}
          totalPoint={totalPoint}
          setTotalPoint={setTotalPoint}
          point={powerPoint}
          setPoint={setPowerPoint}
        />
        <HeroStatItem
          item={statsList[1]}
          value={hero.getters.getAgility()}
          totalPoint={totalPoint}
          setTotalPoint={setTotalPoint}
          point={agilityPoint}
          setPoint={setAgilityPoint}
        />
        <HeroStatItem
          item={statsList[2]}
          value={hero.getters.getIntellect()}
          totalPoint={totalPoint}
          setTotalPoint={setTotalPoint}
          point={intellectPoint}
          setPoint={setIntellectPoint}
        />
      </div>
      <div style={{ margin: "0 auto" }}>
        <Button onClick={onSubmit}>Потвердить</Button>
      </div>
    </>
  );
};

export default HeroStatList;
