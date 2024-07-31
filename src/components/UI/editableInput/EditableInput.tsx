import React, {
  ChangeEvent,
  KeyboardEvent,
  FC,
  memo,
  useState,
  useRef,
  useEffect,
} from "react";
import styles from "./EditableInput.module.scss";

interface Props {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const EditableInput: FC<Props> = ({ label, value, onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const keyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsEditMode(false);
    }
  };

  useEffect(() => {
    if (isEditMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditMode]);

  return (
    <>
      {isEditMode ? (
        <div>
          <span className={styles.label}>{label}</span>
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={onChange}
            onBlur={() => setIsEditMode(false)}
            onKeyDown={keyDownHandler}
            className={styles.input}
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
        </div>
      )}
    </>
  );
};

export default memo(EditableInput);
