import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../css/pan/NoticeList.css";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import HomeIcon from "@mui/icons-material/Home";
import Checkbox from "@mui/material/Checkbox";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import axios from "axios";

function NoticeList({
  panList,
  filterFavorite,
  filterOnNotice,
  favorite,
  getPanDetail,
}) {
  const [panlist, setPanlist] = useState([]);
  const [fav, setFav] = useState(true);
  const [favlist, setFavlist] = useState([]);

  const like = (item) => {
    if (item.favorite === true) {
      item.favorite = false;
      setFav(false);
      favorite(item.panId, item.favorite);
    } else {
      item.favorite = true;
      setFav(true);
      favorite(item.panId, item.favorite);
    }
  };

  function favNotice(e) {
    if (e.target.checked === true) {
      filterFavorite();
    }
  }

  function onNotice(e) {
    if (e.target.checked === true) {
      filterOnNotice();
    }
  }

  return (
    <div className="noticelist">
      <div className="notice_checkbox">
        <label className="fav">
          <Checkbox color="success" onClick={(event) => favNotice(event)} />
          관심있는 공고
        </label>
        <label className="recruiting">
          <Checkbox color="success" onClick={(event) => onNotice(event)} />
          모집중인 공고
        </label>
      </div>
      <hr className="line" />
      <TableContainer
        className="noticeTable"
        style={{ width: "95%", height: "100%" }}
      >
        <Table sx={{ minWidth: 500 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>공고 번호</TableCell>
              <TableCell>공고 이름</TableCell>
              <TableCell>지역</TableCell>
              <TableCell>공고 게시일</TableCell>
              <TableCell>공고 마감일</TableCell>
              <TableCell>공고 상태</TableCell>
              <TableCell>즐겨찾기</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="table_body">
            {panList.map(function (item, index) {
              return (
                <TableRow
                  key={item.panid}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {/* <TableCell name="panId" onClick={() => detail(item.panid)}> */}
                  <TableCell name="panId">
                    <Link
                      to={"detail"}
                      state={{ panInfo: item }}
                      style={{ textDecoration: "none", color: "green" }}
                    >
                      {item.panid}
                    </Link>
                  </TableCell>
                  <TableCell name="panname">{item.panname}</TableCell>
                  <TableCell name="location">{item.location}</TableCell>
                  <TableCell name="panstartdate">{item.panstartdate}</TableCell>
                  <TableCell name="panenddate">{item.panenddate}</TableCell>
                  <TableCell name="panstate">{item.panstate}</TableCell>
                  <TableCell name="favorite">
                    {item.favorite === true ? (
                      <button className="star" onClick={() => like(item)}>
                        <HomeIcon />
                      </button>
                    ) : (
                      <button className="star">
                        <HomeOutlinedIcon onClick={() => like(item)} />
                      </button>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default NoticeList;
