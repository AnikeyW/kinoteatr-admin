import React, { FC } from "react";
import { IEpisode } from "@/types/Series.types";
import styles from "./EditEpisode.module.scss";
import MyLink from "@/components/UI/myLink/MyLink";
import EditInfoEpisode from "@/components/adminPage/editEpisode/editInfoEpisode/EditInfoEpisode";

interface Props {
  episodeDetails: IEpisode;
  seriesId: number;
  seasonId: number;
}

const EditEpisode: FC<Props> = ({ episodeDetails, seriesId, seasonId }) => {
  return (
    <div className={styles.root}>
      <div className={styles.backLink}>
        <MyLink href={`/admin/series/edit/${seriesId}/season/${seasonId}`}>
          К сезону
        </MyLink>
      </div>

      <div className={styles.pageTitle}>Редактирование эпизода</div>

      <EditInfoEpisode episodeDetails={episodeDetails} />
    </div>
  );
};

export default EditEpisode;
