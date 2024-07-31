"use client";
import React, { ChangeEvent, FC, useEffect, useRef } from "react";
import styles from "./MyTextArea.module.scss";

interface Props {
  value: string;
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const MyTextArea: FC<Props> = ({ value, placeholder, onChange }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const autoResize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + 5 + "px";
    }
  };

  const changeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    autoResize();
    onChange(e);
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      autoResize();
    }
  }, []);

  return (
    <textarea
      className={styles.root}
      ref={textareaRef}
      value={value}
      placeholder={placeholder}
      onChange={changeHandler}
    ></textarea>
  );
};

export default MyTextArea;
