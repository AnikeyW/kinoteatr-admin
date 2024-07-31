import React from "react";
import AdminPageLayout from "@/components/adminPage/adminPageLayout/AdminPageLayout";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import MainLayout from "@/components/layouts/MainLayout";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({children}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="ru">

      <body className={inter.className}>
      <MainLayout>
          <AdminPageLayout>{children}</AdminPageLayout>
      </MainLayout>

      </body>
      </html>
  );
}
