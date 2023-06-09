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

const sample = [
  {
    loanName: "[신한] 버팀목 전세자금 대출",
    loanState: "준비중",
    applyUrl: "https://bank.shinhan.com/index.jsp#020305010000",
  },
  {
    loanName: "[국민] KB전세금안심대출",
    loanState: "거절",
    applyUrl:
      "https://obank.kbstar.com/quics?page=C103507&cc=b104363:b104516&isNew=N&prcode=LN20000064&QSL=F",
  },
  {
    loanName: "[우리] 우리WON전세대출(주택보증)",
    loanState: "거절",
    applyUrl:
      "https://spot.wooribank.com/pot/Dream?withyou=POLON0055&cc=c010528:c010531;c012425:c012399&PLM_PDCD=P020006141&PRD_CD=P020006141&HOST_PRD_CD=2031161000000",
  },
];

const initEvent = {
  title: "",
  panId: "",
  start: "",
  end: "",
  backgroundColor: "",
  borderColor: "",
  textColor: "",
};

export default function MyPage(props) {
  const [favorite, setFavorite] = useState(initEvent);

  const [favoriteList, setFavoriteList] = useState([]);

  async function changeEvent(arr) {
    console.log(arr);
    await arr.forEach((element, index) => {
      //setFavorite(initEvent);
      const title = element.panId;
      console.log(element.panId);
      setFavorite({ ...favorite, panId: title });
      setFavorite({ ...favorite, title: element.panName });
      setFavorite({ ...favorite, start: element.panStartDate });
      setFavorite({ ...favorite, end: element.panendDate });
      setFavorite({
        ...favorite,
        backgroundColor:
          { index } % 3 === 0
            ? "#031389"
            : { index } % 3 === 1
            ? "#FFFEDD"
            : "#609966",
      });
      setFavorite({ ...favorite, borderColor: favorite.backgroundColor });
      setFavorite({
        ...favorite,
        textColor:
          { index } % 3 === 0
            ? "white"
            : { index } % 3 === 1
            ? "black"
            : "white",
      });
      setFavoriteList([...favoriteList, favorite]);
      console.log(favorite);
    });
  }

  async function getFavorites(token) {
    const url = "http://localhost:3000/data/myPage/panFavorites.json";
    await axios
      .get(url)
      .then(function (response) {
        //setFavoriteList(response);
        console.dir(response.data);
        changeEvent(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => {
        console.log("request end");
      });
  }

  useEffect(() => {
    getFavorites("22");
    console.log("2" + favorite.title);
  }, []);
  return (
    <div className="myPage">
      <div className="myContainer">
        <div className="calendar">
          <FullCalendar
            defaultView="dayGridMonth"
            plugins={[dayGridPlugin]}
            height={"auto"}
            events={favoriteList}
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
                {sample.map((loan, index) => (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{loan.loanName}</TableCell>
                    <TableCell>{loan.loanState}</TableCell>
                    <TableCell>
                      <a href={loan.applyUrl}>링크</a>
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
