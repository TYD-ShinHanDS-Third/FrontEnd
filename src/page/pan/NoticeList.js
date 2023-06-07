import React from "react";
import { Link } from "react-router-dom";
import "../../css/pan/NoticeList.css";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import StarIcon from "@mui/icons-material/Star";
import Checkbox from "@mui/material/Checkbox";

function NoticeList(props) {
  return (
    <div className="noticelist">
      <label className="fav">
        <Checkbox defaultChecked color="success" />
        관심있는 공고만 보기
      </label>
      <label className="recruiting">
        <Checkbox defaultChecked color="success" />
        모집중인 공고만 보기
      </label>

      <hr className="line" />
      <TableContainer className="noticeTable">
        <Table sx={{ minWidth: 500 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>공고 번호</TableCell>
              <TableCell>공고 이름</TableCell>
              <TableCell>지역</TableCell>
              <TableCell>공고 게시일</TableCell>
              <TableCell>공고 마감일</TableCell>
              <TableCell>공고 상태</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>
                <Link to="detail">1</Link>
              </TableCell>
              <TableCell>이름입니당</TableCell>
              <TableCell>서울</TableCell>
              <TableCell>2023.12.01</TableCell>
              <TableCell>2023.12.18</TableCell>
              <TableCell>공고중</TableCell>
              <TableCell>
                <StarIcon />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default NoticeList;
