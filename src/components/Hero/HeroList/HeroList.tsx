import { IHero, heroType } from "@/types/hero.types";

import HeroCard from "../HeroCard/HeroCard";
import styles from "./heroList.module.css";
import { HeroClass } from "@/constants/fn";

interface Props {
  heroes: readonly heroType[];
  chooseHero: (hero: IHero) => void;
}

const HeroList = ({ heroes, chooseHero }: Props) => {
  return (
    <div className={styles.heroList}>
      {heroes.map((hero) => {
        const newHero = new HeroClass(hero);
        return <HeroCard key={hero} hero={newHero} chooseHero={chooseHero} />;
      })}
    </div>
  );
};

export default HeroList;
