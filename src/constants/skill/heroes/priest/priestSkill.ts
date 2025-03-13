import { IEnemy } from "@/types/enemy.types";
import { heroSkills, IHero } from "@/types/hero.types";
import { getRandom } from "@/utils/getRandom";
import {
  applyPowerSkill,
  goHealHeroOfSkill,
  getСombatTechniquesSkill,
  goMagicalDamage,
  getHealOfSkill,
  goPureDamage,
} from "../../utils";
import { goHealTick } from "@/constants/func/fight";

const SKILLS_PRIEST: heroSkills[] = [
  {
    label: "Молитва",
    descr: function () {
      return `Накладывает барьер, поглощающий входящий урон. После чего исцеляет часть здоровья героя каждую секунду, в течение ${this.data.duration} секунд. Стоимость - ${this.data.costEnergy} энергии`;
    },
    img: "/assets/skill/skill_priest_1.png",
    data: {
      costEnergy: 80,
      duration: 4,
      healValue: 15,
      healPercent: 1,
      barrierValue: 120,
      power_1_2: {
        isOpen: false,
        modifierPower: 0,
      },
      agility_2_2: {
        isOpen: false,
        attackSpeed: 0,
      },
      intellect_2_1: {
        isOpen: false,
        modifierDef: 0,
      },
    },
    trigger: "active",
    fn: function (this: heroSkills[], hero: IHero, target: IHero | IEnemy) {
      hero.pushSkillText(this[0].label);
      const data = this[0].data;
      let totalBarrier = data.barrierValue;

      if (data.power_1_2.isOpen) totalBarrier += hero.getters.getPower() * data.power_1_2.modifierPower;
      totalBarrier += applyPowerSkill(totalBarrier, hero.getters.getPowerSkill());
      hero.getBarrier(totalBarrier);

      let heal = getHealOfSkill(hero, data.healValue, data.healPercent);
      goHealTick(hero, target, heal, 0, 1, data.duration);

      if (data.agility_2_2.isOpen) {
        hero.buffs.incAttackSpeed(data.agility_2_2.attackSpeed, data.duration);
      }
      if (data.intellect_2_1.isOpen) {
        hero.buffs.incDef(data.intellect_2_1.modifierDef, data.duration);
      }
    },
  },
  {
    label: "Искра света",
    descr: function () {
      return `Каждую секунду наносит противнику ${this.data.value} ${this.data.typeDmg} урона.`;
    },
    img: "/assets/skill/skill_priest_2.png",
    data: {
      value: 20,
      typeDmg: "магического",
      intellect_3_1: {
        isOpen: false,
      },
    },
    trigger: "inBeginFight",
    fn: function (this: heroSkills[], hero: IHero, target: IHero | IEnemy) {
      hero.pushSkillText(this[1].label);
      const data = this[1].data;
      const interval = setInterval(() => {
        if (hero.status.death || target.status.death) clearInterval(interval);
        if (data.intellect_3_1.isOpen) {
          goPureDamage(hero, target, data.value);
        } else {
          goMagicalDamage(hero, target, data.value);
        }
      }, 1000);
    },
  },
  {
    label: "Взор правосудия",
    descr: function () {
      return `При получении урона от обычной атаки противника есть ${this.data.chance}% повесить на него метку. Когда он получает ${this.data.maxMark} меток, ему наноситься чистый урон, а метки сбрасываются. Перезарядка: ${this.data.cooldownCount} с.`;
    },
    img: "/assets/skill/skill_priest_3.png",
    data: {
      chance: 35,
      maxMark: 5,
      damage: 160,
      cooldownCount: 4,
      isCooldown: false,
      intellect_2_2: {
        isOpen: false,
        heal: 0,
      },
      intellect_3_3: {
        isOpen: false,
        modifierIntellect: 0,
      },
    },
    trigger: "afterTargetAttack",
    fn: function (this: heroSkills[], hero: IHero, target: IHero | IEnemy) {
      const chance = getRandom(1, 100);
      const data = this[2].data;

      if (chance <= data.chance && !data.isCooldown) {
        hero.pushSkillText(this[2].label);
        target.status.justiceMark.stack += 1;
        if (data.intellect_2_2.isOpen) goHealHeroOfSkill(hero, data.intellect_2_2.heal, 0);
        if (target.status.justiceMark.stack >= data.maxMark) {
          let damage = data.damage;
          if (data.intellect_3_3.isOpen) {
            const bonusDamage = hero.getters.getIntellect() * data.intellect_3_3.modifierIntellect;
            damage += bonusDamage;
            goHealHeroOfSkill(hero, bonusDamage, 0);
          }
          goPureDamage(hero, target, damage);
          target.status.justiceMark.stack = 0;
          data.isCooldown = true;
          setTimeout(() => {
            data.isCooldown = false;
          }, data.cooldownCount * 1000);
        }
      }
    },
  },
  getСombatTechniquesSkill(),
];

export default SKILLS_PRIEST;
