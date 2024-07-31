"use client";
import React, { FC } from "react";
import styles from "./EditInfo.module.scss";
import FileUpload from "@/components/UI/fileUploud/FileUpload";
import EditableInput from "@/components/UI/editableInput/EditableInput";
import EditableTextarea from "@/components/UI/editableTextarea/EditableTextarea";
import { ISeries } from "@/types/Series.types";
import MyButton, { VariantsBtn } from "@/components/UI/myButton/MyButton";
import Image from "next/image";
import { useEditSeries } from "@/hooks/useEditSeries";
import { Select } from "antd";
import { useGetCountriesList } from "@/hooks/useGetCountriesList";
import { useGetGenresList } from "@/hooks/useGetGenresList";
import { isJSON } from "@/utils";
import { MdOutlineRemoveCircle } from "react-icons/md";
import AntConfigProvider from "@/components/UI/antConfigProvider/AntConfigProvider";

interface Props {
  seriesDetails: ISeries;
}

const EditInfo: FC<Props> = ({ seriesDetails }) => {
  const { data, actions } = useEditSeries(seriesDetails);
  const { countries, isLoadingCountries } = useGetCountriesList();
  const { genres, isLoadingGenres } = useGetGenresList();

  return (
    <div className={styles.root}>
      <div className={styles.posterBox}>
        <div className={styles.poster}>
          <Image
            src={
              data.posterPreviewSrc
                ? data.posterPreviewSrc
                : process.env.NEXT_PUBLIC_SERVER_URL_STATIC +
                  seriesDetails.poster
            }
            alt={seriesDetails.title}
            fill={true}
            sizes={"200px"}
            priority={true}
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

      <div className={styles.seriesDetails}>
        <div className={styles.seriesTitle}>
          <EditableInput
            label={""}
            value={data.seriesData.title}
            onChange={(e) => actions.changeSeriesDataHandler(e, "title")}
          />
        </div>

        <div className={styles.input}>
          <EditableInput
            label={"Slug: "}
            value={data.seriesData.slug}
            onChange={(e) => actions.changeSeriesDataHandler(e, "slug")}
          />
        </div>

        <div className={styles.input}>
          <EditableInput
            label={"Год выхода: "}
            value={data.seriesData.releaseYear}
            onChange={(e) => actions.changeSeriesDataHandler(e, "releaseYear")}
          />
        </div>

        <div className={styles.input}>
          <EditableInput
            label={"Рейтинг Кинопоиск: "}
            value={data.seriesData.rateKinopoisk.toString()}
            onChange={(e) =>
              actions.changeSeriesDataHandler(e, "rateKinopoisk")
            }
          />
        </div>

        <div className={styles.input}>
          <EditableInput
            label={"Рейтинг IMDB: "}
            value={data.seriesData.rateImdb.toString()}
            onChange={(e) => actions.changeSeriesDataHandler(e, "rateImdb")}
          />
        </div>

        <div className={styles.input}>
          <span>Качество:</span>
          <AntConfigProvider>
            <Select
              value={data.seriesData.quality}
              style={{ width: 120 }}
              onChange={actions.onSelectQualityHandler}
              variant={"outlined"}
              options={[
                { value: 240, label: 240 },
                { value: 320, label: 320 },
                { value: 480, label: 480 },
                { value: 720, label: 720 },
                { value: 1080, label: 1080 },
                { value: 1440, label: 1440 },
                { value: 2160, label: 2160 },
                { value: 4320, label: 4320 },
              ]}
            />
          </AntConfigProvider>
        </div>

        <div className={styles.input}>
          <span>Страна:</span>
          <AntConfigProvider>
            <Select
              mode="multiple"
              allowClear
              style={{ minWidth: "200px" }}
              placeholder="Выбери страны"
              defaultValue={data.seriesData.countries}
              onChange={actions.onSelectCountryHandler}
              loading={isLoadingCountries}
              options={countries.map((country) => ({
                value: country,
                label: country,
              }))}
            />
          </AntConfigProvider>
        </div>

        <div className={styles.input}>
          <span>Жанры:</span>
          <AntConfigProvider>
            <Select
              mode="multiple"
              allowClear
              style={{ width: "200px" }}
              placeholder="Выбери жанры"
              defaultValue={data.seriesData.genres}
              onChange={actions.onSelectGenresHandler}
              loading={isLoadingGenres}
              options={genres.map((genre) => ({
                value: genre,
                label: genre,
              }))}
            />
          </AntConfigProvider>
        </div>

        <div className={styles.description}>
          <small>Описание:</small>
          {isJSON(data.seriesData.description) ? (
            <>
              {JSON.parse(data.seriesData.description).map(
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
              value={data.seriesData.description}
              onChange={(e) =>
                actions.changeSeriesDataHandler(e, "description")
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
            disabled={data.isChangesSaving}
          >
            {data.isChangesSaving ? "Сохранение..." : "Сохранить"}
          </MyButton>
        </div>
      </div>
    </div>
  );
};

export default EditInfo;
