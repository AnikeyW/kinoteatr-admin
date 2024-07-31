import {
  IEpisode,
  ISeason,
  ISeries,
  ISubtitle,
} from "@/types/Series.types";
import $api from "@/http";
import { AxiosProgressEvent } from "axios";

export interface CreateSeriesDto {
  title: string;
  slug: string;
  description: string[];
  releaseYear: number;
  rateKinopoisk: number;
  rateImdb: number;
  quality: number;
  countries: string[];
  genres: string[];
  poster: File | null;
}

export interface EditSeriesDto {
  title: string;
  slug: string;
  description: string;
  releaseYear: string;
  rateKinopoisk: number;
  rateImdb: number;
  quality: number;
  countries: string[];
  genres: string[];
  poster: File | string;
}

export interface CreateSeasonDto {
  title: string;
  description: string[];
  seriesId: number;
  order: number;
  poster: File | null;
}

export interface EditSeasonDto {
  title: string;
  description: string;
  order: string;
  poster: File | string;
}

export interface CreateEpisodeDto {
  title: string;
  description: string[];
  order: number;
  skipRepeat?: number | null;
  skipIntro?: number | null;
  skipCredits?: number | null;
  seasonId: number;
  releaseDate: string;
  video: File | null;
}

export interface EditEpisodeDto {
  title: string;
  description: string;
  order: string;
  skipRepeat?: number | null;
  skipRepeatEnd?: number | null;
  skipIntro?: number | null;
  skipIntroEnd?: number | null;
  skipCredits?: number | null;
  releaseDate: string;
  poster: string;
  width: number;
  height: number;
  existSubtitles: ISubtitle[];
  newSubtitles: File[];
  defaultSubtitle: string | null;
}

export const seriesService = {
  async deleteEpisode(episodeId: number) {
    try {
      const response = await $api.delete<IEpisode>(
        process.env.NEXT_PUBLIC_SERVER_URL_API + `episode/${episodeId}`,
      );

      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Ошибка удаления Эпизода");
    }
  },

  async addEpisode(
    episodeData: CreateEpisodeDto,
    setPercentCallback: (percent: number) => void,
  ) {
    try {
      const formData = new FormData();

      formData.append("title", episodeData.title);
      formData.append("description", JSON.stringify(episodeData.description));
      formData.append("order", episodeData.order.toString());
      formData.append("seasonId", episodeData.seasonId.toString());
      formData.append("releaseDate", episodeData.releaseDate.toString());
      formData.append("video", episodeData.video!);
      if (episodeData.skipCredits) {
        formData.append("skipCredits", episodeData.skipCredits.toString());
      }
      if (episodeData.skipRepeat) {
        formData.append("skipRepeat", episodeData.skipRepeat.toString());
      }
      if (episodeData.skipIntro) {
        formData.append("skipIntro", episodeData.skipIntro.toString());
      }

      const response = await $api.post<IEpisode>(
        process.env.NEXT_PUBLIC_SERVER_URL_API + "episode",
        formData,
        {
          onUploadProgress: (e: AxiosProgressEvent) => {
            const total = e.total || 1;
            const percentCompleted = Math.round((e.loaded * 100) / total);
            setPercentCallback(percentCompleted);
          },
        },
      );

      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Ошибка добавления Эпизода");
    }
  },

  async editEpisode(episodeData: EditEpisodeDto, episodeId: number) {
    try {
      const formData = new FormData();

      formData.append("title", episodeData.title);
      formData.append("description", episodeData.description);
      formData.append("order", episodeData.order);
      formData.append("width", episodeData.width.toString());
      formData.append("height", episodeData.height.toString());
      formData.append("releaseDate", episodeData.releaseDate);
      formData.append("poster", episodeData.poster);
      episodeData.newSubtitles.forEach((sub) => {
        formData.append("newSubtitles", sub);
      });
      formData.append(
        "existSubtitles",
        JSON.stringify(episodeData.existSubtitles),
      );
      if (episodeData.defaultSubtitle) {
        formData.append("defaultSubtitle", episodeData.defaultSubtitle);
      }
      if (episodeData.skipCredits) {
        formData.append("skipCredits", episodeData.skipCredits.toString());
      }
      if (episodeData.skipRepeat) {
        formData.append("skipRepeat", episodeData.skipRepeat.toString());
      }
      if (episodeData.skipRepeatEnd) {
        formData.append("skipRepeatEnd", episodeData.skipRepeatEnd.toString());
      }
      if (episodeData.skipIntro) {
        formData.append("skipIntro", episodeData.skipIntro.toString());
      }
      if (episodeData.skipIntroEnd) {
        formData.append("skipIntroEnd", episodeData.skipIntroEnd.toString());
      }

      const response = await $api.post(
        process.env.NEXT_PUBLIC_SERVER_URL_API + `episode/${episodeId}`,
        formData,
      );

      return response.data;
    } catch (e) {
      console.error(e);
      throw new Error("Ошибка при изменении эпизода");
    }
  },

  async addSeason(data: CreateSeasonDto) {
    try {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", JSON.stringify(data.description));
      formData.append("seriesId", data.seriesId.toString());
      formData.append("order", data.order.toString());
      formData.append("poster", data.poster!);

      const response = await $api.post(
        process.env.NEXT_PUBLIC_SERVER_URL_API + "season",
        formData,
      );
      return response.data;
    } catch (e) {
      console.error(e);
      throw new Error("Ошибка при добавлении сезона");
    }
  },

  async addSeries(data: CreateSeriesDto) {
    try {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("slug", data.slug);
      formData.append("description", JSON.stringify(data.description));
      formData.append("releaseYear", data.releaseYear.toString());
      formData.append("quality", data.quality.toString());
      formData.append("rateKinopoisk", data.rateKinopoisk.toString());
      formData.append("rateImdb", data.rateImdb.toString());
      formData.append("countries", JSON.stringify(data.countries));
      formData.append("genres", JSON.stringify(data.genres));
      formData.append("poster", data.poster!);

      await $api.post(
        process.env.NEXT_PUBLIC_SERVER_URL_API + "series",
        formData,
      );
    } catch (e) {
      console.error(e);
      throw new Error("Ошибка при добавлении сериала");
    }
  },

  async editSeries(data: EditSeriesDto, seriesId: number) {
    try {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("slug", data.slug);
      formData.append("description", data.description);
      formData.append("releaseYear", data.releaseYear);
      formData.append("rateKinopoisk", data.rateKinopoisk.toString());
      formData.append("rateImdb", data.rateImdb.toString());
      formData.append("quality", data.quality.toString());
      formData.append("countries", JSON.stringify(data.countries));
      formData.append("genres", JSON.stringify(data.genres));
      formData.append("poster", data.poster);

      const response = await $api.post(
        process.env.NEXT_PUBLIC_SERVER_URL_API + `series/${seriesId}`,
        formData,
      );

      return response.data;
    } catch (e) {
      console.error(e);
      throw new Error("Ошибка при редактировании Сериала");
    }
  },

  async editSeason(data: EditSeasonDto, seasonId: number) {
    try {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("order", data.order);
      formData.append("poster", data.poster);

      const response = await $api.post(
        process.env.NEXT_PUBLIC_SERVER_URL_API + `season/${seasonId}`,
        formData,
      );

      return response.data;
    } catch (e) {
      console.error(e);
      throw new Error("Ошибка при редактировании Сезона");
    }
  },

  async getSeries(): Promise<ISeries[]> {
    const res = await fetch(
      process.env.NEXT_PUBLIC_SERVER_URL_API + "series?skip=0&take=20",
    );

    if (!res.ok) {
      throw new Error(`failed to fetch ${res.status}`);
    }
    return await res.json();
  },

  async getSeriesById(seriesId: number): Promise<ISeries> {
    const res = await fetch(
      process.env.NEXT_PUBLIC_SERVER_URL_API + `series/${seriesId}`,
    );

    if (!res.ok) {
      throw new Error(`failed to fetch ${res.status}`);
    }
    return await res.json();
  },

  async getSeriesBySlug(slug: string): Promise<ISeries | undefined> {
    const res = await fetch(
      process.env.NEXT_PUBLIC_SERVER_URL_API + `series/bySlug/${slug}`,
    );

    if (!res.ok) {
      return undefined;
    }
    return await res.json();
  },

  async getSeasonByOrder(
    seasonOrder: number,
    seriesSlug: string,
  ): Promise<ISeason | undefined> {
    const res = await fetch(
      process.env.NEXT_PUBLIC_SERVER_URL_API +
        `season/${seasonOrder}?series_slug=${seriesSlug}`,
    );

    if (!res.ok) {
      return undefined;
    }
    return await res.json();
  },

  async getSeasonById(seasonId: number): Promise<ISeason> {
    const res = await fetch(
      process.env.NEXT_PUBLIC_SERVER_URL_API + `season/byId/${seasonId}`,
    );

    if (!res.ok) {
      throw new Error(`failed to fetch ${res.status}`);
    }
    return await res.json();
  },

  async getEpisodeByOrder(
    episodeOrder: number,
    seasonOrder: number,
    seriesSlug: string,
  ): Promise<IEpisode | undefined> {
    const res = await fetch(
      process.env.NEXT_PUBLIC_SERVER_URL_API +
        `episode/byOrder/${episodeOrder}?season_order=${seasonOrder}&series_slug=${seriesSlug}`,
    );

    if (!res.ok) {
      return undefined;
    }
    return await res.json();
  },

  async getEpisodeById(episodeId: number): Promise<IEpisode | undefined> {
    const res = await fetch(
      process.env.NEXT_PUBLIC_SERVER_URL_API + `episode/byId/${episodeId}`,
    );

    if (!res.ok) {
      return undefined;
    }
    return await res.json();
  },

  async getAllEpisodesBySeriesSlug(
    seriesSlug: string,
  ): Promise<IEpisode[] | undefined> {
    const res = await fetch(
      process.env.NEXT_PUBLIC_SERVER_URL_API +
        `episode/getAll/?series_slug=${seriesSlug}`,
    );

    if (!res.ok) {
      return undefined;
    }
    return await res.json();
  },
};
