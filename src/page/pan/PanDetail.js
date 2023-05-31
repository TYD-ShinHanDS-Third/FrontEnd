import React from "react";
import "../../css/pan/PanDetail.css";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import StarIcon from "@mui/icons-material/Star";
import Kakao from "./Kakao";

function PanDetail(props) {
  return (
    <div className="notice">
      <div className="noticeDetail">
        <div className="noticeHeader">
          <h1 className="noticeTitle">남양주시 행복주택 예비 입주자 모집</h1>
          <StarIcon className="noticeFav" />
          <h3 className="noticeDate">2023-05-08 ~ 2023-05-25</h3>
        </div>
        <div className="noticeBody">
          <Kakao />
        </div>
        <div className="noticeFooter">
          <TableContainer>
            <Table
              sx={{ minWidth: 500 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>공고 번호</TableCell>
                  <TableCell>공고 이름</TableCell>
                  <TableCell>지역</TableCell>
                  <TableCell>공고 게시일</TableCell>
                  <TableCell>공고 마감일</TableCell>
                  <TableCell>접수기간 종료일</TableCell>
                  <TableCell>서류 제출 대상자 발표일</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>공고 번호</TableCell>
                  <TableCell>공고 이름</TableCell>
                  <TableCell>지역</TableCell>
                  <TableCell>공고 게시일</TableCell>
                  <TableCell>공고 마감일</TableCell>
                  <TableCell>접수기간 종료일</TableCell>
                  <TableCell>서류 제출 대상자 발표일</TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <Table
              sx={{ minWidth: 500 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>서류 접수기간 시작일</TableCell>
                  <TableCell>서류 접수기간 종료일</TableCell>
                  <TableCell>당첨자 발표일</TableCell>
                  <TableCell>계약기간 종료일</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>서류 접수기간 시작일</TableCell>
                  <TableCell>서류 접수기간 종료일</TableCell>
                  <TableCell>당첨자 발표일</TableCell>
                  <TableCell>계약기간 종료일</TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <Table
              sx={{ minWidth: 500 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>전용면적</TableCell>
                  <TableCell>단지주소</TableCell>
                  <TableCell>단지 상세주소</TableCell>
                  <TableCell>단지명</TableCell>
                  <TableCell>입주 예정월</TableCell>
                  <TableCell>총 세대수</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>전용면적</TableCell>
                  <TableCell>단지주소</TableCell>
                  <TableCell>단지 상세주소</TableCell>
                  <TableCell>단지명</TableCell>
                  <TableCell>입주 예정월</TableCell>
                  <TableCell>총 세대수</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

export default PanDetail;
