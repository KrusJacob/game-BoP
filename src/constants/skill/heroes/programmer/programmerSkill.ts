import { CHANCE_CRITICAL_DAMAGE, CHANCE_EVADE } from "@/constants/setup";
import { IEnemy } from "@/types/enemy.types";
import { heroSkills, IHero } from "@/types/hero.types";
import { getRandom } from "@/utils/getRandom";
import { applyPowerSkill, healHeroOfSkill } from "../../utils";
import { goDamage } from "@/constants/func/fight";

const SKILLS_PROGRAMMER: heroSkills[] = [
  {
    label: "",
    descr: function () {
      return `Описание способности. В разработке...`;
    },
    img: "/src/assets/skill/skill_programmer_1.png",
    data: {},
  },
  {
    label: "Брандмауэр",
    descr: function () {
      return `В Начале боя активирует барьер, поглощающий входящий урон. Обьем барьера зависит от интеллекта и силы умений`;
    },
    img: "/src/assets/skill/skill_programmer_2.png",
    data: {
      modifier: 3.5,
      barrierValue: 100,
      level_2_1: {
        isOpen: false,
      },
      level_2_2: {
        isOpen: false,
        modifierHeal: 0,
      },
    },
    trigger: "inBeginFight",
    fn: function (this: heroSkills[], hero: IHero) {
      const data = this[1].data;

      const mainStat = data.level_2_1.isOpen ? hero.getters.getPower() : hero.getters.getIntellect();
      let totalBarrier = mainStat * data.modifier + data.barrierValue;
      totalBarrier = applyPowerSkill(totalBarrier, hero.getters.getPowerSkill());
      console.log(totalBarrier);
      hero.getBarrier(totalBarrier);

      if (data.level_2_2.isOpen) {
        const healValue = Math.floor(hero.getters.getPower() * data.level_2_2.modifierHeal);
        healHeroOfSkill(hero, healValue, 0, false);
      }
    },
  },
  {
    label: "Вирус",
    descr: function () {
      return `При каждой атаке есть ${this.data.chance}% шанс заразить противника вирусом. Максимум ${this.data.maxLayer} слоя. Каждый слой снижает наносимый урон противника на ${this.data.modifier}% и длиться ${this.data.duration} секунд`;
    },
    img: "/src/assets/skill/skill_programmer_3.png",
    data: {
      chance: 25,
      maxLayer: 3,
      modifier: 15,
      applyedLayer: 0,
      duration: 6,
      level_4_1: {
        isOpen: false,
        modifierDamage: 0,
      },
    },
    trigger: "afterHeroAttack",
    fn: function (this: heroSkills[], hero: IHero, target: IHero | IEnemy) {
      const data = this[2].data;
      const chance = getRandom(1, 100);

      if (chance <= data.chance && data.applyedLayer < data.maxLayer) {
        target.buffs.incDamage(-data.modifier, data.duration);
        data.applyedLayer += 1;
        console.log(data.applyedLayer, "layer +");

        if (data.level_4_1.isOpen) {
          const damage = Math.floor(hero.getters.getPower() * data.level_4_1.modifierDamage);
          console.log(damage, "damage");
          goDamage(target, damage);
        }

        setTimeout(() => {
          data.applyedLayer -= 1;
          console.log("layer снялся");
        }, data.duration * 1000);
      }
    },
  },
  {
    label: "Техника боя",
    descr: function () {
      return `Шанс критического удара: ${this.data.chanceCritDamage}%, Шанс уклонения: ${this.data.chanceEvade}% `;
    },
    img: "/src/assets/skill/chances.png",
    data: {
      chanceCritDamage: CHANCE_CRITICAL_DAMAGE,
      chanceEvade: CHANCE_EVADE,
    },
  },
];

export default SKILLS_PROGRAMMER;
