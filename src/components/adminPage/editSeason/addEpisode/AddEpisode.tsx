"use client";
import React, { FC } from "react";
import styles from "./AddEpisode.module.scss";
import FileUpload from "@/components/UI/fileUploud/FileUpload";
import { IEpisode } from "@/types/Series.types";
import MyButton, { VariantsBtn } from "@/components/UI/myButton/MyButton";
import { useAddEpisode } from "@/hooks/useAddEpisode";
import MyInput from "@/components/UI/myInput/MyInput";
import ErrorMessage from "@/components/UI/errorMessage/ErrorMessage";
import MyTextArea from "@/components/UI/myTextArea/MyTextArea";
import { MdOutlineRemoveCircle } from "react-icons/md";

interface Props {
  episodes: IEpisode[];
  seasonId: number;
  closeModal: () => void;
}

const AddEpisode: FC<Props> = ({ episodes, seasonId, closeModal }) => {
  const { data, actions } = useAddEpisode(episodes, seasonId, closeModal);

  return (
    <div className={styles.root}>
      <div className={styles.files}>
        <div className={styles.changeVideoBtn}>
          <MyButton>
            <FileUpload
              setFile={actions.onChangeVideo}
              accept={"video/*"}
              name={"video"}
            >
              Выбрать видео
            </FileUpload>
          </MyButton>
          {data.episodeData.video && <div>{data.episodeData.video.name}</div>}
        </div>
      </div>

      <div className={styles.info}>
        <div className={styles.input}>
          <MyInput
            type="text"
            placeholder={"Название"}
            value={data.episodeData.title}
            onChange={(e) => actions.changeEpisodeDataHandler(e, "title")}
          />
        </div>

        <div className={styles.input}>
          <span>Порядковый номер:</span>
          <MyInput
            type="number"
            placeholder={"Порядковый номер"}
            value={data.episodeData.order}
            onChange={(e) => actions.changeEpisodeDataHandler(e, "order")}
          />
        </div>

        <div className={styles.input}>
          <input
            type="date"
            value={data.episodeData.releaseDate}
            onChange={(e) => actions.changeEpisodeDataHandler(e, "releaseDate")}
          />
        </div>

        {data.episodeData.description.map((textarea, index) => (
          <div className={styles.input} key={index}>
            <MyTextArea
              value={data.episodeData.description[index]}
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

        <MyButton onClick={actions.addParagraphHandler}>
          Добавить параграф
        </MyButton>

        <div className={styles.bottom}>
          {data.uploadProgress.isUploading && (
            <div className={styles.progress}>
              <div>{data.uploadProgress.percent}%</div>
              <progress
                value={data.uploadProgress.percent}
                max="100"
              ></progress>
            </div>
          )}
          <MyButton
            onClick={actions.addEpisodeHandler}
            variant={VariantsBtn.ACTION}
            disabled={data.uploadProgress.isUploading}
          >
            {data.uploadProgress.isUploading ? "Добавление" : "Добавить Эпизод"}
          </MyButton>
        </div>

        {data.error && <ErrorMessage message={data.error} />}
      </div>
    </div>
  );
};

export default AddEpisode;
