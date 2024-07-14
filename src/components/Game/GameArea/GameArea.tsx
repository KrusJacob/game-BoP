import HeroCard from "@/components/Hero/HeroCard/HeroCard";
import { IHero } from "@/types/hero.types";
import WrapperBar from "@/components/Hero/HeroBars/WrapperBar";
import styles from "./styles.module.css";
import GameField from "../GameField/GameField";

import { useGameStore } from "@/store/gameStore";

interface Props {
  hero: IHero;
}

const GameArea = ({ hero }: Props) => {
  const enemy = useGameStore((state) => state.enemy);

  return (
    <div>
      <WrapperBar />
      <div className={styles.gameArea}>
        <HeroCard hero={hero} isChoosed />
        <GameField />
        {enemy && <HeroCard hero={enemy} />}
      </div>
    </div>
  );
};

export default GameArea;
