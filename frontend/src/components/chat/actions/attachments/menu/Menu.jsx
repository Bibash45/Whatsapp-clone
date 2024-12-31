import React, { useState } from "react";
import {
  CameraIcon,
  ContactIcon,
  PollIcon,
  StickerIcon,
} from "../../../../../svg";
import PhotoAttacment from "./PhotoAttacment";
import DocumentAttachment from "./DocumentAttachment";

const Menu = () => {
  return (
    <ul className="absolute bottom-14 openEmojiAnimation">
      <li>
        <button type="button" className="rounded-full">
          <PollIcon />
        </button>
      </li>
      <li>
        <button type="button" className="bg-[#0EABF4] rounded-full">
          <ContactIcon />
        </button>
      </li>
      <DocumentAttachment />
      <li>
        <button type="button" className="rounded-full bg-[#D3396D]">
          <CameraIcon />
        </button>
      </li>
      <li>
        <button type="button" className="rounded-full">
          <StickerIcon />
        </button>
      </li>
      <PhotoAttacment />
    </ul>
  );
};

export default Menu;
