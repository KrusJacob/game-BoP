import styles from "./header.module.css";
import logo from "@assets/logo.jfif";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={logo} alt="logo" />
      </div>
      <h3 className={styles.title}>The battle of professions</h3>
    </header>
  );
};

export default Header;
