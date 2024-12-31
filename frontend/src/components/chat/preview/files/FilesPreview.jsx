import React, { useState } from "react";
import Header from "./Header";
import FileViewer from "./FileViewer";
import Input from "./Input";
import HandleAndSend from "./HandleAndSend";

const FilesPreview = () => {
  const [message, setMessage] = useState("");
  
  return (
    <div className="relative py-2 w-full flex items-center justify-center">
      {/* Container */}
      <div className="w-full flex flex-col items-center">
        {/* Header */}
        <Header />
        {/* Viewing selected file */}
        <FileViewer />
        <div className="w-full flex flex-col items-center">
          {/* Message Input */}
          <Input message={message} setMessage={setMessage} />
          {/*  Send and manipulate files */}
          <HandleAndSend />
        </div>
      </div>
    </div>
  );
};

export default FilesPreview;
