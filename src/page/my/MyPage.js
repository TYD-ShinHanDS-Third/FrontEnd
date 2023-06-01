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

export default function MyPage(props) {
  return (
    <div className="myPage">
      <div className="myContainer">
        <div className="calendar">
          <FullCalendar
            defaultView="dayGridMonth"
            plugins={[dayGridPlugin]}
            height={"auto"}
            events={[
              {
                title:
                  "화성남양뉴타운 B9 · B10블록 행복주택 입주자격완화 추가모집 공고(소득, 자산 배제)",
                start: "2023-06-13",
                end: "2023-06-16",
                backgroundColor: "#031389",
                borderColor: "#031389",
                textColor: "white",
              },
              {
                title: "천안부성A-1BL 행복주택 입주자 추가 모집",
                start: "2023-06-22",
                end: "2023-06-24",
                backgroundColor: "#FFFEDD",
                borderColor: "#FFFEDD",
                textColor: "black",
              },
              {
                title: "[경기북부]기존주택 등 매입임대주택 예비입주자 모집",
                start: "2023-06-26",
                end: "2023-06-28",
                backgroundColor: "#609966",
                borderColor: "#609966",
                textColor: "white",
              },
            ]}
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
          <Link to="/hows/my/myedit">
            <button className="editBtn">회원정보 수정</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
