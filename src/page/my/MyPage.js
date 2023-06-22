import React from "react";
import "../../css/my/MyPage.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { object } from "prop-types";
import { useEffect } from "react";
import Cookies from "universal-cookie";

export default function MyPage(props) {
  //내 대출 정보
  const [myPanList, setMyPanList] = useState([]);
  const [myLoanList, setMyLoanList] = useState([]);

  //즐겨찾기 불러오기
  let favoriteList = [];

  //채팅
  const [myChat, setMyChat] = useState([]);

  const [userInfo, setUserInfo] = useState({});

  //저장된 회원정보 가져오기
  async function getUserInfo(token) {
    const URL = "/hows/mypage";

    axios
      .get(URL, {
        headers: {
          token: token,
        },
      })
      .then((res) => {
        setUserInfo(res.data);
        //날짜 데이터 변환
        console.log(res.data.bday);
        let birth = res.data.bday.substring(0, 10);
        setUserInfo({ ...userInfo, bday: birth });
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
        console.dir(response.data);
        console.log("loan", response.data);
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
        console.dir(response.data);
        //setMyPanList(response.data);
        for (const [index, element] of response.data.entries()) {
          let endDate = new Date(element.end);
          console.log(element.end);
          console.log(endDate);
          endDate.setDate(endDate.getDate() + 1);
          console.log(endDate);
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
      })
      .finally(() => {
        console.log("request end");
      });
  }

  useEffect(() => {
    const cookies = new Cookies();
    const jwtToken = cookies.get("jwtToken");
    getUserInfo(jwtToken);
    getFavorites(jwtToken);
    getChatList(jwtToken);

    console.log("mouted");
  }, []);

  return (
    <div className="myPage">
      <div className="myContainer1">
        <div className="myInfo">
          <div className="memberTitle">
            <h2>회원정보</h2>
            <Link to="/hows/my/myedit" className="editLink">
              <p>회원정보 수정</p>
            </Link>
          </div>
          <div className="leftBox" id="userInfo">
            <div className="essential">
              <p>이름 {userInfo.membername}</p>
              <p>아이디 {userInfo.memberid}</p>
              <p>비밀번호 {userInfo.membername}</p>
              <p>생년월일 {userInfo.bday}</p>
              <p>전화번호 {userInfo.phone}</p>
            </div>
            <div className="additional">
              <p>
                계좌 [{userInfo.bankname}] {userInfo.accno}
              </p>
              <p>직장유무 {userInfo.hasjob}</p>
              <p>
                직장명 {userInfo.jobname} : {userInfo.hiredate}
              </p>
              <p>결혼 {userInfo.marry}</p>
              <p>자녀 {userInfo.haschild}</p>
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
                      <TableCell>신청 링크</TableCell>
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
                        <TableCell>{loan.loanstate}</TableCell>
                        <TableCell>
                          <button
                            onClick={() => {
                              navigate(loan.applyurl, {
                                state: loan.memloanid,
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
                            onClick={() => {
                              moveChatRoom(chatroom);
                            }}
                          >
                            상담
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
            height={"auto"}
            events={myPanList}
            displayEventTime={false}
          />
        </div>
      </div>
    </div>
  );
}
