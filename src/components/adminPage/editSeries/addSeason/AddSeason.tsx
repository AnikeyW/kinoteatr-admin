"use client";
import React, { FC } from "react";
import styles from "./AddSeason.module.scss";
import FileUpload from "@/components/UI/fileUploud/FileUpload";
import { ISeasonWithoutEpisodes } from "@/types/Series.types";
import MyButton, { VariantsBtn } from "@/components/UI/myButton/MyButton";
import MyInput from "@/components/UI/myInput/MyInput";
import Image from "next/image";
import { useAddSeason } from "@/hooks/useAddSeason";
import ErrorMessage from "@/components/UI/errorMessage/ErrorMessage";
import MyTextArea from "@/components/UI/myTextArea/MyTextArea";
import { MdOutlineRemoveCircle } from "react-icons/md";

interface Props {
  seriesId: number;
  seasons: ISeasonWithoutEpisodes[];
  closeModal: () => void;
}

const AddSeason: FC<Props> = ({ seriesId, seasons, closeModal }) => {
  const { data, actions } = useAddSeason(seasons, seriesId, closeModal);

  return (
    <div className={styles.root}>
      <div className={styles.posterBox}>
        {!!data.posterPreviewSrc && (
          <div className={styles.poster}>
            <Image src={data.posterPreviewSrc} alt={""} fill={true} />
          </div>
        )}

        <div className={styles.changePosterBtn}>
          <MyButton>
            <FileUpload
              setFile={actions.onChangePicture}
              accept={"image/*"}
              name={"poster"}
            >
              Выбрать постер
            </FileUpload>
          </MyButton>
        </div>
      </div>

      <div className={styles.form}>
        <div className={styles.input}>
          <MyInput
            type={"text"}
            placeholder={"Название"}
            value={data.seasonData.title}
            onChange={(e) => actions.changeSeasonDataHandler(e, "title")}
          />
        </div>

        <div className={styles.input}>
          <span>Порядковый номер:</span>
          <MyInput
            type={"number"}
            placeholder={"Порядковый номер"}
            value={data.seasonData.order}
            onChange={(e) => actions.changeSeasonDataHandler(e, "order")}
          />
        </div>

        {data.seasonData.description.map((textarea, index) => (
          <div className={styles.input} key={index}>
            <MyTextArea
              value={data.seasonData.description[index]}
              onChange={(e) => {
                actions.changeDescriptionHandler(e, index);
              }}
            />
            <div
              className={styles.deleteParagraphBtn}
              title={"Удалить параграф"}
              onClick={() => actions.deleteParagraphHandler(index)}
            >
              <MdOutlineRemoveCircle />
            </div>
          </div>
        ))}

        <div className={styles.addParagraphBtn}>
          <MyButton onClick={actions.addParagraphHandler}>
            Добавить параграф
          </MyButton>
        </div>

        <div className={styles.addSeasonBtn}>
          <MyButton
            onClick={actions.addSeasonHandler}
            variant={VariantsBtn.ACTION}
            disabled={data.isLoading}
          >
            {data.isLoading ? "Добавление..." : "Добавить сезон"}
          </MyButton>
        </div>

        {data.error && <ErrorMessage message={data.error} />}
      </div>
    </div>
  );
};

export default AddSeason;
