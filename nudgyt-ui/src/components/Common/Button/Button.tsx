import React from "react";
import styles from "./Button.module.css";

interface IProps {
  children: React.ReactNode;
  style?: object;
  className?: string;
  disabled?: boolean;
  clicked?: () => void;
}

const Button: React.FC<IProps> = ({
  children,
  style,
  className,
  disabled,
  clicked,
}) => {
  return (
    <button
      disabled={disabled}
      className={`${styles.btn} ${className}`}
      style={style}
      onClick={clicked}
    >
      {children}
    </button>
  );
};

export default Button;
