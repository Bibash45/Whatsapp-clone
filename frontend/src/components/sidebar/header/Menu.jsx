import React from "react";
import { logout } from "../../../features/userSlice";
import { useDispatch } from "react-redux";

const Menu = () => {
  const dispatch = useDispatch();
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };
  return (
    <div className="absolute right-1 z-50 dark:bg-dark_bg_2 dark:text-dark_text_1 shadow-md w-52">
      <ul>
        <li className="py-3 pl-5 cursor-pointer hover:bg-dark_bg_3">
          <span>New group</span>
        </li>
        <li className="py-3 pl-5 cursor-pointerl hover:bg-dark_bg_3">
          <span>New community</span>
        </li>
        <li className="py-3 pl-5 cursor-pointerl hover:bg-dark_bg_3">
          <span>New messages</span>
        </li>
        <li className="py-3 pl-5 cursor-pointerl hover:bg-dark_bg_3">
          <span>Setting</span>
        </li>
        <li
          className="py-3 pl-5 cursor-pointerl hover:bg-dark_bg_3"
          onClick={handleLogout}
        >
          <span>Logout</span>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
