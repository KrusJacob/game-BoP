import React, { useState } from "react";
import { FaHeart, FaInfoCircle } from "react-icons/fa";
import styles from "./styles.module.css";
import {
  GiMuscleUp,
  GiWalkingBoot,
  GiBrain,
  GiSpinningSword,
  GiWizardStaff,
  GiBoltShield,
  GiFlowerEmblem,
} from "react-icons/gi";
import { BiSolidCoinStack } from "react-icons/bi";
import { TbSquareRoundedPlusFilled } from "react-icons/tb";
import { PiSwordLight } from "react-icons/pi";
import { MdShield } from "react-icons/md";

const GUIDE_INFO = {
  stats: [
    {
      name: "Здоровье",
      Icon: FaHeart,
      descr: "Определяет количество очков жизни героя",
    },
    {
      name: "Сила",
      Icon: GiMuscleUp,
      descr: "Влияет на максимальное здоровье героя",
    },
    {
      name: "Ловкость",
      Icon: GiWalkingBoot,
      descr: "Увеличивает скорость атаки",
    },
    {
      name: "Интеллект",
      Icon: GiBrain,
      descr: "Усиливает магические способности",
    },
    {
      name: "Aтака",
      Icon: PiSwordLight,
      descr: "Урон, наносимый обычной атакой",
    },
    {
      name: "Защита",
      Icon: MdShield,
      descr: "Снижает получаемый физический урон",
    },
    {
      name: "Maгическая защита",
      Icon: GiBoltShield,
      descr: "Снижает получаемый магический урон",
    },
    {
      name: "Скорость атаки",
      Icon: GiSpinningSword,
      descr: "Влияет на частоту атак",
    },
    {
      name: "Сила умений",
      Icon: GiWizardStaff,
      descr: "Определяет мощность способностей и эффективность исцеления",
    },
  ],
};

const GuideInfo = () => {
  const [isShow, setShow] = useState(false);
  return (
    <div>
      <FaInfoCircle
        cursor={"pointer"}
        onClick={() => setShow(!isShow)}
        color={isShow ? "#FFD700" : "#F0F0F0"}
        // onMouseLeave={() => setShow(false)}
        size={30}
      />
      {isShow && (
        <div className={styles.guideInfo}>
          <b className={styles.title}>Руководство по игре "The Battle of Professions"</b>
          <p>
            Добро пожаловать в мир <b>The Battle of Professions — RPG roguelike игру</b>, где герои символизируют
            разные профессии и имеют уникальные способности. В этом руководстве вы узнаете, как начать игру,
            развивать своего героя, побеждать врагов и становиться сильнее!
          </p>
          <br />
          <div>
            <b>1. Начало игры: Выбор героя.</b> Перед началом приключения игроку предлагается выбрать героя. У
            каждого героя есть следующие характеристики:
            <ul className={styles.list}>
              {GUIDE_INFO.stats.map((item, i) => (
                <li key={i}>
                  <b>
                    <item.Icon /> {item.name}:
                  </b>{" "}
                  {item.descr}
                </li>
              ))}
            </ul>
          </div>
          <br />
          <div>
            <b>2. Игровой процесс</b>
            <ul className={styles.list}>
              <li>
                <b>Выбор локации: </b> Исследуйте разные территории и отправляйтесь в бой!
              </li>
              <li>
                <b>Автоматический бой: </b>
                Бой происходит автоматически, но игрок может использовать активный навык героя и предметы для
                влияния на исход. Активные навыки тратят энергию героя, которую он получает в бою.
              </li>
              <li>
                <b>Боссы: </b>
                Убивайте врагов в локациях, чтобы призвать босса в Гробнице
              </li>
              <li>
                <b>Уникальные встречи: </b>В локациях мы можете встретить уникальных существ, которые могут щедро
                вознаградить. Но какой ценой?...
              </li>
              <li>
                <b>Награды: </b> За победу вы получите опыт и монеты <BiSolidCoinStack />
              </li>
            </ul>
          </div>
          <br />
          <div>
            <b>3. Развитие героя</b>
            <ul className={styles.list}>
              <li>
                <b>
                  <TbSquareRoundedPlusFilled /> Очки характеристик:
                </b>{" "}
                За повышение уровня герой получает очки, которые можно распределить между силой, ловкостью и
                интеллектом.
              </li>
              <li>
                <b>
                  <GiFlowerEmblem /> Очки навыков:{" "}
                </b>
                Используйте их для улучшения способностей героя. Развивайтесь в одной из трёх веток — Сила,
                Ловкость, Интеллект — чтобы открывать новые усиления.
              </li>
              <li>
                <b>Случайные таланты: </b> После каждого уровня герой получает пассивный талант.
              </li>
            </ul>
          </div>
          <br />
          <div>
            <b>4. Снаряжение и предметы</b>
            <ul className={styles.list}>
              <li>
                <b>Магазин: </b> Приобретайте расходники за монеты <BiSolidCoinStack />, которые можно использовать
                в бою
              </li>
              <li>
                <b>Инвентарь: </b>
                Расходники попадают в инвентарь героя. В бой можно взять не более 3 предметов.
              </li>
            </ul>
          </div>
          <br />
          <b>Приятного путешествия! Игра находится в разработке, поэтому могут присутствовать баги. </b>
        </div>
      )}
    </div>
  );
};

export default GuideInfo;
