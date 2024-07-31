import React, { ChangeEvent, FC } from "react";
import styles from "./MyInput.module.scss";

interface Props {
  type: string;
  placeholder: string;
  name?: string;
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const MyInput: FC<Props> = (props) => {
  return <input className={styles.root} {...props} />;
};

export default MyInput;
