import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Add from "./Add";
import { CloseIcon, SendIcon } from "../../../../svg";
import { uploadFiles } from "../../../../utils/upload";
import {
  clearFiles,
  removeFileFromFiles,
  sendMessage,
} from "../../../../features/chatSlice";
import SocketContext from "../../../../context/SocketContext";
import { ClipLoader } from "react-spinners";

const HandleAndSend = ({ setActiveIndex, activeIndex, message, socket }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.user);
  const { token } = user;
  const { files, activeConversation } = useSelector((state) => state.chat);

  // send message handler
  const sendMessageHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    //  upload files first
    const uploaded_files = await uploadFiles(files);

    // send the message
    const values = {
      token,
      message,
      convo_id: activeConversation._id,
      files: uploaded_files.length > 0 ? uploaded_files : [],
    };
    let newMsg = await dispatch(sendMessage(values));
    socket.emit("send message", newMsg.payload);
    setLoading(false);
    setActiveIndex(0);
    dispatch(clearFiles());
  };
  // handle remove file
  const handleRemoveFile = (index) => {
    dispatch(removeFileFromFiles(index));
  };
  return (
    <div className="w-[97%] flex items-center justify-between mt-2 border-t dark:border-dark_border_2">
      {/* Empty  */}
      <span></span>
      {/* List files */}
      <div className="flex gap-x-2 mt-2 ">
        {files.map((file, i) => {
          return (
            <>
              <div
                key={i}
                className={`fileThumbnail relative w-14 h-14 border dark:border-white rounded-md overflow-hidden cursor-pointer ${
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
                ) : file.type === "VIDEO" ? (
                  <video src={file.fileData}></video>
                ) : (
                  <img
                    src={`../../../../images/file/${files[0].type}.png`}
                    alt="file"
                    className="h-10 w-8 mt-1.5 ml-2.5"
                  />
                )}
                {/* Remove file icon */}
                <div
                  onClick={() => handleRemoveFile(i)}
                  className="removeFileIcon hidden"
                >
                  <CloseIcon className="dark:fill-white absolute right-1 top-0 w-4 h-4" />
                </div>
              </div>
            </>
          );
        })}
        <Add setActiveIndex={setActiveIndex} />
        {/* /* Add another file button */}
      </div>
      {/* Send button */}
      <div
        className="bg-green_1 w-16 h-16 mt-2 rounded-full flex items-center justify-center cursor-pointer"
        onClick={(e) => sendMessageHandler(e)}
      >
        {loading ? (
          <ClipLoader color="#E9EDEF" size={25} />
        ) : (
          <SendIcon className="fill-white" />
        )}
      </div>
    </div>
  );
};

const HandleAndSendWithContext = (props) => (
  <SocketContext.Consumer>
    {(socket) => <HandleAndSend {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default HandleAndSendWithContext;
