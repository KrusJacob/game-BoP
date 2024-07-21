import HeroCard from "@/components/Hero/HeroCard/HeroCard";
import { IHero } from "@/types/hero.types";
import WrapperBar from "@/components/Hero/HeroBars/WrapperBar";
import styles from "./styles.module.css";
import GameField from "../GameField/GameField";

import { useGameStore } from "@/store/gameStore";
import Button from "@/components/UI/Button/Button";
import { FaSkullCrossbones } from "react-icons/fa";
import OverLay from "@/layout/OverLay";

interface Props {
  hero: IHero;
}

const GameArea = ({ hero }: Props) => {
  const enemy = useGameStore((state) => state.enemy);
  const heroIsDeath = useGameStore((state) => state.hero?.status.death);

  return (
    <>
      {hero && <WrapperBar hero={hero} enemy={enemy} />}
      <div className={styles.gameArea}>
        <HeroCard hero={hero} isChoosed />
        <GameField />
        {enemy && <HeroCard hero={enemy} />}
      </div>
      {heroIsDeath && <GameOver />}
    </>
  );
};

const GameOver = () => {
  return (
    <OverLay>
      <div className={styles.gameOverWrapper}>
        <h3>GAME OVER</h3>
        <p>
          Вы проиграли <FaSkullCrossbones />
        </p>
        <Button onClick={() => window.location.reload()}>OK</Button>
      </div>
    </OverLay>
  );
};

export default GameArea;
