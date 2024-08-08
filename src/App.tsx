import { IHero } from "./types/hero.types";
import { ALL_HEROES } from "./constants/hero";
import HeroList from "./components/Hero/HeroList/HeroList";
import Header from "./components/Header/Header";
import { motion } from "framer-motion";
import DoorLayout from "./layout/DoorLayout";

import GameArea from "./components/Game/GameArea/GameArea";
import { useGameStore } from "./store/gameStore";
import { registerAllSkills } from "./constants/fn";

function App() {
  const hero = useGameStore((state) => state.hero);
  const setHero = useGameStore((state) => state.setHero);

  const chooseHero = (hero: IHero) => {
    hero.update = function () {
      setHero(this);
    };
    // hero.setters.incAttack(40);
    // hero.setters.incMaxHp(200);
    hero.update();
    registerAllSkills(hero.skills);
  };

  return (
    <main>
      <DoorLayout>
        <Header />
        <motion.div
          // initial={{ opacity: 0 }}
          // animate={{ opacity: 1 }}
          // transition={{ duration: 0.8, delay: 2.7 }}
          className="container"
        >
          {hero ? <GameArea hero={hero} /> : <HeroList heroes={ALL_HEROES} chooseHero={chooseHero} />}
        </motion.div>
      </DoorLayout>
    </main>
  );
}

export default App;
