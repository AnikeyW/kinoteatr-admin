import React, { ChangeEvent, useState } from "react";
import { CreateEpisodeDto, seriesService } from "@/services/series.service";
import { useRouter } from "next/navigation";
import { IEpisode } from "@/types/Series.types";
import { toast } from "react-hot-toast";

export const useAddEpisode = (
  episodes: IEpisode[],
  seasonId: number,
  closeModal: () => void,
) => {
  const router = useRouter();
  const [episodeData, setEpisodeData] = useState<CreateEpisodeDto>({
    title: `Эпизод ${episodes.length + 1}`,
    description: [""],
    order: episodes.length + 1,
    seasonId: seasonId,
    releaseDate: "2020-01-01",
    video: null,
    skipIntro: null,
    skipCredits: null,
    skipRepeat: null,
  });
  const [error, setError] = useState("");
  const [uploadProgress, setUploadProgress] = useState({
    isUploading: false,
    percent: 0,
  });

  const deleteParagraphHandler = (paragraphIndex: number) => {
    const episodeDescription = episodeData.description;
    episodeDescription.splice(paragraphIndex, 1);

    setEpisodeData({
      ...episodeData,
      description: episodeDescription,
    });
  };

  const changeDescriptionHandler = (
    e: ChangeEvent<HTMLTextAreaElement>,
    paragraphIndex: number,
  ) => {
    const episodeDescription = episodeData.description;

    episodeDescription[paragraphIndex] = e.target.value;
    setEpisodeData({
      ...episodeData,
      description: episodeDescription,
    });
  };

  const addParagraphHandler = () => {
    const episodeDescription = episodeData.description;
    episodeDescription.push("");
    setEpisodeData({
      ...episodeData,
      description: episodeDescription,
    });
  };

  const onChangeVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    if (e.target.files) {
      setEpisodeData({ ...episodeData, video: e.target.files[0] });
    }
  };

  const changeEpisodeDataHandler = (
    e: ChangeEvent<HTMLInputElement>,
    field: keyof typeof episodeData,
  ) => {
    setEpisodeData({ ...episodeData, [field]: e.target.value });
  };

  const setPercentCallback = (percent: number) => {
    setUploadProgress((prev) => ({ ...prev, percent: percent }));
  };

  const addEpisodeHandler = async () => {
    if (!episodeData.video) {
      setError("Добавь видео");
      return;
    }

    setUploadProgress((prev) => ({ ...prev, isUploading: true }));
    setError("");

    seriesService
      .addEpisode(episodeData, setPercentCallback)
      .then((episode) => {
        setEpisodeData({
          title: `Эпизод ${episode.order + 1}`,
          description: [""],
          order: episode.order + 1,
          seasonId: seasonId,
          video: null,
          releaseDate: "2020-01-01",
          skipRepeat: null,
          skipCredits: null,
          skipIntro: null,
        });
        closeModal();
        router.refresh();
        toast.success("Эпизод добавлен");
      })
      .catch((err: string) => {
        setError(err);
        toast.error("Ошибка при добавлении эпизода");
      })
      .finally(() => {
        setUploadProgress((prev) => ({ ...prev, isUploading: false }));
      });
  };

  return {
    actions: {
      addEpisodeHandler,
      changeEpisodeDataHandler,
      onChangeVideo,
      changeDescriptionHandler,
      addParagraphHandler,
      deleteParagraphHandler,
    },
    data: {
      error,
      uploadProgress,
      episodeData,
    },
  };
};
