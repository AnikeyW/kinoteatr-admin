export type QualityResolutionType =
  | 240
  | 320
  | 480
  | 720
  | 1080
  | 1440
  | 2160
  | 4320;

export interface ISeries {
  id: number;
  title: string;
  slug: string;
  poster: string;
  releaseYear: number;
  description: string;
  rateKinopoisk: number;
  rateImdb: number;
  quality: QualityResolutionType;
  countries: string[];
  genres: string[];
  seasons: ISeasonWithoutEpisodes[];
  playlist: string;
}

export type ISeriesWithoutSeasons = Omit<ISeries, "seasons">;

export interface ISeason {
  id: number;
  title: string;
  description: string;
  order: number;
  poster: string;
  seriesId: number;
  episodes: IEpisode[];
}

export type ISeasonWithoutEpisodes = Omit<ISeason, "episodes">;

export interface ISubtitle {
  id: number;
  src: string;
  episodeId: number;
}

export interface IEpisode {
  id: number;
  title: string;
  description: string;
  order: number;
  skipRepeat: number | null;
  skipRepeatEnd: number | null;
  skipIntro: number | null;
  skipIntroEnd: number | null;
  skipCredits: number | null;
  seasonId: number;
  views: number;
  duration: number;
  poster: string;
  thumbnails: string[];
  isProcessing: boolean;
  srcHls: string;
  srcDash: string;
  releaseDate: string;
  width: number;
  height: number;
  subtitles: ISubtitle[];
  defaultSubtitle: string | null;
}
