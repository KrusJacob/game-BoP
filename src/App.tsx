import { useState } from "react";
import { HeroClass } from "./constants/fn";
import { IHero, heroType } from "./types/hero.types";
import HeroCard from "./components/Hero/HeroCard/HeroCard";
import { ALL_HEROES } from "./constants/hero";
import HeroList from "./components/Hero/HeroList/HeroList";
import Header from "./components/Header/Header";
import { motion } from "framer-motion";
import logo from "@assets/logo.jfif";

function App() {
  const [hero, setHero] = useState<null | IHero>(null);

  const chooseHero = (hero: heroType) => {
    const newHero = new HeroClass(hero);
    setHero(newHero);
  };

  return (
    <main>
      <motion.div
        animate={{ opacity: 0, display: "none" }}
        transition={{ duration: 0.5, delay: 2 }}
        className="logo"
      >
        <img src={logo} alt="logo" />
      </motion.div>
      <motion.div
        animate={{ y: [0, -10, -1000] }}
        transition={{ duration: 1.4, delay: 2, times: [0, 0.4, 1.3] }}
        className="top"
      ></motion.div>
      <Header />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.7 }}
        className="container"
      >
        {!hero && <HeroList heroes={ALL_HEROES} chooseHero={chooseHero} />}
        {hero && <HeroCard hero={hero} />}
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident accusantium, inventore corrupti iusto
          adipisci dolorum sed error, ratione minus quasi fuga delectus! Quae odio accusantium aperiam ratione eos
          perspiciatis perferendis.
        </p>
      </motion.div>
      <motion.div
        animate={{ y: [0, 10, 1000] }}
        transition={{ duration: 1.4, delay: 2, times: [0, 0.4, 1.3] }}
        className="bottom"
      ></motion.div>
    </main>
  );
}

export default App;
