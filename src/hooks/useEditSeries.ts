import React, { ChangeEvent, useState } from "react";
import { EditSeriesDto, seriesService } from "@/services/series.service";
import { ISeries } from "@/types/Series.types";
import { toast } from "react-hot-toast";
import { isJSON } from "@/utils";

export const useEditSeries = (seriesDetails: ISeries) => {
  const [seriesData, setSeriesData] = useState<EditSeriesDto>({
    title: seriesDetails.title,
    slug: seriesDetails.slug,
    description: seriesDetails.description,
    releaseYear: seriesDetails.releaseYear.toString(),
    rateKinopoisk: seriesDetails.rateKinopoisk,
    rateImdb: seriesDetails.rateImdb,
    quality: seriesDetails.quality,
    genres: seriesDetails.genres,
    countries: seriesDetails.countries,
    poster: seriesDetails.poster,
  });
  const [posterPreviewSrc, setPosterPreviewSrc] = useState<string>("");
  const [isChangesSaving, setIsChangesSaving] = useState(false);

  const deleteParagraphHandler = (paragraphIndex: number) => {
    const description = JSON.parse(seriesData.description);
    description.splice(paragraphIndex, 1);

    setSeriesData({
      ...seriesData,
      description: JSON.stringify(description),
    });
  };

  const changeDescriptionHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    paragraphIndex: number,
  ) => {
    const description = JSON.parse(seriesData.description);

    description[paragraphIndex] = e.target.value;
    setSeriesData({
      ...seriesData,
      description: JSON.stringify(description),
    });
  };

  const addParagraphHandler = () => {
    if (seriesData.description === "") {
      setSeriesData({
        ...seriesData,
        description: JSON.stringify([""]),
      });
      return;
    }
    if (isJSON(seriesData.description)) {
      const description = JSON.parse(seriesData.description);
      description.push("");
      setSeriesData({
        ...seriesData,
        description: JSON.stringify(description),
      });
    } else {
      toast.error("Не правильный формат");
    }
  };

  const onSelectQualityHandler = (value: number) => {
    setSeriesData({ ...seriesData, quality: value });
  };

  const onSelectGenresHandler = (value: string[]) => {
    setSeriesData({ ...seriesData, genres: value });
  };

  const onSelectCountryHandler = (value: string[]) => {
    setSeriesData({ ...seriesData, countries: value });
  };

  const onChangePicture = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSeriesData({ ...seriesData, poster: e.target.files[0] });
      if (!FileReader) return;
      const img = new FileReader();
      img.onload = () => {
        if (img.result && typeof img.result === "string") {
          setPosterPreviewSrc(img.result);
        }
      };
      img.readAsDataURL(e.target.files[0]);
    }
  };

  const changeSeriesDataHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof typeof seriesData,
  ) => {
    setSeriesData({ ...seriesData, [field]: e.target.value });
  };

  const saveChangesHandler = async () => {
    try {
      setIsChangesSaving(true);
      const updatedSeries = await seriesService.editSeries(
        seriesData,
        seriesDetails.id,
      );
      setSeriesData(updatedSeries);
      toast.success("Изменения сохранены");
    } catch (e) {
      console.error(e);
      toast.error("Ошибка при сохранении изменения");
    } finally {
      setIsChangesSaving(false);
    }
  };

  return {
    data: {
      seriesData,
      posterPreviewSrc,
      isChangesSaving,
    },
    actions: {
      onChangePicture,
      changeSeriesDataHandler,
      saveChangesHandler,
      onSelectQualityHandler,
      onSelectGenresHandler,
      onSelectCountryHandler,
      addParagraphHandler,
      changeDescriptionHandler,
      deleteParagraphHandler,
    },
  };
};
