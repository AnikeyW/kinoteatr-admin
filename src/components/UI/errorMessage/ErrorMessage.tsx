import React, { FC } from "react";
import styles from "./ErrorMessage.module.scss";

interface Props {
  message: string;
}

const ErrorMessage: FC<Props> = ({ message }) => {
  return <div className={styles.root}>{message}</div>;
};

export default ErrorMessage;
