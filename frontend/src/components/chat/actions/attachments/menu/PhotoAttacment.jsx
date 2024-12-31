import React, { useRef } from "react";
import { PhotoIcon } from "../../../../../svg";
import { useDispatch, useSelector } from "react-redux";
import { addFiles } from "../../../../../features/chatSlice";
import { getFileType } from "../../../../../utils/file";

const PhotoAttacment = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const { files } = useSelector((state) => state.chat);
  console.log(files);

  const imageHandler = (e) => {
    let files = Array.from(e.target.files);
    files.forEach((file) => {
      console.log(file);

      if (
        file.type !== "image/png" &&
        file.type !== "image/png" &&
        file.type !== "image/jpeg" &&
        file.type !== "image/jpg" &&
        file.type !== "image/gif" &&
        file.type !== "image/webp" &&
        file.type !== "video/mp4" &&
        file.type !== "video/mpeg" &&
        file.type !== "video/webm"
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
              fileData: e.target.result,
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
        type="button"
        onClick={() => inputRef.current.click()}
        className="rounded-full bg-[#BF59CF]"
      >
        <PhotoIcon />
        <input
          type="file"
          hidden
          ref={inputRef}
          accept="image/png,image/jpeg,image/gif,image/webp,image/jpg,video/webm,video/mpeg,video/mp4"
          onChange={imageHandler}
          multiple
        />
      </button>
    </li>
  );
};

export default PhotoAttacment;
