import { LOCATIONS } from "@/constants/location";
import LocationItem from "./LocationItem";
import styles from "./styles.module.css";
import { locationItem } from "@/types/location.types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";
import { useRef } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";

interface Props {
  heroLevel: number;
  onSelectLocation: (location: locationItem["name"]) => void;
}
const LocationList = ({ heroLevel, onSelectLocation }: Props) => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className={styles.locationWpapper}>
      <button onClick={() => swiperRef.current?.slidePrev()} className={styles.sliderArrow}>
        <GrPrevious size={32} />
      </button>
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        slidesPerView={2.1}
        className={styles.locationList}
      >
        {LOCATIONS.map((location) => (
          <SwiperSlide key={location.name}>
            <LocationItem
              location={location}
              onSelectLocation={onSelectLocation}
              disabled={heroLevel < location.reqLevel}
              reqLevel={location.reqLevel}
              key={location.name}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <button onClick={() => swiperRef.current?.slideNext()} className={styles.sliderArrow}>
        <GrNext size={32} />
      </button>
    </div>
  );
};

export default LocationList;
