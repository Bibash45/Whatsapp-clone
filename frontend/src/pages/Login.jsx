import React from "react";
import { Loginform } from "../components/auth/Loginform";

const login = () => {
  return (
    <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[19px] overflow-hidden">
      {/* container */}
      <div className="flex w-[1600px] mx-auto h-full">
        {/* Login form */}
        <Loginform />
      </div>
    </div>
  );
};

export default login;
