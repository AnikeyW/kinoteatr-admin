import React, {
  ChangeEvent,
  FC,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./EditableTextarea.module.scss";

interface Props {
  label: string;
  value: string;
  placeholder?: string;
  defaultText?: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const EditableTextarea: FC<Props> = ({
  label,
  value,
  onChange,
  placeholder,
  defaultText,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const keyDownHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      setIsEditMode(false);
    }
  };

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
    if (isEditMode && textareaRef.current) {
      textareaRef.current.focus();
      autoResize();
    }
  }, [isEditMode]);

  return (
    <>
      {isEditMode ? (
        <div>
          <span className={styles.label}>{label}</span>
          <textarea
            ref={textareaRef}
            value={value}
            onChange={changeHandler}
            onBlur={() => setIsEditMode(false)}
            onKeyDown={keyDownHandler}
            className={styles.textarea}
            placeholder={placeholder}
          />
        </div>
      ) : (
        <div
          onDoubleClick={() => setIsEditMode(true)}
          className={styles.title}
          title={"DoubleClick for edit"}
        >
          <span className={styles.label}>{label}</span>
          {value}
          {value === "" && defaultText !== "" ? defaultText : ""}
        </div>
      )}
    </>
  );
};

export default EditableTextarea;
