import { IHero, heroName } from "@/types/hero.types";
import HeroCard from "../HeroCard/HeroCard";
import styles from "./heroList.module.css";
import { HeroClass } from "@/constants/inital/class";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

interface Props {
  heroes: readonly heroName[];
  chooseHero: (hero: IHero) => void;
}

const HeroList = ({ heroes, chooseHero }: Props) => {
  return (
    <Swiper
      breakpoints={{
        512: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4,
        },
      }}
      navigation
      modules={[Navigation]}
      className={styles.heroList}
    >
      {heroes.map((hero) => {
        const newHero = new HeroClass(hero);
        return (
          <SwiperSlide key={hero}>
            <HeroCard hero={newHero} chooseHero={chooseHero} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default HeroList;
