import styles from "./styles.module.css";
import Button from "@/components/UI/Button/Button";
import { locationItem } from "@/types/location.types";

interface Props {
  disabled: boolean;
  location: locationItem;
  reqLevel: number;
  onSelectLocation: (location: locationItem["name"]) => void;
}

const LocationItem = ({ location, reqLevel, disabled, onSelectLocation }: Props) => {
  return (
    <div className={styles.locationItem}>
      <img src={location.img} alt={location.img} />
      <p>{location.label}</p>
      <span>{`(${reqLevel}+ уровень)`}</span>
      <Button onClick={() => onSelectLocation(location.name)} disabled={disabled}>
        Отправиться
      </Button>
    </div>
  );
};

export default LocationItem;
