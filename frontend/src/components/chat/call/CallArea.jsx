import React from "react";
import { capitalize } from "../../../utils/string";

const CallArea = ({ name }) => {
  return (
    <div className="absolute top-12 w-full p-1">
      {/* Container */}
      <div className="flex flex-col items-center">
        {/* Call infos */}
        <div className="flex flex-col items-center gap-y-1">
          <h1 className="text-white text-lg ">
            <b>{name ? capitalize(name) : ""}</b>
          </h1>
          <span className="text-dark_text_1">Ringing...</span>
        </div>
      </div>
    </div>
  );
};

export default CallArea;
