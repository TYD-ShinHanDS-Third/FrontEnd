import React, { useCallback, useEffect, useRef, useState } from "react";
import "../../css/admin/Consulting.css";
import { ContextProvider, SocketContext } from "../../SocketContext";
import { useContext } from "react";
import Options from "../loan/webtrc/Options";
import { Notifications } from "@mui/icons-material";
import VideoPlayer from "../loan/webtrc/VideoPlayer";
import axios from "axios";
import { useLocation } from "react-router";
import { Cookies } from "react-cookie";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import Modal from "../loan/Modal";

function Consulting(props) {
  const [msg, setMsg] = useState("");
  const [myname, setMyname] = useState("");
  const [room, setRoom] = useState("");
  const [chatt, setChatt] = useState([]);
  const [socketData, setSocketData] = useState();
  const [bankname, setBankname] = useState("");
  const [loanname, setLoanname] = useState("");
  const ws = useRef(null); //webSocket을 담는 변수,
  //컴포넌트가 변경될 때 객체가 유지되어야하므로 'ref'로 저장

  const [user, setUser] = useState({});

  //스크롤
  const scrollRef = useRef();

  const msgBox = chatt.map((item, idx) => (
    <div key={idx} className={item.myname === myname ? "me" : "you"}>
      <h3>{item.msg}</h3>
      <span>[ {item.date} ]</span>
    </div>
  ));

  async function makeRoom(t, b, l, id) {
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
          loanid: id,
        },
      })
      .then((res) => {
        if (res.data.message === "관리자입니다, 이전 채팅방에 입장합니다.") {
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

  //사용자 정보 불러오기
  async function getUserInfo(id) {
    const url = "/hows/admin/userinfoshow";
    axios
      .get(url, {
        headers: {
          "Content-Type": `application/json`,
        },
        params: {
          memberid: id,
        },
      })
      .then((res) => {
        let birth = res.data.bday.substring(0, 10);
        let hire = res.data.hiredate.substring(0, 4);
        setUser({
          hiredate: hire,
          bday: birth,
          membername: res.data.membername,
          phone: res.data.phone,
          hasjob: res.data.hasjob,
          jobname: res.data.jobname,
          haschild: res.data.haschild,
          marry: res.data.marry,
        });
      })
      .catch((ex) => {
        console.log("requset fail : " + ex);
      });
  }

  const location = useLocation();

  useEffect(() => {
    setBankname(location.state.bankname);
    setLoanname(location.state.loanname);
    setRoom(location.state.room);
    const cookies = new Cookies();
    makeRoom(
      cookies.get("jwtToken"),
      location.state.bankname,
      location.state.loanname,
      location.state.loanid
    );
    getUserInfo(location.state.userid);
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

  const endChatting = (e) => {
    const url = "/hows/admin/chatend";
    axios
      .put(url, null, {
        headers: {
          "Content-Type": `application/json`,
        },
        params: {
          memloanid: location.state.loanid,
        },
      })
      .then((res) => {
        if (res.data === "success") {
          console.log("상담종료");
        }
      })
      .catch((ex) => {
        console.log("requset fail : " + ex);
      });
  };

  return (
    <div>
      <div className="loanapply">
        <div className="loanapply_detail" id="loanapply_detail">
          <table>
            <td>이름</td>
            <td>{user.membername}</td>
            <tr />
            <td>생년월일</td>
            <td>{user.bday}</td>
            <tr />
            <td>전화번호</td>
            <td>{user.phone}</td>
            <tr />
            <td>직장</td>
            <td>{user.hasjob === 1 ? "O" : user.hasjob === 0 ? "X" : ""}</td>
            <tr />
            <td>직장명</td>
            <td>{user.jobname}</td>
            <tr />
            <td>입사년도</td>
            <td>{user.hiredate}</td>
            <tr />
            <td>결혼</td>
            <td>
              {user.marry === 1 ? "기혼" : user.marry === 0 ? "미혼" : ""}
            </td>
            <tr />
            <td>자녀</td>
            <td>
              {user.haschild === 0
                ? "없음"
                : user.hasjob === 1
                ? "1명"
                : user.hasjob === 2
                ? "2명 이상"
                : ""}
            </td>
          </table>

          {/* <ContextProvider>
          <My />
        </ContextProvider> */}
        </div>
        <div className="loanapply_chat">
          <GlobalStyle />
          <div id="chat_context">
            <div id="chatt">
              <div id="chatTitle">
                <h3 id="title">
                  [{bankname}] {loanname}
                </h3>
                <button className="endChat" onClick={endChatting}>
                  상담종료
                </button>
              </div>
              <br />
              <div id="talk">
                {msgBox}
                <div ref={scrollRef}></div>
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
