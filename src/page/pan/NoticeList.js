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
  filterNotice,
  getList,
}) {
  useEffect(() => {
    initfav();
  }, [panList]);

  const [fav, setFav] = useState([]);
  var favlist = [];

  async function initfav() {
    // 좋아요를 초기화를 하는 함수
    await panList.map((item) => {
      var favo = {
        id: item.panid,
        like: item.like,
      };
      favlist.push(favo);
    });
    console.log("favlist");
    console.log(favlist);
    setFav(favlist);
  }

  const likebtn = (item, index) => {
    if (fav[index].like === 1) {
      item.like = 0;
      let tmp = fav;
      console.log(tmp);
      if (tmp.at(index).like == 0) {
        console.log("0임");
      }
      setFav(tmp);
      favorite(item.panid, item.like);
    } else {
      item.like = 1;
      let tmp = fav;
      if (tmp[index].like == 1) {
        console.log("1임");
      }
      tmp[index].like = 1;
      setFav(tmp);
      favorite(item.panid, item.like);
    }
  };

  function favNotice(e) {
    if (e.target.checked === true) {
      if (document.getElementById("onNotice").checked === true) {
        filterNotice(e);
      } else {
        filterFavorite(e);
      }
    } else if (e.target.checked === false) {
      getList();
    }
  }

  function onNotice(e) {
    if (e.target.checked === true) {
      if (document.getElementById("fav").checked === true) {
        filterNotice(e);
      } else {
        filterOnNotice(e);
      }
    } else if (e.target.checked === false) {
      getList();
    }
  }

  return (
    <div className="noticelist">
      <div className="notice_checkbox">
        <label className="fav">
          <Checkbox
            color="success"
            name="fav"
            id="fav"
            onClick={(event) => favNotice(event)}
          />
          관심있는 공고
        </label>
        <label className="recruiting">
          <Checkbox
            color="success"
            name="onNotice"
            id="onNotice"
            onClick={(event) => onNotice(event)}
          />
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
                  <TableCell name="panid">
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
                    <button
                      className="star"
                      key={item.panname}
                      onClick={() => likebtn(item, index)}
                    >
                      {(fav[index] === item.panid && fav[index] === 1) ||
                      item.like === 1 ? (
                        <HomeIcon />
                      ) : (
                        <HomeOutlinedIcon />
                      )}
                    </button>
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
