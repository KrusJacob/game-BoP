import { VERSION_APP } from "@/constants/setup";
import styles from "./header.module.css";
import logo from "@assets/logo.png";
import GuideInfo from "../../Game/Guide/GuideInfo";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={logo} alt="logo" />
      </div>
      <h3 className={styles.title}>
        The battle of professions <span>v:{VERSION_APP}</span>
      </h3>
      <GuideInfo />
    </header>
  );
};

export default Header;
