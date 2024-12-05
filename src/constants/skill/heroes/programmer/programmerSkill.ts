import { CHANCE_CRITICAL_DAMAGE, CHANCE_EVADE } from "@/constants/setup";
import { IEnemy } from "@/types/enemy.types";
import { heroSkills, IHero } from "@/types/hero.types";
import { getRandom } from "@/utils/getRandom";
import { applyPowerSkill, goMagicalDamage, healHeroOfSkill } from "../../utils";
import { goPosionDmg } from "@/constants/func/fight";
import { getPercent } from "@/utils/getPercent";

const SKILLS_PROGRAMMER: heroSkills[] = [
  {
    label: "Утечка данных",
    descr: function () {
      return `Наносит противнику магический урон - ${this.data.modifier}% от его макс.запаса здоровья, герой исцеляется на 100% от нанесенного урона. Стоимость - ${this.data.costEnergy} энергии`;
    },
    img: "/assets/skill/skill_programmer_1.png",
    data: {
      costEnergy: 200,
      modifier: 8,
    },
    trigger: "active",
    fn: function (this: heroSkills[], hero: IHero, target: IHero | IEnemy) {
      const data = this[0].data;
      hero.pushSkillText(this[0].label);
      let damage = getPercent(target.getters.getMaxHp(), data.modifier);
      // goDamage(hero, target, magicalDamageAction(damage));
      const damagedValue = goMagicalDamage(hero, target, damage);
      healHeroOfSkill(hero, damagedValue, 0, false);
    },
  },
  {
    label: "Брандмауэр",
    descr: function () {
      return `В Начале боя активирует барьер, поглощающий входящий урон. Обьем барьера зависит от интеллекта и силы умений`;
    },
    img: "/assets/skill/skill_programmer_2.png",
    data: {
      modifier: 2.5,
      barrierValue: 100,
      power_2_1: {
        isOpen: false,
      },
      power_2_2: {
        isOpen: false,
        modifierHeal: 0,
      },
      power_2_3: {
        isOpen: false,
        modifierDamage: 0,
      },
    },
    trigger: "inBeginFight",
    fn: function (this: heroSkills[], hero: IHero, target: IEnemy) {
      hero.pushSkillText(this[1].label);

      const data = this[1].data;

      const mainStat = data.power_2_1.isOpen ? hero.getters.getPower() : hero.getters.getIntellect();
      let totalBarrier = mainStat * data.modifier + data.barrierValue;
      totalBarrier = applyPowerSkill(totalBarrier, hero.getters.getPowerSkill());
      console.log(totalBarrier);
      hero.getBarrier(totalBarrier);

      if (data.power_2_2.isOpen) {
        const healValue = Math.floor(hero.getters.getPower() * data.power_2_2.modifierHeal);
        healHeroOfSkill(hero, healValue, 0);
      }
      if (data.power_2_3.isOpen) {
        const damage = getPercent(hero.getters.getMaxHp(), data.power_2_3.modifierDamage);
        // goDamage(hero, target, magicalDamageAction(damage));
        goMagicalDamage(hero, target, damage);
      }
    },
  },
  {
    label: "Вирус",
    descr: function () {
      return `При каждой атаке есть ${this.data.chance}% шанс заразить противника вирусом, не чаще чем раз в ${this.data.cooldown} секунд. Максимум ${this.data.maxLayer} слоя. Каждый слой снижает наносимый урон противника на ${this.data.modifier}% и длиться ${this.data.duration} секунд`;
    },
    img: "/assets/skill/skill_programmer_3.png",
    data: {
      chance: 25,
      maxLayer: 3,
      modifier: 10,
      applyedLayer: 0,
      duration: 6,
      cooldown: 1.5,
      isCooldown: false,
      power_4_1: {
        isOpen: false,
        modifierDamage: 0,
      },
      intellect_2_2: {
        isOpen: false,
        modifier: 0,
      },
    },
    trigger: "afterInitiatorAttack",
    fn: function (this: heroSkills[], hero: IHero, target: IHero | IEnemy) {
      const data = this[2].data;
      if (data.isCooldown) {
        return;
      }
      const chance = getRandom(1, 100);

      if (chance <= data.chance && data.applyedLayer < data.maxLayer) {
        hero.pushSkillText(this[2].label);
        target.buffs.incDamage(-data.modifier, data.duration);
        data.applyedLayer += 1;
        data.isCooldown = true;

        target.status.virus.stack += 1;
        console.log(data.applyedLayer, "layer +");

        setTimeout(() => {
          data.isCooldown = false;
        }, data.cooldown * 1000);

        if (data.intellect_2_2.isOpen) {
          let damage = getPercent(target.getters.getMaxHp(), data.intellect_2_2.modifier);
          damage = applyPowerSkill(damage, hero.getters.getPowerSkill());
          goPosionDmg(hero, target, damage, data.duration);
        }

        if (data.power_4_1.isOpen) {
          const damage = Math.floor(hero.getters.getPower() * data.power_4_1.modifierDamage);
          // goDamage(hero, target, magicalDamageAction(damage));
          goMagicalDamage(hero, target, damage);
        }

        setTimeout(() => {
          target.status.virus.stack -= 1;
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
    img: "/assets/skill/chances.png",
    data: {
      chanceCritDamage: CHANCE_CRITICAL_DAMAGE,
      chanceEvade: CHANCE_EVADE,
    },
  },
];

export default SKILLS_PROGRAMMER;
