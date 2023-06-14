import React from "react";
import "../../css/loan/LoanApply.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { useCallback } from "react";
import { Cookies } from "react-cookie";

function LoanApply(props) {
  const [msg, setMsg] = useState("");
  const [token, setToken] = useState("");
  const [room, setRoom] = useState("");
  const [chatt, setChatt] = useState([]);
  const [chkLog, setChkLog] = useState(false);
  const [socketData, setSocketData] = useState();

  const ws = useRef(null); //webSocket을 담는 변수,
  //컴포넌트가 변경될 때 객체가 유지되어야하므로 'ref'로 저장

  const msgBox = chatt.map((item, idx) => (
    <div key={idx} className={item.token === token ? "me" : "you"}>
      <h3>{item.msg}</h3>
      <span>[ {item.date} ]</span>
    </div>
  ));

  useEffect(() => {
    const cookies = new Cookies();
    setToken(cookies.get("jwtToken"));
    setRoom(100);

    if (socketData !== undefined) {
      const tempData = chatt.concat(socketData);
      console.log(tempData);
      setChatt(tempData);
    }
  }, [socketData]);

  const GlobalStyle = createGlobalStyle`  //css 초기화가 된 component
        ${reset}
    `;

  //webSocket
  //webSocket
  //webSocket
  //webSocket
  //webSocket
  //webSocket
  const onText = (event) => {
    console.log(event.target.value);
    setMsg(event.target.value);
  };

  const webSocketLogin = useCallback(() => {
    ws.current = new WebSocket("ws://192.168.0.103:8888/socket/chatt/" + room);

    ws.current.onmessage = (message) => {
      const dataSet = JSON.parse(message.data);
      console.log(message);
      setSocketData(dataSet);
    };
  });

  const send = useCallback(() => {
    if (!chkLog) {
      if (token === "") {
        alert("이름을 입력하세요.");
        document.getElementById("token").focus();
        return;
      }
      webSocketLogin();
      setChkLog(true);
    }

    if (msg !== "") {
      const data = {
        token,
        msg,
        room,
        date: new Date().toLocaleString(),
      }; //전송 데이터(JSON)

      const temp = JSON.stringify(data);

      if (ws.current.readyState === 0) {
        //readyState는 웹 소켓 연결 상태를 나타냄
        ws.current.onopen = () => {
          //webSocket이 맺어지고 난 후, 실행
          console.log(ws.current.readyState);
          ws.current.send(temp);
        };
      } else {
        ws.current.send(temp);
      }
    } else {
      alert("메세지를 입력하세요.");
      document.getElementById("msg").focus();
      return;
    }
    setMsg("");
  });
  //webSocket
  //webSocket

  return (
    <div className="loanapply">
      <div className="loanapply_detail">
        <h1>여기 상품 설명</h1>
      </div>
      <div className="loanapply_chat">
        <GlobalStyle />
        <div id="chat_context">
          <div id="chatt">
            <h3 id="title">[신한] 버팀목 전세자금 대출</h3>
            <br />
            <div id="talk">
              <div className="talk-shadow"></div>
              {msgBox}
            </div>
            <div id="sendZone">
              <textarea
                id="msg"
                value={msg}
                onChange={onText}
                onKeyDown={(ev) => {
                  if (ev.keyCode === 13) {
                    send();
                  }
                }}
              ></textarea>
              <input type="button" value="전송" id="btnSend" onClick={send} />
            </div>
          </div>
        </div>

        {/* <hr style={{ marginBottom: "0" }} />
        <div className="chat_input">
          <textarea
            className="input_context"
            style={{
              width: "100%",
              height: "90%",
              textAlign: "left",
            }}
            id="msg"
            value={msg}
            onChange={onText}
            onKeyDown={(ev) => {
              if (ev.keyCode === 13) {
                send();
              }
            }}
          />
          <button className="send">전송</button>
        </div> */}
      </div>

      <Link to="/hows/loan/detail/limit/uploaddocs">
        <button className="consultbtn">대출 자료 제출</button>
      </Link>
    </div>
  );
}

export default LoanApply;
