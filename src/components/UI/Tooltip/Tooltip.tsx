import { ReactNode, useState } from "react";
import styles from "./styles.module.css";
import cn from "classnames";

interface Props {
  children: ReactNode;
  title: string;
  descr?: string;
  descr2?: string;
  size?: "default" | "small";
  anchor?: "top" | "left" | "bot" | "rigth";
}

const Tooltip = ({ children, title, size, descr, descr2, anchor = "top" }: Props) => {
  const [isShow, setShow] = useState(false);

  return (
    <>
      <div
        id="tooltip"
        className={cn(styles.tooltip, {
          [styles.small]: size === "small",
          [styles.top]: anchor === "top",
          [styles.bot]: anchor === "bot",
          [styles.right]: anchor === "rigth",
          [styles.left]: anchor === "left",
        })}
      >
        {isShow && (
          <div>
            <b>{title}</b>
            {descr && <p>{descr}</p>}
            {descr2 && <p style={{ opacity: 0.5 }}>{descr2}</p>}
          </div>
        )}
      </div>
      <div onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
        {children}
      </div>
    </>
  );
};

export default Tooltip;
