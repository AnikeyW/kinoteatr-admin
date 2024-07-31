import React, { ChangeEvent, useState } from "react";
import { EditEpisodeDto, seriesService } from "@/services/series.service";
import { IEpisode } from "@/types/Series.types";
import { toast } from "react-hot-toast";
import { isJSON } from "@/utils";
import { SUB_OFF } from "@/constants";

export const useEditEpisode = (episodeDetails: IEpisode) => {
  const [episodeData, setEpisodeData] = useState<EditEpisodeDto>({
    title: episodeDetails.title,
    description: episodeDetails.description,
    order: episodeDetails.order.toString(),
    poster: episodeDetails.poster,
    newSubtitles: [],
    existSubtitles: episodeDetails.subtitles,
    releaseDate: episodeDetails.releaseDate.split("T")[0],
    skipCredits: episodeDetails.skipCredits,
    skipIntro: episodeDetails.skipIntro,
    skipIntroEnd: episodeDetails.skipIntroEnd,
    skipRepeat: episodeDetails.skipRepeat,
    skipRepeatEnd: episodeDetails.skipRepeatEnd,
    width: episodeDetails.width,
    height: episodeDetails.height,
    defaultSubtitle: episodeDetails.defaultSubtitle,
  });
  const [isLoading, setIsLoading] = useState(false);
  const changeDefaultSubtitle = (value: string) => {
    if (value === SUB_OFF) {
      setEpisodeData({ ...episodeData, defaultSubtitle: null });
    } else {
      setEpisodeData({ ...episodeData, defaultSubtitle: value });
    }
  };

  const deleteParagraphHandler = (paragraphIndex: number) => {
    const episodeDescription = JSON.parse(episodeData.description);
    episodeDescription.splice(paragraphIndex, 1);

    setEpisodeData({
      ...episodeData,
      description: JSON.stringify(episodeDescription),
    });
  };

  const changeDescriptionHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    paragraphIndex: number,
  ) => {
    const episodeDescription = JSON.parse(episodeData.description);

    episodeDescription[paragraphIndex] = e.target.value;
    setEpisodeData({
      ...episodeData,
      description: JSON.stringify(episodeDescription),
    });
  };

  const addParagraphHandler = () => {
    if (episodeData.description === "") {
      setEpisodeData({
        ...episodeData,
        description: JSON.stringify([""]),
      });
      return;
    }
    if (isJSON(episodeData.description)) {
      const episodeDescription = JSON.parse(episodeData.description);
      episodeDescription.push("");
      setEpisodeData({
        ...episodeData,
        description: JSON.stringify(episodeDescription),
      });
    } else {
      toast.error("Не правильный формат");
    }
  };

  const changeEpisodeDataHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof typeof episodeData,
  ) => {
    setEpisodeData({ ...episodeData, [field]: e.target.value });
  };

  const onChangePoster = (thumbnailSrc: string) => {
    setEpisodeData({ ...episodeData, poster: thumbnailSrc });
  };

  const changeNewSubtitlesHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files) {
      setEpisodeData({
        ...episodeData,
        newSubtitles: [...Array.from(e.target.files)],
      });
    }
  };

  const removeExistSubtitlesHandler = (subId: number) => {
    const subs = episodeData.existSubtitles.filter((s) => s.id !== subId);
    setEpisodeData({
      ...episodeData,
      existSubtitles: subs,
    });
  };

  const saveChangesHandler = async () => {
    try {
      setIsLoading(true);
      const updatedEpisode = await seriesService.editEpisode(
        {
          title: episodeData.title,
          description: episodeData.description,
          order: episodeData.order,
          releaseDate: episodeData.releaseDate,
          poster: episodeData.poster,
          skipCredits: !episodeData.skipCredits
            ? null
            : Number(episodeData.skipCredits),
          skipIntro: !episodeData.skipIntro
            ? null
            : Number(episodeData.skipIntro),
          skipIntroEnd: !episodeData.skipIntroEnd
            ? null
            : Number(episodeData.skipIntroEnd),
          skipRepeat: !episodeData.skipRepeat
            ? null
            : Number(episodeData.skipRepeat),
          skipRepeatEnd: !episodeData.skipRepeatEnd
            ? null
            : Number(episodeData.skipRepeatEnd),
          existSubtitles: episodeData.existSubtitles,
          newSubtitles: episodeData.newSubtitles,
          width: episodeData.width,
          height: episodeData.height,
          defaultSubtitle: episodeData.defaultSubtitle,
        },
        episodeDetails.id,
      );
      setEpisodeData({
        title: updatedEpisode.title,
        description: updatedEpisode.description,
        order: updatedEpisode.order.toString(),
        releaseDate: updatedEpisode.releaseDate.split("T")[0],
        poster: updatedEpisode.poster,
        skipCredits: updatedEpisode.skipCredits,
        skipIntro: updatedEpisode.skipIntro,
        skipIntroEnd: updatedEpisode.skipIntroEnd,
        skipRepeat: updatedEpisode.skipRepeat,
        skipRepeatEnd: updatedEpisode.skipRepeatEnd,
        existSubtitles: updatedEpisode.subtitles,
        width: updatedEpisode.width,
        height: updatedEpisode.height,
        newSubtitles: [],
        defaultSubtitle: updatedEpisode.defaultSubtitle,
      });
      toast.success("Изменения сохранены");
    } catch (e) {
      toast.error("Ошибка изменения эпизода");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data: {
      episodeData,
      isLoading,
    },
    actions: {
      changeEpisodeDataHandler,
      onChangePoster,
      changeNewSubtitlesHandler,
      removeExistSubtitlesHandler,
      saveChangesHandler,
      addParagraphHandler,
      changeDescriptionHandler,
      deleteParagraphHandler,
      changeDefaultSubtitle,
    },
  };
};
