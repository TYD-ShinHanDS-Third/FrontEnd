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
    const url = "mypage/pan";
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
    getFavorites(jwtToken);
    //getLoanList(jwtToken);
    getChatList(jwtToken);

    console.log("mouted");
  }, []);

  return (
    <div className="myPage">
      <div className="myContainer">
        <div className="calendar">
          <FullCalendar
            defaultView="dayGridMonth"
            plugins={[dayGridPlugin]}
            height={"auto"}
            events={myPanList}
            displayEventTime={false}
          />
        </div>
        <div className="myLoan">
          <h2>내 대출</h2>
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
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>
                      [{loan.bankname}]{loan.loanname}
                    </TableCell>
                    <TableCell>{loan.loanstate}</TableCell>
                    <TableCell>
                      <button
                        onClick={() => {
                          navigate(loan.applyurl, { state: loan.memloanid });
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
        <div className="myChat">
          <h2>상담 내역</h2>
          <TableContainer className="myLoanTable">
            <Table
              sx={{ minWidth: 100 }}
              size="small"
              aria-label="a dense table"
            >
              <TableBody>
                {myChat.map((chatroom, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>
                      [{chatroom.bankname}]{chatroom.loanname}
                    </TableCell>
                    <TableCell>
                      <button
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
        <div className="myEdit">
          <Link to="/hows/my/myedit" className="editLink">
            <button className="editBtn"><h2>회원정보 수정</h2></button>
          </Link>
        </div>
      </div>
    </div>
  );
}
