import React from "react";
import { redirect } from "next/navigation";
import styles from "./AdminPage.module.scss";

const AdminPage = () => {
  redirect("/admin/series");

  return (
    <div className={styles.root}>
      <h1>Админ панель</h1>
    </div>
  );
};

export default AdminPage;
