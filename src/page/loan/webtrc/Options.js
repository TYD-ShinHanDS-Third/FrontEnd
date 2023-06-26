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
            <label>Make A Call</label>
            <br />
            <input
              type="text"
              label="ID to call"
              value={idToCall}
              onChange={(e) => setIdToCall(e.target.value)}
            />
          </form>
          <br />
          {context.callAccepted && !context.callEnded ? (
            <button
              onClick={() => {
                context.leaveCall();
              }}
            >
              Hang Up
            </button>
          ) : (
            <button onClick={() => context.callUser(idToCall)}>Call</button>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Options;
