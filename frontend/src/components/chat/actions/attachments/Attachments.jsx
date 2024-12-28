import React, { useState } from "react";
import { AttachmentIcon } from "../../../../svg";
import Menu from "./Menu";

const Attachments = ({
  showAttachments,
  setShowAttachments,
  setShowEmojis,
}) => {
  return (
    <li className="relative">
      <button
        onClick={() => {
          setShowAttachments((prev) => !prev);
          setShowEmojis(false);
        }}
        className="btn"
        type="button"
      >
        <AttachmentIcon className="dark:fill-dark_svg_1" />
      </button>
      {/* Menu */}
      {showAttachments ? <Menu /> : null}
    </li>
  );
};

export default Attachments;
