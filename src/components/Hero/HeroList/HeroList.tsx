import { IHero, heroName } from "@/types/hero.types";

import HeroCard from "../HeroCard/HeroCard";
import styles from "./heroList.module.css";
import { HeroClass } from "@/constants/class";

interface Props {
  heroes: readonly heroName[];
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
