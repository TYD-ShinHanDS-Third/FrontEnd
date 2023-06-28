import React from "react";
import "../../css/my/MyPage.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Cookies from "universal-cookie";
import { confirmAlert } from "react-confirm-alert";
import Modal from "./Modal";

export default function MyPage(props) {
  //token 가져오기
  const cookies = new Cookies();
  const token = cookies.get("jwtToken");

  const [modalOpen, setModalOpen] = useState(false);

  //은행명
  const [bank, setBank] = useState("");

  const bankChange = (event) => {
    setBank(event.target.value);
    setUserInfo({ ...userInfo, accBank: event.target.value });
  };

  //비밀번호 확인
  const [passwordConfirmMessage, setPasswordConfirmMessage] =
    useState("비밀번호를 입력하세요.");
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

  const inputChange = (e) => {
    if (e.target.name !== "pswdChk") {
      setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    }
    if (e.target.name === "pswdChk") {
      if (userInfo.pswd === e.target.value) {
        setPasswordConfirmMessage("비밀번호 일치");
        setIsPasswordConfirm(true);
      } else {
        setPasswordConfirmMessage("비밀번호 불일치");
        setIsPasswordConfirm(false);
      }
    } else if (e.target.name === "pswd") {
      const passChk = document.getElementById("pswdChk").value;
      if (passChk === e.target.value) {
        setPasswordConfirmMessage("비밀번호 일치");
        setIsPasswordConfirm(true);
      } else {
        setPasswordConfirmMessage("비밀번호 불일치");
        setIsPasswordConfirm(false);
      }
    }
  };

  //내 대출 정보
  const [myPanList, setMyPanList] = useState([]);
  const [myLoanList, setMyLoanList] = useState([]);

  //즐겨찾기 불러오기
  let favoriteList = [];

  //채팅
  const [myChat, setMyChat] = useState([]);

  const [userInfo, setUserInfo] = useState({});

  //회원정보 조회 및 수정 버전 확인
  const [version, setVersion] = useState(1);

  //저장된 회원정보 가져오기
  async function getUserInfo(token) {
    const URL = "/hows/auth/mypage";

    axios
      .get(URL, {
        headers: {
          token: token,
        },
      })
      .then((res) => {
        console.log(res.data);
        let hire = res.data.hiredate.substring(0, 4);
        let birth = res.data.bday.substring(0, 10);
        setUserInfo({
          hiredate: hire,
          bday: birth,
          membername: res.data.membername,
          memberid: res.data.memberid,
          phone: res.data.phone,
          memberLevel: res.data.memberLevel,
          accBank: res.data.accBank,
          accno: res.data.accno,
          hasjob: res.data.hasjob,
          jobname: res.data.jobname,
          marry: res.data.marry,
          haschild: res.data.haschild,
        });

        setBank(res.data.accBank);
      })
      .catch((ex) => {
        console.log("fail : " + ex);
      })
      .finally(() => {
        console.log("request end");
      });
  }

  //채팅방 이동
  const navigate = useNavigate();
  async function moveChatRoom(chatroom) {
    navigate("/hows/loan/detail/consult", { state: chatroom });
  }

  //내 대출/채팅 목록 불러오기
  async function getChatList(token) {
    const url = "/hows/my/mypage/loan";
    axios
      .get(url, {
        headers: {
          token: token,
        },
      })
      .then(function (response) {
        setMyLoanList(response.data[0]);
        setMyChat(response.data[1]);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => {
        console.log("request end");
      });
  }

  //즐겨찾기 불러오기
  async function getFavorites(token) {
    const url = "/hows/my/mypage/pan";
    await axios
      .get(url, {
        headers: {
          token: token,
        },
      })
      .then(function (response) {
        setMyPanList(response.data);
        for (const [index, element] of response.data.entries()) {
          let endDate = new Date(element.end);
          endDate.setDate(endDate.getDate() + 1);

          const favorite = {
            title: element.title,
            start: element.start,
            end: endDate,
            backgroundColor:
              index % 3 === 0
                ? "#031389"
                : index % 3 === 1
                ? "#FFFEDD"
                : "#609966",
            borderColor:
              index % 3 === 0
                ? "#031389"
                : index % 3 === 1
                ? "#FFFEDD"
                : "#609966",
            textColor:
              index % 3 === 0 ? "white" : index % 3 === 1 ? "black" : "white",
          };
          favoriteList.push(favorite);
        }
        setMyPanList(favoriteList);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    const cookies = new Cookies();
    const jwtToken = cookies.get("jwtToken");
    getUserInfo(jwtToken);
    getFavorites(jwtToken);
    getChatList(jwtToken);
  }, []);

  //회원 정보 수정
  function editInfo(token) {
    if (version === -1) {
      const url = "/member/update";
      axios
        .put(url, JSON.stringify(userInfo), {
          headers: {
            "Content-Type": `application/json`,
            token: token,
          },
        })
        .then((res) => {
          if (res.data === "success") {
            confirmAlert({
              title: "수정완료",
              buttons: [
                {
                  label: "확인",
                  style: { backgroundColor: "#518e65" },
                  onClick: () => {},
                },
              ],
            });
          } else {
            console.log("update fail");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    setVersion(version * -1);
  }

  const openModal = () => {
    setModalOpen(true);
  };

  return (
    <div className="myPage">
      <div className="myContainer1">
        <div className="myInfo">
          <div className="memberTitle">
            <h2>회원정보</h2>
            <button
              onClick={() => editInfo(token)}
              disabled={version === -1 && !isPasswordConfirm}
              className="editSaveBtn"
            >
              {version === 1 ? "회원정보 수정" : "회원정보 저장"}
            </button>
          </div>
          <div className="leftBox" id="userInfo">
            <div className="essential">
              <table className={version === 1 ? "" : "essentialEdit"}>
                <td>이름</td>
                <td>{userInfo.membername}</td>
                <tr />
                <td>아이디</td>
                <td>{userInfo.memberid}</td>
                <tr />
                <td>생년월일</td>
                <td>{userInfo.bday}</td>
                <tr />
                <td>전화번호</td>
                <td>{userInfo.phone}</td>
                <tr />
                <td>등급</td>
                <td>{userInfo.memberLevel}</td>
                <tr />
                <td className={version === 1 ? "normal" : "editver"}>
                  비밀번호
                </td>
                <td>
                  <input
                    id="pswd"
                    name="pswd"
                    type="password"
                    placeholder="비밀번호"
                    onChange={inputChange}
                    className={version === 1 ? "normal" : "editver"}
                  />
                </td>
                <tr />
                <td className={version === 1 ? "normal" : "editver"}>
                  비밀번호 확인
                </td>
                <td>
                  <span
                    id="passMsg"
                    className={`message ${
                      isPasswordConfirm ? "success" : "error"
                    }`}
                    style={{ display: version === 1 ? "none" : "block" }}
                  >
                    {passwordConfirmMessage}
                  </span>
                  <input
                    id="pswdChk"
                    name="pswdChk"
                    type="password"
                    placeholder="비밀번호 확인"
                    className={version === 1 ? "normal" : "editver"}
                    onChange={inputChange}
                  />
                </td>
              </table>
            </div>
            <div className="additional">
              <table>
                <td>계좌</td>
                <td className={version === 1 ? "editver" : "normal"}>
                  [{userInfo.accBank}] {userInfo.accno}
                </td>
                <td className={version === 1 ? "normal" : "editver"}>
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 80 }}>
                    <InputLabel id="demo-simple-select-standard-label">
                      은행
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      onChange={bankChange}
                      label="은행명"
                      value={bank}
                    >
                      <MenuItem value={"신한"}>신한</MenuItem>
                      <MenuItem value={"국민"}>국민</MenuItem>
                      <MenuItem value={"우리"}>우리</MenuItem>
                      <MenuItem value={"하나"}>하나</MenuItem>
                    </Select>
                  </FormControl>
                  <input
                    type="text"
                    placeholder="계좌번호"
                    value={userInfo.accno}
                  />
                </td>
                <tr />
                <td>직장</td>
                <td className={version === 1 ? "editver" : "normal"}>
                  {userInfo.hasjob === 1
                    ? "O"
                    : userInfo.hasjob === 0
                    ? "X"
                    : ""}
                </td>
                <td className={version === 1 ? "normal" : "editver"}>
                  <div className="select">
                    <input
                      type="radio"
                      id="select1"
                      name="hasjob"
                      value="1"
                      label="hasjob"
                      checked={userInfo.hasjob === 1 || userInfo.hasjob === "1"}
                      onChange={inputChange}
                    />
                    <label htmlFor="select1">유</label>
                    <input
                      type="radio"
                      id="select2"
                      name="hasjob"
                      value="0"
                      label="hasjob"
                      checked={userInfo.hasjob === 0 || userInfo.hasjob === "0"}
                      onChange={inputChange}
                    />
                    <label htmlFor="select2">무</label>
                  </div>
                </td>
                <tr />
                <td>직장명</td>
                <td className={version === 1 ? "editver" : "normal"}>
                  {userInfo.jobname} {userInfo.hiredate}
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="직장명"
                    value={userInfo.jobname}
                    className={version === 1 ? "normal" : "editver"}
                    onChange={inputChange}
                  />
                  <input
                    type="text"
                    placeholder="입사년도"
                    value={userInfo.hiredate}
                    className={version === 1 ? "normal" : "editver"}
                    onChange={inputChange}
                  />
                </td>
                <tr />
                <td>결혼</td>
                <td className={version === 1 ? "editver" : "normal"}>
                  {userInfo.marry === 1
                    ? "기혼"
                    : userInfo.marry === 0
                    ? "미혼"
                    : ""}
                </td>
                <td className={version === 1 ? "normal" : "editver"}>
                  <div className="select">
                    <input
                      type="radio"
                      id="select3"
                      name="marry"
                      value="0"
                      label="marry"
                      checked={userInfo.marry === 0 || userInfo.marry === "0"}
                      onChange={inputChange}
                    />
                    <label htmlFor="select3">미혼</label>
                    <input
                      type="radio"
                      id="select4"
                      name="marry"
                      value="1"
                      label="marry"
                      checked={userInfo.marry === 1 || userInfo.marry === "1"}
                      onChange={inputChange}
                    />
                    <label htmlFor="select4">기혼</label>
                  </div>
                </td>
                <tr />
                <td>자녀</td>
                <td className={version === 1 ? "editver" : "normal"}>
                  {userInfo.haschild === 0
                    ? "없음"
                    : userInfo.haschild === 1
                    ? "1명"
                    : userInfo.haschild === 2
                    ? "2명이상"
                    : ""}
                </td>
                <td className={version === 1 ? "normal" : "editver"}>
                  <div className="select">
                    <input
                      type="radio"
                      id="select5"
                      name="haschild"
                      value="0"
                      label="haschild"
                      checked={
                        userInfo.haschild === 0 || userInfo.haschild === "0"
                      }
                      onChange={inputChange}
                    />
                    <label htmlFor="select5">무</label>
                    <input
                      type="radio"
                      id="select6"
                      name="haschild"
                      value="1"
                      label="haschild"
                      checked={
                        userInfo.haschild === 1 || userInfo.haschild === "1"
                      }
                      onChange={inputChange}
                    />
                    <label htmlFor="select6">1명</label>
                    <input
                      type="radio"
                      id="select7"
                      name="haschild"
                      value="2"
                      label="haschild"
                      checked={
                        userInfo.haschild === 2 || userInfo.haschild === "2"
                      }
                      onChange={inputChange}
                    />
                    <label htmlFor="select7">2명이상</label>
                  </div>
                </td>
              </table>
            </div>
          </div>
        </div>
        <div className="myList">
          <div className="myLoan">
            <h2>내 대출</h2>
            <div className="leftBox">
              <TableContainer className="myLoanTable">
                <Table
                  sx={{ minWidth: 100 }}
                  size="small"
                  aria-label="a dense table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>대출 상품</TableCell>
                      <TableCell>진행 상태</TableCell>
                      <TableCell>신청</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {myLoanList.map((loan, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell>
                          [{loan.bankname}] {loan.loanname}
                        </TableCell>
                        <TableCell onClick={() => openModal()}>
                          {loan.loanstate}
                          {modalOpen && (
                            <Modal
                              setModalOpen={setModalOpen}
                              loanname={loan.loanname}
                              bankname={loan.bankname}
                              state={loan.loanstate}
                            ></Modal>
                          )}
                        </TableCell>
                        <TableCell>
                          <button
                            className="mypageBtn"
                            id="linkBtn"
                            onClick={() => {
                              navigate("/hows/loan/detail/limit/uploaddocs", {
                                state: {
                                  loanid: loan.memloanid,
                                  bankname: loan.bankname,
                                  loanname: loan.loanname,
                                },
                              });
                            }}
                          >
                            링크
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
          <div className="myChat">
            <h2>상담 내역</h2>
            <div className="leftBox">
              <TableContainer className="myLoanTable">
                <Table
                  sx={{ minWidth: 50 }}
                  size="small"
                  aria-label="a dense table"
                >
                  <TableBody>
                    {myChat.map((chatroom, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell>
                          [{chatroom.bankname}] {chatroom.loanname}
                        </TableCell>
                        <TableCell>
                          <button
                            className="mypageBtn"
                            onClick={() => {
                              moveChatRoom(chatroom);
                            }}
                          >
                            상담하기
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      </div>
      <div className="myContainer2">
        <div className="calendar">
          <FullCalendar
            defaultView="dayGridMonth"
            plugins={[dayGridPlugin]}
            height={"600px"}
            events={myPanList}
            displayEventTime={false}
          />
        </div>
      </div>
    </div>
  );
}
