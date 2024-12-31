import React from "react";
import { useSelector } from "react-redux";

const FileViewer = () => {
  const { files } = useSelector((state) => state.chat);
  return (
    <div className="w-full max-w-[60%] ">
      {/* Container */}
      <div className="flex justify-center items-center ">
        {files[0].type === "IMAGE" ? (
          <img
            src={files[0].fileData}
            alt={files[0].file.name}
            className="max-w-[80%] object-contain hview"
          />
        ) : (
          <div className="min-w-full hview flex flex-col items-center justify-center">
            {/* File Icon Image */}
            <img
              src={`../../../../images/file/${files[0].type}.png`}
              alt={files[0].type}
            />
            {/* No preview text */}
            <h1 className="dark:text-dark_text_2 text-2xl">
              No preview available
            </h1>
            {/* File size / type */}
            <span className="dark:text-dark_text_2">
              {files[0].file.size} KB - {files[0].type}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileViewer;
