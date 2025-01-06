import React from "react";
import FileOthers from "./FileOthers";

const FileImageVideo = ({ type, url }) => {
  return (
    <div>
      {type === "IMAGE" ? (
        <img src={url} alt="img" className="cursor-pointer" />
      ) : (
        <video src={url} controls className="cursor-pointer"></video>
      )}
    </div>
  );
};

export default FileImageVideo;
