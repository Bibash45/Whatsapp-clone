import React from "react";
import { useSelector } from "react-redux";
import Add from "./Add";
import { SendIcon } from "../../../../svg";

const HandleAndSend = ({ setActiveIndex, activeIndex }) => {
  const { files } = useSelector((state) => state.chat);
  return (
    <div className="w-[97%] flex items-center justify-between mt-2 border-t dark:border-dark_border_2">
      {/* Empty  */}
      <span></span>
      {/* List files */}
      <div className="flex gap-x-2">
        {files.map((file, i) => {
          return (
            <div
              key={i}
              className={`w-14 h-14 border dark:border-white mt-2 rounded-md overflow-hidden cursor-pointer ${
                activeIndex === i ? "border-[3px] !border-green_1" : ""
              } `}
              onClick={() => setActiveIndex(i)}
            >
              {file.type === "IMAGE" ? (
                <img
                  src={file.fileData}
                  alt="img"
                  className="w-full h-full object-cover "
                />
              ) : (
                <img
                  src={`../../../../images/file/${files[0].type}.png`}
                  alt="file"
                  className="h-10 w-8 mt-1.5 ml-2.5"
                />
              )}
            </div>
          );
        })}
        /* Add another file button */
        <Add setActiveIndex={setActiveIndex} />
      </div>
      {/* Send button */}
      <div className="bg-green_1 w-16 h-16 mt-2 rounded-full flex items-center justify-center cursor-pointer">
        <SendIcon className="fill-white" />
      </div>
    </div>
  );
};

export default HandleAndSend;
