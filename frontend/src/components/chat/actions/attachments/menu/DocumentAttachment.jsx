import React, { useRef } from "react";
import { DocumentIcon } from "../../../../../svg";
import { useDispatch } from "react-redux";
import { addFiles } from "../../../../../features/chatSlice";
import { getFileType } from "../../../../../utils/file";

const DocumentAttachment = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const documentHandler = (e) => {
    let files = Array.from(e.target.files);
    files.forEach((file) => {
      console.log(file);

      if (
        file.type !== "application/pdf" &&
        file.type !== "text/plain" &&
        file.type !== "application/msword" &&
        file.type !==
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" &&
        file.type !== "application,application/vnd.ms-powerpoint" &&
        file.type !==
          "application/vnd.openxmlformats-officedocument.presentationml.presentation" &&
        file.type !== "application/vnd.ms-excel" &&
        file.type !== "application/zip" &&
        file.type !== "application/vnd.rar" &&
        file.type !== "audio/mp3" &&
        file.type !== "video/wav"
      ) {
        files = files.filter((item) => item.name !== file.name);
        return;
      } else if (file.size > 1024 * 1024 * 10) {
        files = files.filter((item) => item.name !== file.name);
        return;
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          dispatch(
            addFiles({
              file: file,
              type: getFileType(file.type),
            })
          );
        };
      }
    });
  };
  return (
    <li>
      <button
        onClick={() => inputRef.current.click()}
        type="button"
        className="rounded-full bg-[#5F66CD]"
      >
        <DocumentIcon />
      </button>
      <input
        type="file"
        hidden
        ref={inputRef}
        accept="application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.ms-excel,application/zip,application/vnd.rar,audio/mp3,video/wav"
        onChange={documentHandler}
        multiple
      />
    </li>
  );
};

export default DocumentAttachment;
