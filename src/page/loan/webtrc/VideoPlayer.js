import React, { useContext } from "react";
import "../../../css/loan/WebRtc.css";
import { SocketContext, ContextProvider } from "../../../SocketContext";
import { useEffect } from "react";
import LoanApply from "../LoanApply";

const VideoPlayer = () => {
  const context = useContext(SocketContext);

  return (
    <div className="videos" id="video">
      {context.stream && (
        <div>
          <div className="floatingName">
            <h3>{context.name || "사용자 이름"}</h3>
          </div>

          <video
            playsInline
            muted
            ref={context.myVideo}
            autoPlay
            className="Video"
          ></video>
        </div>
      )}

      {context.callAccepted && !context.callEnded && (
        <div>
          <div className="floatingName">
            <h3>{"상대방"}</h3>
          </div>
          <video
            playsInline
            muted={context.callMuted}
            autoPlay
            ref={context.userVideo}
            className="Video"
          ></video>
          {!context.callMuted ? (
            <button onClick={context.muteCall}> Mute </button>
          ) : (
            <button onClick={context.unMuteCall}> Unmute </button>
          )}
        </div>
      )}
    </div>
  );
};
export default VideoPlayer;
