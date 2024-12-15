import React from "react";
import Registerform from "../components/auth/Registerform";

const register = () => {
  return (
    <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[19px] overflow-hidden">
      {/* container */}
      <div className="flex w-[1600px] mx-auto h-full">
        {/* Register form */}
        <Registerform />
      </div>
    </div>
  );
};

export default register;
