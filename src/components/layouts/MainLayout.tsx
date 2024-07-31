import React, { FC, PropsWithChildren } from "react";
import styles from "./MainLayout.module.scss";
import Link from "next/link";
import Container from "@/components/UI/container/Container";
import MyLink from "@/components/UI/myLink/MyLink";

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className={styles.root}>
      <header className={styles.header}>
        <Container>
          <div className={styles.headerBox}>
            <div className={styles.logo}>
              <MyLink href={"/"}>
                <span className={styles.logoPt1}>Holo</span>
                <span className={styles.logoPt2}>TV</span>
              </MyLink>
            </div>
            {/*<nav className={styles.nav}>*/}
            {/*  <Link href={"/series"}>Сериалы</Link>*/}
            {/*  <Link href={"/movies"}>Фильмы</Link>*/}
            {/*</nav>*/}
          </div>
        </Container>
      </header>

      <section className={styles.section}>
        <Container>{children}</Container>
      </section>

      <footer className={styles.footer}>
        <Container>
          <div className={styles.copyright}>
            Материалы, используемые на сайте, взяты из открытых источников
          </div>
        </Container>
      </footer>
    </main>
  );
};

export default MainLayout;
