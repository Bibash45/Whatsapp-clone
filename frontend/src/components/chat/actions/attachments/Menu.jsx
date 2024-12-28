import React, { useState } from "react";
import {
  CameraIcon,
  ContactIcon,
  DocumentIcon,
  PhotoIcon,
  PollIcon,
  StickerIcon,
} from "../../../../svg";

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
      <li>
        <button type="button" className="rounded-full bg-[#5F66CD]">
          <DocumentIcon />
        </button>
      </li>
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
      <li>
        <button type="button" className="rounded-full bg-[#BF59CF]">
          <PhotoIcon />
        </button>
      </li>
    </ul>
  );
};

export default Menu;
