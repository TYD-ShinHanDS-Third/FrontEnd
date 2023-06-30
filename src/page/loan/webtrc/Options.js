import React, { useContext, useState } from "react";
import { SocketContext } from "../../../SocketContext";

const Options = ({ children }) => {
  const context = useContext(SocketContext);
  const [idToCall, setIdToCall] = useState("");

  return (
    <div>
      <div className="options">
        <div className="option">
          <h3>사용자 ID: {context.me}</h3>
        </div>
        <div className="option">
          <form noValidate autoComplete="off">
            <br />
            <input
              type="text"
              label="ID to call"
              placeholder="번호를 입력하세요"
              value={idToCall}
              onChange={(e) => setIdToCall(e.target.value)}
            />
          </form>
          <br />
          {context.callAccepted && !context.callEnded ? (
            <button
              className="videobtn"
              onClick={() => {
                context.leaveCall();
              }}
            >
              전화끊기
            </button>
          ) : (
            <button
              className="videobtn"
              onClick={() => context.callUser(idToCall)}
            >
              전화
            </button>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Options;
