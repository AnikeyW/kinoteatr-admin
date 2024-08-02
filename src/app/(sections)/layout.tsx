import React from "react";
import AdminPageLayout from "@/components/adminPage/adminPageLayout/AdminPageLayout";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <AdminPageLayout>{children}</AdminPageLayout>;
};

export default Layout;
