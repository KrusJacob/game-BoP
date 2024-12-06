import { ReactNode } from "react";
import styles from "./styles.module.css";

interface Props {
  children: ReactNode;
}

const Badge = ({ children }: Props) => {
  return <div className={styles.badge}>{children}</div>;
};

export default Badge;
