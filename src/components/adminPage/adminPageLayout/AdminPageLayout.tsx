"use client";
import React, { FC, PropsWithChildren } from "react";
import styles from "./AdminPageLayout.module.scss";
import { usePathname, useRouter } from "next/navigation";
import { MdLogout } from "react-icons/md";
import { authService } from "@/services/auth.service";
import MyLink from "@/components/UI/myLink/MyLink";
import cl from "classnames";
import { Toaster } from "react-hot-toast";
import { TOAST_DURATION } from "@/constants";

interface ILink {
  href: string;
  title: string;
}

const navLinks: ILink[] = [
  {
    href: "/series",
    title: "Сериалы",
  },
  {
    href: "/movies",
    title: "Фильмы",
  },
];

const AdminPageLayout: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const logoutHandler = async () => {
    try {
      await authService.logout();
    } catch (e) {
      console.log(e);
    } finally {
      router.push("/admin/login");
    }
  };

  return (
    <div className={styles.root}>
      <Toaster
        position={"top-right"}
        toastOptions={{ duration: TOAST_DURATION }}
      />
      <div className={styles.sideNav}>
        <div className={styles.title}>
          <h1>Админ панель</h1>
          <MdLogout
            onClick={logoutHandler}
            className={styles.logout}
            size={20}
            title={"Выйти"}
          />
        </div>
        <div className={styles.links}>
          {navLinks.map((link) => (
            <MyLink href={link.href} key={link.href}>
              <div
                className={cl(styles.link, {
                  [styles.selectedLink]: pathname.includes(link.href),
                })}
              >
                {link.title}
              </div>
            </MyLink>
          ))}
        </div>
      </div>
      {children}
    </div>
  );
};

export default AdminPageLayout;
