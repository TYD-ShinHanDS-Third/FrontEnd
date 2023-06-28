import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../css/pan/NoticeList.css";

import HomeIcon from "@mui/icons-material/Home";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Checkbox from "@mui/material/Checkbox";
import e from "cors";

function NoticeList({
  panList,
  filterFavorite,
  filterOnNotice,
  favorite,
  getDetailList,
  filterNotice,
  getList,
}) {
  const [favlist, setFavlist] = useState([]);

  useEffect(() => {
    var tmpfavlist = [];
    panList.map((item) => {
      var favo = {
        id: item.panid,
        like: item.like,
      };
      tmpfavlist.push(favo);
    });
    setFavlist(tmpfavlist);
  }, [panList]);

  const clicklikebtn = (panid, index) => {
    var id = panid;
    var tmp = [...favlist];
    var b_like = tmp[index].like;
    if (b_like) {
      tmp[index].like = 0;
      b_like = 0;
    } else {
      tmp[index].like = 1;
      b_like = 1;
    }
    setFavlist(tmp);
    favorite(id, b_like);
  };

  function favNotice(e) {
    if (e.target.checked === true) {
      if (document.getElementById("onNotice").checked === true) {
        filterNotice("1");
      } else {
        filterFavorite("1");
      }
    } else if (e.target.checked === false) {
      if (document.getElementById("onNotice").checked === true) {
        filterOnNotice("1");
      } else {
        getList("1");
      }
    }
  }

  function onNotice(e) {
    if (e.target.checked === true) {
      if (document.getElementById("fav").checked === true) {
        filterNotice("1");
      } else {
        filterOnNotice("1");
      }
    } else if (e.target.checked === false) {
      if (document.getElementById("fav").checked === true) {
        filterFavorite("1");
      } else {
        getList("1"); // 전체 해제
      }
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
        <table>
          <thead>
            <tr className="tablebox" key={0}>
              <th className="panid">번호</th>
              <th className="panname">이름</th>
              <th className="location">지역</th>
              <th className="startdate">게시일</th>
              <th className="enddate">마감일</th>
              <th className="state">상태</th>
              <th className="favorite"></th>
            </tr>
          </thead>
          <tbody>
            {panList.map((item, index) => {
              return (
                <tr className="tablebox tablebody" key={item.panid}>
                  <td name="panid" className="panid">
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
                    {favlist[index] && (
                      <button
                        className="favbtn"
                        name={item.panid}
                        onClick={() => clicklikebtn(item.panid, index)}
                      >
                        {favlist[index].like === 1 ? (
                          <HomeIcon />
                        ) : (
                          <HomeOutlinedIcon />
                        )}
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default NoticeList;
