import { ReactNode, useState } from "react";
import styles from "./styles.module.css";
import cn from "classnames";

interface Props {
  children: ReactNode;
  title: string;
  size?: "default" | "small";
}

const Tooltip = ({ children, title, size }: Props) => {
  const [isShow, setShow] = useState(false);

  return (
    <>
      <div
        className={cn(styles.tooltip, {
          [styles.small]: size === "small",
        })}
      >
        {isShow && <div>{title}</div>}
      </div>
      <div onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
        {children}
      </div>
    </>
  );
};

export default Tooltip;
