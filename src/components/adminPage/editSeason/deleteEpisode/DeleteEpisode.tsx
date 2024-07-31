import React, { FC } from "react";
import { IEpisode } from "@/types/Series.types";
import MyButton, { VariantsBtn } from "@/components/UI/myButton/MyButton";
import styles from "./DeleteEpisode.module.scss";
import { useDeleteEpisode } from "@/hooks/useDeleteEpisode";

interface Props {
  episode: IEpisode;
  closeModal: () => void;
}

const DeleteEpisode: FC<Props> = ({ episode, closeModal }) => {
  const { data, actions } = useDeleteEpisode(episode.id, closeModal);

  return (
    <div className={styles.root}>
      {`Вы точно хотите удалить эпизод "Серия ${episode.order} ${episode.title}
      "?`}
      <div className={styles.btns}>
        <MyButton onClick={closeModal}>Нет, отмена</MyButton>
        <MyButton
          variant={VariantsBtn.ERROR}
          onClick={actions.deleteEpisode}
          disabled={data.isLoading}
        >
          {data.isLoading ? "Удаление" : "ДА, удалить"}
        </MyButton>
      </div>
    </div>
  );
};

export default DeleteEpisode;
