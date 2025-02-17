import { VERSION_APP } from "@/constants/setup";
import styles from "./header.module.css";
import logo from "@assets/game-logo.png";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={logo} alt="logo" />
      </div>
      <h3 className={styles.title}>
        The battle of professions <span>v:{VERSION_APP}</span>
      </h3>
    </header>
  );
};

export default Header;
