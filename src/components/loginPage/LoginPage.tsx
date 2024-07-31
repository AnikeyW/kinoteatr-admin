"use client";
import React from "react";
import ErrorMessage from "@/components/UI/errorMessage/ErrorMessage";
import styles from "./LoginPage.module.scss";
import MyButton from "@/components/UI/myButton/MyButton";
import MyInput from "@/components/UI/myInput/MyInput";
import { useLogin } from "@/hooks/useLogin";

const LoginPage = () => {
  const { loginHandler, isLoading, error } = useLogin();

  return (
    <>
      <div className={styles.root}>
        <div className={styles.form}>
          <div className={styles.formTitle}>Вход в панель Администратора</div>

          <form action={loginHandler}>
            <div className={styles.input}>
              <MyInput type={"email"} placeholder={"email"} name={"email"} />
            </div>
            <div className={styles.input}>
              <MyInput
                type={"password"}
                placeholder={"password"}
                name={"password"}
              />
            </div>
            <div className={styles.loginBtn}>
              <MyButton type={"submit"} disabled={isLoading}>
                {isLoading ? "Проверка..." : "Войти"}
              </MyButton>
            </div>
            {error && <ErrorMessage message={error} />}
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
