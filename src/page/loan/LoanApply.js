import React from "react";
import "../../css/loan/LoanApply.css";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { useCallback } from "react";
import { Cookies } from "react-cookie";
import axios from "axios";
import Options from "./webtrc/Options";
import VideoPlayer from "./webtrc/VideoPlayer";
import Notifications from "./webtrc/Notifications";
import { ContextProvider, SocketContext } from "../../SocketContext";
import { useContext } from "react";
import Modal from "./Modal";

function LoanApply(props) {
  const [msg, setMsg] = useState("");
  const [myname, setMyname] = useState("");
  const [room, setRoom] = useState("");
  const [chatt, setChatt] = useState([]);
  const [socketData, setSocketData] = useState();
  const [bankname, setBankname] = useState("");
  const [loanname, setLoanname] = useState("");
  const [loanstate, setLoanstate] = useState("");
  const ws = useRef(null); //webSocket을 담는 변수,
  //컴포넌트가 변경될 때 객체가 유지되어야하므로 'ref'로 저장
  const context = useContext(SocketContext);
  //스크롤
  const scrollRef = useRef();

  //대출 상품 정보 조회
  const [divHtml, setDivHtml] = useState([]);
  const arr = [];

  const msgBox = chatt.map((item, idx) => (
    <div key={idx} className={item.myname === myname ? "me" : "you"}>
      <h3>{item.msg}</h3>
      <span>[ {item.date} ]</span>
    </div>
  ));

  async function makeRoom(t, b, l) {
    const url = "/hows/loan/detail/consult";
    axios
      .get(url, {
        headers: {
          "Content-Type": `application/json`,
          token: t,
        },
        params: {
          bankname: b,
          loanname: l,
        },
      })
      .then((res) => {
        if (
          res.data.message ===
          "상담 신청 내역이 있습니다, 이전 채팅방에 입장합니다."
        ) {
          let historylist = [];
          res.data.chathistory.map((history) => {
            const hName = history.myname;
            const hMsg = history.msg;
            const hRoom = history.chatroom.roomId;
            let hDate = history.time;
            hDate = new Date(hDate).toLocaleDateString();
            const historyChat = {
              myname: hName,
              msg: hMsg,
              room: hRoom,
              date: hDate,
            };
            historylist.push(historyChat);
          });
          setChatt(historylist);
        }
        setRoom(res.data.room);
        setMyname(res.data.myname);
      })
      .catch((ex) => {
        console.log("requset fail : " + ex);
      });
  }

  function getDetail(loan, bank) {
    const url = "/hows/loan/detail";
    axios
      .get(url, {
        headers: {
          "Content-Type": `application/json`,
        },
        params: {
          loanname: loan,
          bankname: bank,
        },
      })
      .then((res) => {
        for (let key in res.data) {
          arr.push(res.data[key]);
        }
        setDivHtml(arr);
      })
      .catch((ex) => {
        console.log("requset fail : " + ex);
      });
  }

  const location = useLocation();

  useEffect(() => {
    setBankname(location.state.bankname);
    setLoanname(location.state.loanname);
    setLoanstate(location.state.loanstate);
    setRoom(location.state.room === undefined ? "" : location.state.room);
    const cookies = new Cookies();
    makeRoom(
      cookies.get("jwtToken"),
      location.state.bankname,
      location.state.loanname
    );
    getDetail(location.state.loanname, location.state.bankname);
  }, []);

  useEffect(() => {
    if (socketData !== undefined) {
      const tempData = chatt.concat(socketData);
      setChatt(tempData);
    }
  }, [socketData]);

  useEffect(() => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  }, [msgBox]);

  const GlobalStyle = createGlobalStyle`  //css 초기화가 된 component
        ${reset}
    `;

  const onText = (event) => {
    setMsg(event.target.value);
  };

  const webSocketLogin = useCallback(() => {
    ws.current = new WebSocket("ws://192.168.0.103:8888/socket/chatt/" + room);

    ws.current.onmessage = (message) => {
      const dataSet = JSON.parse(message.data);
      setSocketData(dataSet);
    };
  });

  const send = useCallback(() => {
    webSocketLogin();

    if (msg !== "") {
      const data = {
        myname,
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

  return (
    <div className="loanapply">
      <ContextProvider>
        <div className="loanapply_detail" id="loanapply_detail">
          <div>
            <Options>
              <Notifications />
            </Options>
            <VideoPlayer loanname={loanname} />
          </div>
          <br />
          {divHtml.map((item1, index) => {
            if (index > 2) {
              return <div dangerouslySetInnerHTML={{ __html: item1 }}></div>;
            }
          })}
        </div>
        <div className="loanapply_chat">
          <GlobalStyle />
          <div id="chat_context">
            <div id="chatt">
              <div id="chatTitle">
                <h3 id="title">
                  [{bankname}] {loanname}
                </h3>
                <Modal loanname={loanname} bankname={bankname} consult="1" />
              </div>
              <br />
              <div id="talk">
                {msgBox}
                <div ref={scrollRef}></div>
              </div>
              <div id="sendZone">
                <textarea
                  id="msg"
                  value={
                    loanstate !== "상담신청" ? "종료된 채팅방입니다." : msg
                  }
                  onChange={onText}
                  onKeyDown={(ev) => {
                    if (ev.keyCode === 13) {
                      send();
                    }
                  }}
                  disabled={loanstate !== "상담신청"}
                ></textarea>
                <input type="button" value="전송" id="btnSend" onClick={send} />
              </div>
            </div>
          </div>
        </div>
      </ContextProvider>
    </div>
  );
}

export default LoanApply;
