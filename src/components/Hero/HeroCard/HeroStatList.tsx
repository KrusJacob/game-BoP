import React from "react";
import { FaHeart } from "react-icons/fa";
import { GiMuscleUp, GiWalkingBoot, GiBrain, GiSpinningSword, GiWizardStaff } from "react-icons/gi";
import { MdShield } from "react-icons/md";
import { PiSwordLight } from "react-icons/pi";
import HeroStat from "./HeroStat";
import { useGameStore } from "@/store/gameStore";
import { IHero } from "@/types/hero.types";
import { IEnemy } from "@/types/enemy.types";

const HeroStatList = ({ hero }: { hero: IHero | IEnemy }) => {
  const maxHp = useGameStore((state) => state[hero.type]?.getters.getMaxHp());
  const power = useGameStore((state) => state[hero.type]?.getters.getPower());
  const agility = useGameStore((state) => state[hero.type]?.getters.getAgility());
  const intellect = useGameStore((state) => state[hero.type]?.getters.getIntellect());
  const def = useGameStore((state) => state[hero.type]?.getters.getDef());
  const attack = useGameStore((state) => state[hero.type]?.getters.getAttack());
  const attackSpeed = useGameStore((state) => state[hero.type]?.getters.getAttackSpeed());
  const powerSkill = useGameStore((state) => state[hero.type]?.getters.getPowerSkill());

  return (
    <ul>
      <HeroStat Icon={FaHeart} value={hero.getters.getMaxHp()}>
        Здоровье
      </HeroStat>
      <HeroStat Icon={GiMuscleUp} value={hero.getters.getPower()}>
        Cила
      </HeroStat>
      <HeroStat Icon={GiWalkingBoot} value={hero.getters.getAgility()}>
        Ловкость
      </HeroStat>
      <HeroStat Icon={GiBrain} value={hero.getters.getIntellect()}>
        Интеллект
      </HeroStat>
      <HeroStat Icon={PiSwordLight} value={hero.getters.getAttack()}>
        Атака
      </HeroStat>
      <HeroStat Icon={MdShield} value={hero.getters.getDef()}>
        Защита
      </HeroStat>
      <HeroStat Icon={GiSpinningSword} value={hero.getters.getAttackSpeed()}>
        Скорость атаки
      </HeroStat>
      <HeroStat
        title={"Влияет на урон способностей и исцеление"}
        Icon={GiWizardStaff}
        value={hero.getters.getPowerSkill()}
      >
        Сила умений
      </HeroStat>
    </ul>
  );
};

export default HeroStatList;
