import { IAttackInfo, IHero } from "./types/hero.types";
import { ALL_HEROES } from "./constants/hero";
import HeroList from "./components/Hero/HeroList/HeroList";
import Header from "./components/Header/Header";
import { motion } from "framer-motion";
import DoorLayout from "./layout/DoorLayout";
import GameArea from "./components/Game/GameArea/GameArea";
import { useGameStore } from "./store/gameStore";
import { registerAllSkills } from "./constants/skill/heroes";
import { useSkillUpgradeStore } from "./store/skillUpgradeStore";
import { useSkillTextStore } from "./store/skillTextStore";
import { useBattleTextStore } from "./store/battleTextStore";
import { battleText } from "./constants/text";
import { getUpgradeSkills } from "./constants/initStats";

function App() {
  const hero = useGameStore((state) => state.hero);
  const setHero = useGameStore((state) => state.setHero);
  const setUpgradeSkills = useSkillUpgradeStore((state) => state.setUpgradeSkills);

  const addSkill = useSkillTextStore((state) => state.addSkill);
  const addText = useBattleTextStore((state) => state.addText);
  console.log("App render");

  const chooseHero = (hero: IHero) => {
    hero.update = function () {
      setHero(this);
    };
    hero.update();
    hero.pushSkillText = function (text: string) {
      addSkill(text);
    };
    battleText.pushTextBattle = function (info: IAttackInfo) {
      addText(info);
    };
    registerAllSkills(hero.skills);
    setUpgradeSkills(getUpgradeSkills(hero.name));
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
