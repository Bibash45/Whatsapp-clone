import React, { useRef } from "react";
import { PhotoIcon } from "../../../../../svg";
import { useDispatch, useSelector } from "react-redux";
import { addFiles } from "../../../../../features/chatSlice";

const PhotoAttacment = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const { files } = useSelector((state) => state.chat);
  console.log(files);

  const imageHandler = (e) => {
    let files = Array.from(e.target.files);
    files.forEach((img) => {
      console.log(img);

      if (
        img.type !== "image/png" &&
        img.type !== "image/png" &&
        img.type !== "image/jpeg" &&
        img.type !== "image/jpg" &&
        img.type !== "image/gif"
      ) {
        files = files.filter((item) => item.name !== img.name);
        return;
      } else if (img.size > 1024 * 1024 * 10) {
        files = files.filter((item) => item.name !== img.name);
        return;
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = (e) => {
          dispatch(
            addFiles({ file: img, imgData: e.target.result, type: "image" })
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
          accept="image/png,image/jpeg,image/gif,image/webp,image/jpg"
          onChange={imageHandler}
          multiple
        />
      </button>
    </li>
  );
};

export default PhotoAttacment;
