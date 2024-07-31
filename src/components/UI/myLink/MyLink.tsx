import React, { FC, ReactNode } from "react";
import Link from "next/link";
import styles from "./MyLink.module.scss";

interface Props {
  href: string | { pathname: string; query: any };
  children: ReactNode;
  replace?: boolean;
}

const MyLink: FC<Props> = ({ children, href }) => {
  return (
    <Link href={href} className={styles.root}>
      {children}
    </Link>
  );
};

export default MyLink;
