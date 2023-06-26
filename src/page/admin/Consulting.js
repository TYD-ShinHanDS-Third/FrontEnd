import React from "react";
import "../../css/admin/Consulting.css";
import { ContextProvider, SocketContext } from "../../SocketContext";
import { useContext } from "react";
import Options from "../loan/webtrc/Options";
import { Notifications } from "@mui/icons-material";
import VideoPlayer from "../loan/webtrc/VideoPlayer";

function Consulting(props) {
  return (
    <div className="managedocs">
      <div className="managedocs_header">
        <div className="managedocs_title">
          <h2>버팀목 전세자금 대출 - 회원 이름</h2>
        </div>
      </div>

      <div className="managedocs_body">
        <hr className="loanhr" />
        <div className="consulting">
          <div className="loanapply_detail">
            <ContextProvider>
              <My />
            </ContextProvider>
          </div>
          <div className="loanapply_chat">
            <div className="chat_context">
              <div className="you">
                <h3>상담을 시작합니다.</h3>
                <h3>상담을 시작.</h3>
              </div>
              <div className="me">
                <h3>안녕하세요!!</h3>
                <h3>!!sdhfjshk</h3>
                <h3>!!sdffsd</h3>
              </div>
            </div>

            <hr style={{ marginBottom: "0" }} />
            <div className="chat_input">
              <textarea
                className="input_context"
                style={{
                  width: "100%",
                  height: "90%",
                  textAlign: "left",
                }}
              />
              <button className="send">전송</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const My = () => {
  return (
    <div>
      <Options>
        <Notifications />
      </Options>
      <VideoPlayer />
    </div>
  );
};

export default Consulting;
