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
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { object } from "prop-types";
import { useEffect } from "react";
import Cookies from "universal-cookie";

export default function MyPage(props) {
  const [myPanList, setMyPanList] = useState([]);
  const [myLoanList, setMyLoanList] = useState([]);

  //즐겨찾기 불러오기
  let favoriteList = [];

  async function getFavorites(token) {
    //const url = "http://localhost:3000/data/myPage/panFavorites_fake.json";
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

  //내 대출 목록 불러오기
  async function getLoanList(token) {
    const url = "mypage/loan";

    await axios
      .get(url, {
        headers: {
          token: token,
        },
      })
      .then(function (response) {
        console.dir(response.data);
        console.log("loan", response.data);
        setMyLoanList(response.data);
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
    getLoanList(jwtToken);

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
          />
        </div>
        <div className="myLoan">
          <h3>내 대출</h3>
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
                  <TableCell>신청 url</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {myLoanList.map((loan, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{loan.loanname}</TableCell>
                    <TableCell>{loan.loanstate}</TableCell>
                    <TableCell>
                      <a href={loan.applyurl}>링크</a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className="myReturn">
          <h3>대출 정보</h3>
          <div className="returnPrice">
            <p>총 대출 금액</p>
            <h4>10,000,000</h4>
            <p>대출 잔액</p>
            <h1>578,180</h1>
          </div>
        </div>
        <div className="myEdit">
          <Link to="/hows/my/myedit" className="editLink">
            <button className="editBtn">회원정보 수정</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
