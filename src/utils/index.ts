import { QualityResolutionType } from "@/types/Series.types";

export const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.round(seconds % 60);

  if (hours === 0 && minutes === 0) {
    return `0:${remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds}`;
  } else if (hours === 0) {
    return `${minutes < 10 ? "0" + minutes : minutes}:${remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds}`;
  } else {
    return `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}:${remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds}`;
  }
};

export const formatDate = (date: string): string => {
  const parsedDate = new Date(date);

  return (
    parsedDate.getDate().toString().padStart(2, "0") +
    "." +
    (parsedDate.getMonth() + 1).toString().padStart(2, "0") +
    "." +
    parsedDate.getFullYear()
  );
};

export const formatTimeHhMm = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0) {
    return `${hours}ч ${minutes}мин`;
  } else {
    return `${minutes}мин`;
  }
};

export const isJSON = (str: string): boolean => {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
};

export const getQualityName = (
  qualityResolution: QualityResolutionType,
): string => {
  const qualities = {
    240: "240p",
    320: "320p",
    480: "480p",
    720: "HD",
    1080: "FullHD",
    1440: "2K",
    2160: "4K",
    4320: "8K",
  };

  return qualities[qualityResolution];
};

export const subLabelFromSubSrc = (subSrc: string): string => {
  return (
    subSrc
      .replace(/\\/g, "/")
      .split("/")
      .pop()
      ?.split(".")[0]
      .replace(/_/g, " ")
      .replace(/\s+/g, " ")
      .trim() || "Sub"
  );
};
