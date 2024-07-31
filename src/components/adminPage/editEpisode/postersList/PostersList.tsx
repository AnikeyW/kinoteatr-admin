import React, { FC } from "react";
import styles from "./PostersList.module.scss";
import { IEpisode } from "@/types/Series.types";
import Image from "next/image";

interface Props {
  episodeDetails: IEpisode;
  changePoster: (poster: string) => void;
}

const PostersList: FC<Props> = ({ episodeDetails, changePoster }) => {
  return (
    <div className={styles.root}>
      <h2 className={styles.title}>Возможные постеры</h2>
      <div className={styles.postersList}>
        {episodeDetails.thumbnails.map((thumbnail) => (
          <div
            className={styles.poster}
            key={thumbnail}
            onClick={() => {
              changePoster(thumbnail);
            }}
          >
            <Image
              src={process.env.NEXT_PUBLIC_SERVER_URL_STATIC + thumbnail}
              alt={"thumbnail"}
              fill={true}
              sizes="(max-width: 320px) 100vw, 320px"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostersList;
