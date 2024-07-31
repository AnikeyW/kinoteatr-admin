"use client";
import React, { FC } from "react";
import styles from "./EditInfoSeason.module.scss";
import { ISeason } from "@/types/Series.types";
import FileUpload from "@/components/UI/fileUploud/FileUpload";
import EditableInput from "@/components/UI/editableInput/EditableInput";
import EditableTextarea from "@/components/UI/editableTextarea/EditableTextarea";
import Image from "next/image";
import MyButton, { VariantsBtn } from "@/components/UI/myButton/MyButton";
import { useEditSeason } from "@/hooks/useEditSeason";
import { isJSON } from "@/utils";
import { MdOutlineRemoveCircle } from "react-icons/md";

interface Props {
  seasonDetails: ISeason;
}

const EditInfoSeason: FC<Props> = ({ seasonDetails }) => {
  const { data, actions } = useEditSeason(seasonDetails);

  return (
    <div className={styles.root}>
      <div className={styles.posterBox}>
        <div className={styles.poster}>
          <Image
            src={
              data.posterPreviewSrc
                ? data.posterPreviewSrc
                : process.env.NEXT_PUBLIC_SERVER_URL_STATIC +
                  seasonDetails.poster
            }
            alt={seasonDetails.title}
            fill={true}
            sizes={"240px"}
          />
        </div>

        <div className={styles.changePoster}>
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

      <div className={styles.details}>
        <div className={styles.title}>
          <EditableInput
            label={""}
            value={data.seasonData.title}
            onChange={(e) => actions.changeSeasonDataHandler(e, "title")}
          />
        </div>

        <div className={styles.order}>
          <EditableInput
            label={"Порядковый номер: "}
            value={data.seasonData.order}
            onChange={(e) => actions.changeSeasonDataHandler(e, "order")}
          />
        </div>

        <div className={styles.description}>
          <small>Описание:</small>
          {isJSON(data.seasonData.description) ? (
            <>
              {JSON.parse(data.seasonData.description).map(
                (paragraph: string, index: number) => (
                  <div
                    style={{ display: "flex" }}
                    className={styles.paragraph}
                    key={index}
                  >
                    <div className={styles.textArea}>
                      <EditableTextarea
                        key={index}
                        label={""}
                        value={paragraph}
                        placeholder={`Параграф ${index + 1}`}
                        defaultText={
                          paragraph === "" ? `Параграф ${index + 1}` : ""
                        }
                        onChange={(e) =>
                          actions.changeDescriptionHandler(e, index)
                        }
                      />
                    </div>

                    <div
                      onClick={() => actions.deleteParagraphHandler(index)}
                      className={styles.deleteParagraphBtn}
                    >
                      <MdOutlineRemoveCircle
                        title={`Удалить параграф ${index + 1}`}
                      />
                    </div>
                  </div>
                ),
              )}
            </>
          ) : (
            <EditableTextarea
              label={""}
              value={data.seasonData.description}
              onChange={(e) =>
                actions.changeSeasonDataHandler(e, "description")
              }
            />
          )}
          <MyButton onClick={actions.addParagraphHandler}>
            Добавить параграф
          </MyButton>
        </div>

        <div className={styles.saveBtn}>
          <MyButton
            variant={VariantsBtn.ACTION}
            onClick={actions.saveChangesHandler}
            disabled={data.isLoading}
          >
            {data.isLoading ? "Сохранение..." : "Сохранить"}
          </MyButton>
        </div>
      </div>
    </div>
  );
};

export default EditInfoSeason;
