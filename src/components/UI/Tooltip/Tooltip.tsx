import { ReactNode, useState } from "react";
import styles from "./styles.module.css";

interface Props {
  children: ReactNode;
  title: string;
}

const Tooltip = ({ children, title }: Props) => {
  const [isShow, setShow] = useState(false);

  return (
    <>
      <div className={styles.tooltip}>{isShow && <div>{title}</div>}</div>
      <div onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
        {children}
      </div>
    </>
  );
};

export default Tooltip;
