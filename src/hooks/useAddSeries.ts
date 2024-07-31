import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import { CreateSeriesDto, seriesService } from "@/services/series.service";
import { toast } from "react-hot-toast";

export const useAddSeries = (closeModal: () => void) => {
  const router = useRouter();
  const [seriesData, setSeriesData] = useState<CreateSeriesDto>({
    title: "",
    slug: "",
    description: [""],
    releaseYear: 2011,
    poster: null,
    countries: [],
    genres: [],
    quality: 1080,
    rateImdb: 9,
    rateKinopoisk: 9,
  });
  const [posterPreviewSrc, setPosterPreviewSrc] = useState<string>("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const addParagraphHandler = () => {
    const description = seriesData.description;
    description.push("");
    setSeriesData({
      ...seriesData,
      description: description,
    });
  };

  const deleteParagraphHandler = (paragraphIndex: number) => {
    const description = seriesData.description;
    description.splice(paragraphIndex, 1);

    setSeriesData({
      ...seriesData,
      description: description,
    });
  };

  const changeDescriptionHandler = (
    e: ChangeEvent<HTMLTextAreaElement>,
    paragraphIndex: number,
  ) => {
    const description = seriesData.description;

    description[paragraphIndex] = e.target.value;
    setSeriesData({
      ...seriesData,
      description: description,
    });
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
    setError("");
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
    e: ChangeEvent<HTMLInputElement>,
    field: keyof typeof seriesData,
  ) => {
    setSeriesData({ ...seriesData, [field]: e.target.value });
  };

  const addSeriesHandler = async () => {
    try {
      if (!seriesData.poster) {
        setError("Добавь постер");
        return;
      }
      setIsLoading(true);
      const response = await seriesService.addSeries(seriesData);
      setSeriesData({
        title: "",
        slug: "",
        description: [""],
        poster: null,
        releaseYear: 2011,
        countries: [],
        genres: [],
        quality: 1080,
        rateImdb: 9,
        rateKinopoisk: 9,
      });
      setPosterPreviewSrc("");
      router.refresh();
      closeModal();
      toast.success("Сериал успешно добавлен");
    } catch (e) {
      console.log(e);
      toast.error("Ошибка при добавлении сериала");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data: {
      seriesData,
      posterPreviewSrc,
      error,
      isLoading,
    },
    actions: {
      onChangePicture,
      changeSeriesDataHandler,
      addSeriesHandler,
      onSelectCountryHandler,
      onSelectQualityHandler,
      onSelectGenresHandler,
      changeDescriptionHandler,
      deleteParagraphHandler,
      addParagraphHandler,
    },
  };
};
