"use client";
import React, { FC } from "react";
import styles from "./SeriesItem.module.scss";
import { ISeriesWithoutSeasons } from "@/types/Series.types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import MyButton from "@/components/UI/myButton/MyButton";

interface Props {
  seriesItem: ISeriesWithoutSeasons;
}

const SeriesItem: FC<Props> = ({ seriesItem }) => {
  const router = useRouter();
  return (
    <div className={styles.root}>
      <div className={styles.info}>
        <div className={styles.image}>
          <Image
            src={process.env.NEXT_PUBLIC_SERVER_URL_STATIC + seriesItem.poster}
            alt={seriesItem.title}
            fill={true}
          />
        </div>
        <div>{seriesItem.title}</div>
      </div>

      <MyButton
        onClick={() => {
          router.push(`/series/edit/${seriesItem.id}`);
        }}
      >
        Редактировать
      </MyButton>
    </div>
  );
};

export default SeriesItem;
