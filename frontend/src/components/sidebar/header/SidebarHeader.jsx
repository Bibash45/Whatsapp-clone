import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ChatIcon, CommunityIcon, DotsIcon, StoryIcon } from "../../../svg";
import Menu from "./Menu";


const SidebarHeader = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { user } = useSelector((state) => state.user);

  return (
    <div className="h-[50px] dark:bg-dark_bg_2 flex items-center p16">
      {/* container */}
      <div className="w-full flex items-center justify-between ">
        {/* userImage */}
        <button className="btn">
          <img
            src={user.picture}
            alt={user.name}
            className="h-full w-full rounded-full object-cover "
          />
        </button>
        {/* user icons */}
        <ul className="flex items-center gap-x-2.5">
          <li>
            <button className="btn">
              <CommunityIcon className="dark:fill-dark_svg_2" />
            </button>
          </li>
          <li>
            <button className="btn">
              <StoryIcon className="dark:fill-dark_svg_2" />
            </button>
          </li>
          <li>
            <button className="btn">
              <ChatIcon className="dark:fill-dark_svg_2" />
            </button>
          </li>
          <li className="relative" onClick={() => setShowMenu((prev) => !prev)}>
            <button className={`btn ${showMenu ? 'bg-dark_hover_1' : ""}`} >
              <DotsIcon className="dark:fill-dark_svg_2" />
            </button>
            {showMenu ? <Menu /> : null}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarHeader;
