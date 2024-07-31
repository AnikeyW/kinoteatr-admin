import React from "react";
import LoginPage from "@/components/loginPage/LoginPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

const Page = async () => {
  return <LoginPage />;
};

export default Page;
