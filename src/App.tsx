import { IHero } from "./types/hero.types";
import { ALL_HEROES } from "./constants/hero";
import HeroList from "./components/Hero/HeroList/HeroList";
import Header from "./components/Header/Header";
import { motion } from "framer-motion";
import DoorLayout from "./layout/DoorLayout";

import GameArea from "./components/Game/GameArea/GameArea";
import { useGameStore } from "./store/gameStore";

function App() {
  const hero = useGameStore((state) => state.hero);
  const setHero = useGameStore((state) => state.setHero);

  const chooseHero = (hero: IHero) => {
    setHero(hero);
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
          {/* <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident accusantium, inventore corrupti
            iusto adipisci dolorum sed error, ratione minus quasi fuga delectus! Quae odio accusantium aperiam
            ratione eos perspiciatis perferendis.
          </p> */}
        </motion.div>
      </DoorLayout>
    </main>
  );
}

export default App;
