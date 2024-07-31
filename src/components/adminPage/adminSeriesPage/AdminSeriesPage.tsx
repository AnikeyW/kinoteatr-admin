"use client";
import React, { FC, useState } from "react";
import styles from "./AdminSeriesPage.module.scss";
import { ISeriesWithoutSeasons } from "@/types/Series.types";
import SeriesItem from "@/components/adminPage/adminSeriesPage/seriesItem/SeriesItem";
import MyButton from "@/components/UI/myButton/MyButton";
import MyInput from "@/components/UI/myInput/MyInput";
import Modal from "@/components/UI/modal/Modal";
import AddSeries from "@/components/adminPage/addSeries/AddSeries";

interface Props {
  series: ISeriesWithoutSeasons[];
}

const AdminSeriesPage: FC<Props> = ({ series }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const closeModal = () => {
    setIsOpenModal(false);
  };

  return (
    <div className={styles.root}>
      <Modal isOpen={isOpenModal} onClose={closeModal}>
        <AddSeries closeModal={closeModal} />
      </Modal>
      <div className={styles.top}>
        <div className={styles.search}>
          <MyInput type="text" placeholder={"Поиск"} />
        </div>

        <div className={styles.addSeriesBtn}>
          <MyButton onClick={() => setIsOpenModal(true)}>
            Добавить сериал
          </MyButton>
        </div>
      </div>

      <div className={styles.seriesList}>
        {series.map((seriesItem) => (
          <SeriesItem seriesItem={seriesItem} key={seriesItem.id} />
        ))}
      </div>
    </div>
  );
};

export default AdminSeriesPage;
