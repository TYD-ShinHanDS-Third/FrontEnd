import React, { useEffect } from "react";
import "../../css/PanList.css";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import { AccessAlarm, ThreeDRotation } from "@mui/icons-material";
import StarIcon from "@mui/icons-material/Star";

function PanList(props) {
  return (
    <div className="panlist">
      <div className="region_content">
        <ul className="region_list">
          <li>서울</li>
          <li>경기도</li>
          <li>서울</li>
          <li>서울</li>
          <li>서울</li>
          <li>서울</li>
          <li>서울</li>
          <li>경기도</li>
          <li>서울</li>
          <li>서울</li>
          <li>경기도</li>
          <li>서울</li>
          <li>서울</li>
          <li>서울</li>
        </ul>
      </div>
      <div className="noticelist">
        <label class="fav">
          <Checkbox defaultChecked color="success" />
          관심있는 공고만 보기
        </label>

        <label class="recruiting">
          <Checkbox defaultChecked color="success" />
          모집중인 공고만 보기
        </label>

        <hr className="line" />

        <TableContainer className="noticeTable">
          <table sx={{ minWidth: 700 }} size="small" aria-label="a dense table">
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
                <TableCell>1</TableCell>
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
          </table>
        </TableContainer>
      </div>
    </div>
  );
}

export default PanList;
