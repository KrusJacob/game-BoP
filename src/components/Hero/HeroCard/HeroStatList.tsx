import React from "react";
import { FaHeart } from "react-icons/fa";
import { GiMuscleUp, GiWalkingBoot, GiBrain, GiSpinningSword, GiWizardStaff, GiBoltShield } from "react-icons/gi";
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
  const magicDef = useGameStore((state) => state[hero.type]?.getters.getMagicDef());
  const attack = useGameStore((state) => state[hero.type]?.getters.getAttack());
  const attackSpeed = useGameStore((state) => state[hero.type]?.getters.getAttackSpeed());
  const powerSkill = useGameStore((state) => state[hero.type]?.getters.getPowerSkill());

  return (
    <ul>
      <HeroStat Icon={FaHeart} value={maxHp || hero.getters.getMaxHp()}>
        Здоровье
      </HeroStat>
      <HeroStat Icon={GiMuscleUp} value={power || hero.getters.getPower()}>
        Cила
      </HeroStat>
      <HeroStat Icon={GiWalkingBoot} value={agility || hero.getters.getAgility()}>
        Ловкость
      </HeroStat>
      <HeroStat Icon={GiBrain} value={intellect || hero.getters.getIntellect()}>
        Интеллект
      </HeroStat>
      <HeroStat Icon={PiSwordLight} value={attack || hero.getters.getAttack()}>
        Атака
      </HeroStat>
      <HeroStat Icon={MdShield} value={def || hero.getters.getDef()}>
        Защита
      </HeroStat>
      <HeroStat Icon={GiBoltShield} value={magicDef || hero.getters.getMagicDef()}>
        Магическая Защита
      </HeroStat>
      <HeroStat Icon={GiSpinningSword} value={attackSpeed || hero.getters.getAttackSpeed()}>
        Скорость атаки
      </HeroStat>
      <HeroStat
        title={"Влияет на урон способностей и исцеление"}
        Icon={GiWizardStaff}
        value={powerSkill || hero.getters.getPowerSkill()}
      >
        Сила умений
      </HeroStat>
    </ul>
  );
};

export default HeroStatList;
