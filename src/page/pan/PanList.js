import React, { useEffect, useState } from "react";
import "../../css/pan/PanList.css";
import { Link, Route, Routes } from "react-router-dom";
import PanDetail from "./PanDetail";
import NoticeList from "./NoticeList";
import axios from "axios";
import { useRef } from "react";
import { Cookies } from "react-cookie";
import { Toll } from "@mui/icons-material";

const locationlist = [
  "서울특별시",
  "경기도",
  "인천광역시",
  "부산광역시",
  "대구광역시",
  "광주광역시",
  "울산광역시",
  "세종특별자치시",
  "강원도",
  "충청북도",
  "충청남도",
  "전라북도",
  "전라남도",
  "경상북도",
  "경상남도",
  "제주특별자치시도",
];

function PanList(props) {
  const [panlist, setPanlist] = useState([]);

  const [pageNum, setPage] = useState("0");
  const [pageTotal, setPageTotal] = useState("0");

  const [noticePageNum, setNoticePageNum] = useState("0");
  const [noticePageTotal, setNoticePageTotal] = useState(0);

  useEffect(() => {
    getList();
  }, [pageNum]);

  useEffect(() => {
    filterOnNotice();
  }, [noticePageNum]);

  async function getList() {
    const cookies = new Cookies();
    const token = cookies.get("jwtToken");

    const listurl = "/hows/notice";
    await axios
      .get(listurl, {
        params: {
          page: pageNum,
          size: "9",
        },
        headers: {
          "Content-type": "application/json",
          token: token,
        },
      })
      .then(function (response) {
        setPanlist(response.data.obj);
        setPageTotal(response.data.total);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function filterLocation(item) {
    console.log("받아온 item으로 request하기" + item);
    const listurl = `/hows/notice/${item}`;
    await axios
      .get(listurl, {
        params: {
          page: pageNum,
          size: "9",
        },
      })
      .then(function (response) {
        setPanlist(response.data.obj);
        setPageTotal(response.data.total);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const filterFavorite = (event) => {
    const cookies = new Cookies();
    const token = cookies.get("jwtToken");

    const listurl = "/hows/notice/fav/1";
    axios
      .get(listurl, {
        headers: {
          token: token,
        },
        params: {
          page: pageNum,
          size: "9",
        },
      })
      .then(function (response) {
        setPanlist(response.data.obj);
        setPageTotal(response.data.total);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  async function filterOnNotice(event) {
    const listurl = "/hows/notice/fav/2";
    const cookies = new Cookies();
    const token = cookies.get("jwtToken");

    await axios
      .get(listurl, {
        headers: {
          token: token,
        },
        params: {
          page: noticePageNum,
          size: "9",
        },
      })
      .then(function (response) {
        setPanlist(response.data.obj);
        setNoticePageTotal(response.data.total);
        setPageTotal(response.data.total);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const filterNotice = (event) => {
    const listurl = "/hows/notice/fav/3";
    const cookies = new Cookies();
    const token = cookies.get("jwtToken");
    axios
      .get(listurl, {
        headers: {
          token: token,
        },
        params: {
          page: pageNum,
          size: "9",
        },
      })
      .then(function (response) {
        setPanlist(response.data.obj);
        setPageTotal(response.data.total);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  async function favorite(panid, favorite) {
    // console.log("좋아요 하기 + 좋아요 취소" + panid + " : " + favorite);
    const listurl = "/hows/notice";
    const cookies = new Cookies();
    const token = cookies.get("jwtToken");
    console.log("favorite : " + favorite);

    if (favorite) {
      console.log("axios");
      await axios
        .post(
          listurl,
          { panid: panid },
          {
            headers: {
              "Content-type": "application/json",
              token: token,
            },
          }
        )
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log("123" + error);
        });
    } else {
      await axios
        .delete(listurl, {
          headers: {
            token: token,
          },
          params: {
            panid: panid,
          },
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
  const changePage = (p) => {
    if (noticePageTotal >= 1) {
      setNoticePageNum(p);
    } else {
      setPage(p);
    }
  };

  const createBtn = (pageTotal) => {
    let paging = pageTotal / 9;
    let btns = [];
    for (let i = 0; i < paging; i++) {
      let btn_name = "btn_" + i;
      btns.push(
        <button className="pagebtn" id={btn_name} onClick={() => changePage(i)}>
          {i + 1}
        </button>
      );
    }
    if (pageNum) return btns;
  };

  return (
    <div className="panlist">
      <div className="region_content">
        <ul className="region_list">
          {locationlist.map((item, index) => {
            return (
              <li key={item} onClick={() => filterLocation(item)}>
                {item}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="noticearea">
        <Routes>
          <Route
            path="detail/*"
            element={<PanDetail favorite={favorite} />}
          ></Route>
          <Route
            path="/"
            element={
              <NoticeList
                panList={panlist}
                filterFavorite={filterFavorite}
                filterOnNotice={filterOnNotice}
                filterNotice={filterNotice}
                getList={getList}
                favorite={favorite}
              />
            }
          ></Route>
        </Routes>
      </div>
      <div className="paging">{createBtn(pageTotal)}</div>
    </div>
  );
}

export default PanList;
