"use client";
import React, { FC, useState } from "react";
import { IEpisode } from "@/types/Series.types";
import styles from "./EditEpisodesList.module.scss";
import { useRouter } from "next/navigation";
import AddEpisode from "@/components/adminPage/editSeason/addEpisode/AddEpisode";
import Modal from "@/components/UI/modal/Modal";
import MyButton, { VariantsBtn } from "@/components/UI/myButton/MyButton";
import Image from "next/image";
import DeleteEpisode from "@/components/adminPage/editSeason/deleteEpisode/DeleteEpisode";

interface Props {
  episodes: IEpisode[];
  seriesId: number;
  seasonId: number;
}

const EditEpisodesList: FC<Props> = ({ episodes, seriesId, seasonId }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenDeleteEpisodeModal, setIsOpenDeleteEpisodeModal] =
    useState(false);
  const [selectedEpisode, setSelectedEpisode] = useState<IEpisode | null>(null);
  const router = useRouter();

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const closeDeleteEpisodeModal = () => {
    setIsOpenDeleteEpisodeModal(false);
    setSelectedEpisode(null);
  };

  const openDeleteEpisodeModal = (episode: IEpisode) => {
    setSelectedEpisode(episode);
    setIsOpenDeleteEpisodeModal(true);
  };

  return (
    <div className={styles.root}>
      <Modal isOpen={isOpenModal} onClose={closeModal}>
        <AddEpisode
          episodes={episodes}
          seasonId={seasonId}
          closeModal={closeModal}
        />
      </Modal>

      <Modal
        isOpen={isOpenDeleteEpisodeModal}
        onClose={closeDeleteEpisodeModal}
      >
        {selectedEpisode && (
          <DeleteEpisode
            episode={selectedEpisode}
            closeModal={closeDeleteEpisodeModal}
          />
        )}
      </Modal>

      <div className={styles.listTitle}>Эпизоды:</div>
      <MyButton onClick={() => setIsOpenModal(true)}>Добавить эпизод</MyButton>
      {episodes.length === 0 ? (
        <div>Нет эпизодов</div>
      ) : (
        <div className={styles.list}>
          {episodes.map((episode) => (
            <div key={episode.id} className={styles.listItem}>
              <div className={styles.itemInfo}>
                <div className={styles.itemPoster}>
                  <Image
                    src={
                      process.env.NEXT_PUBLIC_SERVER_URL_STATIC + episode.poster
                    }
                    alt={""}
                    fill={true}
                    sizes={"60px"}
                  />
                </div>
                <div className={styles.itemTitle}>
                  Серия {episode.order} {episode.title}
                </div>
              </div>

              <div className={styles.btns}>
                <MyButton
                  onClick={() =>
                    router.push(
                      `/admin/series/edit/${seriesId}/season/${seasonId}/episode/${episode.id}`,
                    )
                  }
                >
                  Редактировать
                </MyButton>
                <MyButton
                  variant={VariantsBtn.ERROR}
                  onClick={() => openDeleteEpisodeModal(episode)}
                >
                  Удалить
                </MyButton>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EditEpisodesList;
