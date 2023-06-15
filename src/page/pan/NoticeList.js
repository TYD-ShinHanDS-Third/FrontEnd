import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../css/pan/NoticeList.css";

import HomeIcon from "@mui/icons-material/Home";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Checkbox from "@mui/material/Checkbox";

function NoticeList({
  panList,
  filterFavorite,
  filterOnNotice,
  favorite,
  getDetailList,
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
      <div className="checkBox">
        <label className="fav">
          <Checkbox
            color="success"
            name="fav"
            id="fav"
            onClick={(event) => favNotice(event)}
          />
          관심있는 공고만 보기
        </label>
        <label className="recruiting">
          <Checkbox
            color="success"
            name="onNotice"
            id="onNotice"
            onClick={(event) => onNotice(event)}
          />
          모집중인 공고만 보기
        </label>
      </div>

      <hr className="line" />

      <div className="noticeTable">
        <tr className="tablebox">
          <th className="panid">번호</th>
          <th className="panname">이름</th>
          <th className="location">지역</th>
          <th className="startdate">게시일</th>
          <th className="enddate">마감일</th>
          <th className="state">상태</th>
          <th className="favorite"></th>
        </tr>

        {panList.map((item, index) => {
          return (
            <tr className="tablebox tablebody">
              <td name="panid" key={item.panid} className="panid">
                <Link
                  to={"detail"}
                  state={{ panInfo: item }}
                  style={{ textDecoration: "none", color: "green" }}
                >
                  {item.panid}
                </Link>
              </td>
              <td name="panname" className="panname">
                {item.panname}
              </td>
              <td name="location" className="location">
                {item.location}
              </td>
              <td name="panstartdate" className="startdate">
                {item.panstartdate}
              </td>
              <td name="panenddate" className="enddate">
                {item.panenddate}
              </td>
              <td name="panstate" className="state">
                {item.panstate}
              </td>
              <td name="favorite" className="favorite">
                <button
                  className="favbtn"
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
              </td>
            </tr>
          );
        })}
      </div>
    </div>
  );
}

export default NoticeList;
