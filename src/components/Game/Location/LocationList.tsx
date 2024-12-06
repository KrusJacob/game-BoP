import { LOCATIONS } from "@/constants/location";
import LocationItem from "./LocationItem";
import styles from "./styles.module.css";
import { locationItem } from "@/types/location.types";

const LocationList = ({
  heroLevel,
  onSelectLocation,
}: {
  heroLevel: number;
  onSelectLocation: (location: locationItem["name"]) => void;
}) => {
  return (
    <div className={styles.locationWpapper}>
      <div className={styles.locationList}>
        {LOCATIONS.map((location) => (
          <LocationItem
            location={location}
            onSelectLocation={onSelectLocation}
            disabled={heroLevel < location.reqLevel}
            reqLevel={location.reqLevel}
            key={location.name}
          />
        ))}
      </div>
    </div>
  );
};

export default LocationList;
