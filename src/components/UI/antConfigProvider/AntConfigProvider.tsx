import React, { FC, PropsWithChildren } from "react";
import { ConfigProvider, theme } from "antd";

const AntConfigProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default AntConfigProvider;
