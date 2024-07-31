import React, { useRef } from "react";

interface IFileUploadProps {
  setFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  accept: string;
  name: string;
  multiple?: boolean;
  children: React.ReactNode;
}

const FileUpload: React.FC<IFileUploadProps> = ({
  setFile,
  accept,
  name,
  children,
  multiple,
}) => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div
      onClick={() => ref.current?.click()}
      style={{ height: "100%", color: "inherit" }}
    >
      <input
        ref={ref}
        type="file"
        name={name}
        accept={accept}
        style={{ display: "none" }}
        onChange={setFile}
        multiple={multiple ? multiple : false}
      />
      {children}
    </div>
  );
};

export default FileUpload;
