import React, { FC, ReactNode } from "react";
import styles from "./MyButton.module.scss";
import cl from "classnames";

export enum VariantsBtn {
  DEFAULT = "default",
  ACTION = "action",
  ERROR = "error",
}

interface Props {
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: (args: any) => void;
  variant?: VariantsBtn;
  disabled?: boolean;
}

const MyButton: FC<Props> = ({
  children,
  type,
  onClick,
  variant = VariantsBtn.DEFAULT,
  disabled,
}) => {
  return (
    <button
      className={cl(styles.root, {
        [styles.action]: variant === VariantsBtn.ACTION,
        [styles.error]: variant === VariantsBtn.ERROR,
      })}
      onClick={onClick}
      type={type ? type : "button"}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default MyButton;
