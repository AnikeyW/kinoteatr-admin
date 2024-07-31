import React, { FC } from "react";
import styles from "./EditSeason.module.scss";
import { ISeason } from "@/types/Series.types";
import MyLink from "@/components/UI/myLink/MyLink";
import EditInfoSeason from "@/components/adminPage/editSeason/editInfoSeason/EditInfoSeason";
import EditEpisodesList from "@/components/adminPage/editSeason/editEpisodesList/EditEpisodesList";

interface Props {
  seasonDetails: ISeason;
}

const EditSeason: FC<Props> = ({ seasonDetails }) => {
  return (
    <div className={styles.root}>
      <div className={styles.backLink}>
        <MyLink href={`/series/edit/${seasonDetails.seriesId}`}>
          К сериалу
        </MyLink>
      </div>

      <div className={styles.pageTitle}>Редактирование сезона</div>

      <EditInfoSeason seasonDetails={seasonDetails} />

      <div className={styles.episodes}>
        <EditEpisodesList
          episodes={seasonDetails.episodes}
          seriesId={seasonDetails.seriesId}
          seasonId={seasonDetails.id}
        />
      </div>
    </div>
  );
};

export default EditSeason;
