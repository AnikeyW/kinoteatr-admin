"use client";
import React, { FC, useState } from "react";
import styles from "./EditSeasonsList.module.scss";
import { ISeasonWithoutEpisodes } from "@/types/Series.types";
import AddSeason from "@/components/adminPage/editSeries/addSeason/AddSeason";
import { useRouter } from "next/navigation";
import Modal from "@/components/UI/modal/Modal";
import MyButton from "@/components/UI/myButton/MyButton";
import Image from "next/image";

interface Props {
  seasons: ISeasonWithoutEpisodes[];
  seriesId: number;
}

const EditSeasonsList: FC<Props> = ({ seasons, seriesId }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const router = useRouter();

  const closeModal = () => {
    setIsOpenModal(false);
  };

  return (
    <div className={styles.seasons}>
      <Modal isOpen={isOpenModal} onClose={closeModal}>
        <AddSeason
          seriesId={seriesId}
          seasons={seasons}
          closeModal={closeModal}
        />
      </Modal>
      <div className={styles.listTitle}>Сезоны:</div>
      <MyButton onClick={() => setIsOpenModal(true)}>Добавить сезон</MyButton>
      {seasons.length === 0 ? (
        <div>Нет сезонов</div>
      ) : (
        <div className={styles.seasonsList}>
          {seasons.map((season) => (
            <div key={season.id} className={styles.seasonItem}>
              <div className={styles.info}>
                <div className={styles.seasonPoster}>
                  <Image
                    src={
                      process.env.NEXT_PUBLIC_SERVER_URL_STATIC + season.poster
                    }
                    alt={""}
                    fill={true}
                    sizes={"100px"}
                  />
                </div>
                <div className={styles.title}>Сезон {season.order}</div>
              </div>

              <MyButton
                onClick={() =>
                  router.push(`/series/edit/${seriesId}/season/${season.id}`)
                }
              >
                Редактировать
              </MyButton>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EditSeasonsList;
