import React from "react";
import Ringing from "./Ringing";

const Call = ({ call, setCall, callAccepted }) => {
  const { receivingCall, callEnded } = call;

  return (
    <div>
      {
        receivingCall && !callAccepted && <Ringing call={call} setCall={setCall} />
      }
    </div>
  );
};

export default Call;
