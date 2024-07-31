import React, { FC } from "react";
import { ISeries } from "@/types/Series.types";
import MyLink from "@/components/UI/myLink/MyLink";
import styles from "./EditSeries.module.scss";
import EditInfo from "@/components/adminPage/editSeries/editInfo/EditInfo";
import EditSeasonsList from "@/components/adminPage/editSeries/editSeasonsList/EditSeasonsList";

interface Props {
  seriesDetails: ISeries;
}

const EditSeries: FC<Props> = ({ seriesDetails }) => {
  return (
    <div className={styles.root}>
      <div className={styles.backLink}>
        <MyLink href={"/admin/series"}>К списку сериалов</MyLink>
      </div>

      <div className={styles.pageTitle}>Редактирование сериала</div>

      <EditInfo seriesDetails={seriesDetails} />

      <div className={styles.seasons}>
        <EditSeasonsList
          seasons={seriesDetails.seasons}
          seriesId={seriesDetails.id}
        />
      </div>
    </div>
  );
};

export default EditSeries;
