import { IHero } from "@/types/hero.types";
import { ReactNode, createContext, useContext, useState } from "react";

interface IHeroContext {
  hero: IHero;
  setHero: (hero: IHero) => void;
  enemy: IHero | undefined;
  setEnemy: (enemy: IHero) => void;
}

export const HeroContext = createContext<IHeroContext | undefined>(undefined);

const HeroProvider = ({ children }: { children: ReactNode }) => {
  const [hero, setHero] = useState<IHero>({} as IHero);
  const [enemy, setEnemy] = useState<IHero | undefined>();

  const onSetHero = (hero: IHero) => {
    setHero(hero);
  };

  const onSetEnemy = (enemy: IHero) => {
    setEnemy(enemy);
  };

  return (
    <HeroContext.Provider value={{ hero, setHero: onSetHero, enemy, setEnemy: onSetEnemy }}>
      {children}
    </HeroContext.Provider>
  );
};

export const useHeroContext = () => {
  const context = useContext(HeroContext);

  if (!context) {
    throw new Error("context error");
  }

  return context;
};

export default HeroProvider;
