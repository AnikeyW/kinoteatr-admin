"use client";
import React, { FC } from "react";
import styles from "./AddSeries.module.scss";
import MyButton, { VariantsBtn } from "@/components/UI/myButton/MyButton";
import Image from "next/image";
import { Select } from "antd";
import FileUpload from "@/components/UI/fileUploud/FileUpload";
import MyInput from "@/components/UI/myInput/MyInput";
import ErrorMessage from "@/components/UI/errorMessage/ErrorMessage";
import { useAddSeries } from "@/hooks/useAddSeries";
import { useGetCountriesList } from "@/hooks/useGetCountriesList";
import { useGetGenresList } from "@/hooks/useGetGenresList";
import MyTextArea from "@/components/UI/myTextArea/MyTextArea";
import { MdOutlineRemoveCircle } from "react-icons/md";

interface Props {
  closeModal: () => void;
}

const AddSeries: FC<Props> = ({ closeModal }) => {
  const { data, actions } = useAddSeries(closeModal);
  const { countries, isLoadingCountries } = useGetCountriesList();
  const { genres, isLoadingGenres } = useGetGenresList();

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
            value={data.seriesData.title}
            onChange={(e) => actions.changeSeriesDataHandler(e, "title")}
          />
        </div>

        <div className={styles.input}>
          <span>Slug:</span>
          <MyInput
            type={"text"}
            placeholder={"Slug"}
            value={data.seriesData.slug}
            onChange={(e) => actions.changeSeriesDataHandler(e, "slug")}
          />
        </div>

        <div className={styles.input}>
          <span>Год выхода:</span>
          <MyInput
            type={"number"}
            placeholder={"Год выхода"}
            value={data.seriesData.releaseYear}
            onChange={(e) => actions.changeSeriesDataHandler(e, "releaseYear")}
          />
        </div>

        <div className={styles.input}>
          <span>Рейтинг кинопоиска:</span>
          <MyInput
            type={"number"}
            placeholder={"Рейтинг Кинопоиска"}
            value={data.seriesData.rateKinopoisk}
            onChange={(e) =>
              actions.changeSeriesDataHandler(e, "rateKinopoisk")
            }
          />
        </div>

        <div className={styles.input}>
          <span>Рейтинг IMDB:</span>
          <MyInput
            type={"number"}
            placeholder={"Рейтинг IMDB"}
            value={data.seriesData.rateImdb}
            onChange={(e) => actions.changeSeriesDataHandler(e, "rateImdb")}
          />
        </div>

        <div className={styles.input}>
          <span>Качество:</span>
          <Select
            defaultValue={1080}
            style={{ width: 120 }}
            onChange={actions.onSelectQualityHandler}
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
        </div>

        <div className={styles.input}>
          <span>Страна:</span>
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Выбери страны"
            defaultValue={data.seriesData.countries}
            onChange={actions.onSelectCountryHandler}
            loading={isLoadingCountries}
            options={countries.map((country) => ({
              value: country,
              label: country,
            }))}
          />
        </div>

        <div className={styles.input}>
          <span>Жанры:</span>
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Выбери жанры"
            defaultValue={data.seriesData.genres}
            onChange={actions.onSelectGenresHandler}
            loading={isLoadingGenres}
            options={genres.map((genre) => ({
              value: genre,
              label: genre,
            }))}
          />
        </div>

        {data.seriesData.description.map((textarea, index) => (
          <div className={styles.input} key={index}>
            <MyTextArea
              value={data.seriesData.description[index]}
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

        <div className={styles.addBtn}>
          <MyButton
            onClick={actions.addSeriesHandler}
            variant={VariantsBtn.ACTION}
            disabled={data.isLoading}
          >
            {data.isLoading ? "Добавление..." : "Добавить сериал"}
          </MyButton>
        </div>

        {data.error && <ErrorMessage message={data.error} />}
      </div>
    </div>
  );
};

export default AddSeries;
