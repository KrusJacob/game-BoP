import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./styles.module.css";
import cn from "classnames";

interface Props {
  children: ReactNode;
  onClick?: () => void;
  size?: ButtonSize;
}

type ButtonSize = "small" | "default" | "big";

const Button = ({
  children,
  onClick,
  size,
  disabled,
  className,
}: Props & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      disabled={disabled}
      className={cn(styles.button, className, {
        [styles.small]: size === "small",
        [styles.big]: size === "big",
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
