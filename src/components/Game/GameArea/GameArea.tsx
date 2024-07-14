import HeroCard from "@/components/Hero/HeroCard/HeroCard";
import { IHero } from "@/types/hero.types";
import WrapperBar from "@/components/Hero/HeroBars/WrapperBar";
import styles from "./styles.module.css";
import GameFiled from "../GameField/GameFiled";

interface Props {
  hero: IHero;
}

const GameArea = ({ hero }: Props) => {
  return (
    <div>
      <WrapperBar />
      <div className={styles.gameArea}>
        <HeroCard hero={hero} isChoosed />
        <GameFiled />
        <HeroCard hero={hero} />
      </div>
    </div>
  );
};

export default GameArea;
