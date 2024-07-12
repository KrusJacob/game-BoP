import { useState } from "react";
import { HeroClass } from "./constants/fn";
import { IHero, heroType } from "./types/hero.types";
import HeroCard from "./components/Hero/HeroCard/HeroCard";
import { ALL_HEROES } from "./constants/hero";
import HeroList from "./components/Hero/HeroList/HeroList";
import Header from "./components/Header/Header";
import { motion } from "framer-motion";

import DoorLayout from "./layout/DoorLayout";
import WrapperBar from "./components/Hero/HeroBars/WrapperBar";
import GameArea from "./components/Game/GameArea/GameArea";

function App() {
  const [hero, setHero] = useState<null | IHero>(null);

  const chooseHero = (hero: IHero) => {
    // const newHero = new HeroClass(hero);
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
