"use client";
import React, { FC, ReactNode, MouseEvent } from "react";
import styles from "./Modal.module.scss";

interface Props {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const Modal: FC<Props> = ({ children, isOpen, onClose }) => {
  const contentClickHandler = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <>
      {isOpen ? (
        <div className={styles.root} onClick={onClose}>
          <div className={styles.content} onClick={contentClickHandler}>
            {children}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
